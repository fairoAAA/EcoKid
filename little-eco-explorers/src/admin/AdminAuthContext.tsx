import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export type AdminRole = "admin" | "moderator";

export interface AdminSession {
  id: string;
  email: string;
  role: AdminRole;
  displayName: string;
}

export interface StaffUser {
  id: string;
  email: string;
  role: AdminRole;
  displayName: string;
}

interface AdminAuthContextType {
  session: AdminSession | null;
  loading: boolean;
  users: StaffUser[];
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  inviteUser: (
    email: string,
    displayName: string,
    role: AdminRole
  ) => Promise<{ ok: boolean; error?: string }>;
  removeUser: (id: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
  isAdmin: boolean;
  isModerator: boolean;
}

const LOCAL_SESSION_KEY = "ecokids:admin:session";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

async function loadProfile(userId: string, email: string): Promise<AdminSession | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, role")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return {
        id: userId,
        email,
        role: "admin",
        displayName: email.split("@")[0] || "Admin",
      };
    }

    return {
      id: data.id,
      email,
      role: (data.role as AdminRole) || "moderator",
      displayName: data.display_name || email,
    };
  } catch {
    return {
      id: userId,
      email,
      role: "admin",
      displayName: email,
    };
  }
}

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<StaffUser[]>([]);

  const hydrateFromAuthSession = useCallback(async (authSession: Session | null) => {
    if (authSession?.user) {
      const profile = await loadProfile(authSession.user.id, authSession.user.email ?? "");
      setSession(profile);
      setLoading(false);
      return;
    }

    // Supabase auth bo'lmasa, lokal sessiyani tekshiramiz
    try {
      const stored = localStorage.getItem(LOCAL_SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AdminSession;
        setSession(parsed);
        setLoading(false);
        return;
      }
    } catch (err) {
      void err;
    }

    setSession(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => hydrateFromAuthSession(data.session))
      .catch(() => hydrateFromAuthSession(null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, authSession) => {
      hydrateFromAuthSession(authSession);
    });

    return () => listener.subscription.unsubscribe();
  }, [hydrateFromAuthSession]);

  const login = useCallback(async (loginInput: string, passwordInput: string) => {
    const trimmedLogin = loginInput.trim();
    const normalizedEmail = trimmedLogin.includes("@") ? trimmedLogin : `${trimmedLogin}@ecokids.uz`;

    // 1. Supabase orqali kirishni tekshirish
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: passwordInput,
      });

      if (!error && data.session) {
        const profile = await loadProfile(data.session.user.id, data.session.user.email ?? normalizedEmail);
        setSession(profile);
        return { ok: true };
      }
    } catch (err) {
      console.warn("Supabase auth failed, checking fallback:", err);
    }

    // 2. Standart admin login zaxirasi (agar Supabase foydalanuvchisi hali yaratilmagan bo'lsa)
    if (
      (trimmedLogin.toLowerCase() === "admin" || normalizedEmail === "admin@ecokids.uz") &&
      passwordInput === "admin123"
    ) {
      const fallbackSession: AdminSession = {
        id: "local-admin-uuid",
        email: "admin@ecokids.uz",
        role: "admin",
        displayName: "Bosh Administrator",
      };
      setSession(fallbackSession);
      try {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(fallbackSession));
      } catch (err) {
        void err;
      }
      return { ok: true };
    }

    return {
      ok: false,
      error: "Login yoki parol noto'g'ri. Standart: admin / admin123",
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      void err;
    }
    try {
      localStorage.removeItem(LOCAL_SESSION_KEY);
    } catch (err) {
      void err;
    }
    setSession(null);
  }, []);

  const refreshUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, role")
        .order("display_name");
      if (!error && data && data.length > 0) {
        setUsers(
          data.map((row) => ({
            id: row.id,
            email: "",
            role: (row.role as AdminRole) || "moderator",
            displayName: row.display_name,
          }))
        );
        return;
      }
    } catch (err) {
      void err;
    }

    // Fallback users list
    setUsers([
      {
        id: "local-admin-uuid",
        email: "admin@ecokids.uz",
        role: "admin",
        displayName: "Bosh Administrator",
      },
    ]);
  }, []);

  const inviteUser = useCallback(async (email: string, _displayName: string, _role: AdminRole) => {
    return {
      ok: false,
      error:
        `Yangi xodim qo'shish uchun Supabase Dashboard > Authentication > Users bo'limidan ` +
        `"${email}" manzilini taklif qiling, so'ng profiles jadvalida uning rolini belgilang.`,
    };
  }, []);

  const removeUser = useCallback(async (id: string) => {
    try {
      await supabase.from("profiles").delete().eq("id", id);
    } catch (err) {
      void err;
    }
    await refreshUsers();
  }, [refreshUsers]);

  const value: AdminAuthContextType = {
    session,
    loading,
    users,
    login,
    logout,
    inviteUser,
    removeUser,
    refreshUsers,
    isAdmin: session?.role === "admin",
    isModerator: session?.role === "moderator" || session?.role === "admin",
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth AdminAuthProvider ichida ishlatilishi kerak");
  return ctx;
};
