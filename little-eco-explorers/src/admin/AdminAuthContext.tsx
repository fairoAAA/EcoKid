import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export type AdminRole = "admin" | "moderator";

export interface AdminSession {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
}

export interface StaffUser {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  password?: string;
}

interface AddUserParams {
  username: string;
  password?: string;
  displayName: string;
  role: AdminRole;
}

interface AdminAuthContextType {
  session: AdminSession | null;
  loading: boolean;
  users: StaffUser[];
  login: (usernameInput: string, passwordInput: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  addUser: (params: AddUserParams) => { ok: boolean; error?: string };
  removeUser: (usernameOrId: string) => Promise<void>;
  isAdmin: boolean;
  isModerator: boolean;
}

const LOCAL_SESSION_KEY = "ecokids:admin:session";
const LOCAL_STAFF_KEY = "ecokids:admin:staff_accounts";

const DEFAULT_USERS: StaffUser[] = [
  {
    id: "admin-root",
    username: "admin",
    displayName: "Bosh Administrator",
    role: "admin",
    password: "admin123",
  },
  {
    id: "mod-1",
    username: "moderator",
    displayName: "Eko Yordamchi",
    role: "moderator",
    password: "mod123",
  },
];

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AdminSession | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_SESSION_KEY);
      return stored ? (JSON.parse(stored) as AdminSession) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<StaffUser[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STAFF_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as StaffUser[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_USERS;
  });

  const saveStaffUsers = (newUsers: StaffUser[]) => {
    setUsers(newUsers);
    try {
      localStorage.setItem(LOCAL_STAFF_KEY, JSON.stringify(newUsers));
    } catch (err) {
      void err;
    }
  };

  // Add User
  const addUser = useCallback(
    ({ username, password, displayName, role }: AddUserParams) => {
      const cleanUsername = username.trim().toLowerCase();
      if (!cleanUsername) return { ok: false, error: "Login bo'sh bo'lishi mumkin emas" };

      if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
        return { ok: false, error: "Bu login bilan foydalanuvchi allaqachon mavjud" };
      }

      const newUser: StaffUser = {
        id: `staff-${Date.now()}`,
        username: cleanUsername,
        displayName: displayName.trim() || cleanUsername,
        role,
        password: password || "123456",
      };

      const updated = [...users, newUser];
      saveStaffUsers(updated);

      // Also attempt Supabase profiles table upsert
      try {
        supabase
          .from("profiles")
          .upsert({
            id: newUser.id,
            display_name: newUser.displayName,
            role: newUser.role,
          })
          .then(() => {
            /* synced */
          })
          .catch(() => {
            /* ignore */
          });
      } catch (err) {
        void err;
      }

      return { ok: true };
    },
    [users]
  );

  // Remove User
  const removeUser = useCallback(
    async (usernameOrId: string) => {
      const updated = users.filter(
        (u) => u.username.toLowerCase() !== usernameOrId.toLowerCase() && u.id !== usernameOrId
      );
      saveStaffUsers(updated);

      // If current session user was deleted, log out
      if (
        session &&
        (session.username.toLowerCase() === usernameOrId.toLowerCase() || session.id === usernameOrId)
      ) {
        setSession(null);
        try {
          localStorage.removeItem(LOCAL_SESSION_KEY);
        } catch (err) {
          void err;
        }
      }

      try {
        await supabase.from("profiles").delete().eq("id", usernameOrId);
      } catch (err) {
        void err;
      }
    },
    [users, session]
  );

  // Login
  const login = useCallback(
    async (usernameInput: string, passwordInput: string) => {
      const cleanLogin = usernameInput.trim().toLowerCase();

      // 1. Check local staff accounts list
      const matchedUser = users.find(
        (u) =>
          (u.username.toLowerCase() === cleanLogin ||
            `${u.username.toLowerCase()}@ecokids.uz` === cleanLogin) &&
          u.password === passwordInput
      );

      if (matchedUser) {
        const staffSession: AdminSession = {
          id: matchedUser.id,
          username: matchedUser.username,
          displayName: matchedUser.displayName,
          role: matchedUser.role,
        };
        setSession(staffSession);
        try {
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(staffSession));
        } catch (err) {
          void err;
        }
        return { ok: true };
      }

      // 2. Default root admin fallback
      if (cleanLogin === "admin" && passwordInput === "admin123") {
        const rootSession: AdminSession = {
          id: "admin-root",
          username: "admin",
          displayName: "Bosh Administrator",
          role: "admin",
        };
        setSession(rootSession);
        try {
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(rootSession));
        } catch (err) {
          void err;
        }
        return { ok: true };
      }

      // 3. Supabase Auth fallback
      try {
        const emailToTry = cleanLogin.includes("@") ? cleanLogin : `${cleanLogin}@ecokids.uz`;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailToTry,
          password: passwordInput,
        });

        if (!error && data.session?.user) {
          const authUser = data.session.user;
          const supSession: AdminSession = {
            id: authUser.id,
            username: cleanLogin,
            displayName: authUser.user_metadata?.display_name || cleanLogin,
            role: "admin",
          };
          setSession(supSession);
          try {
            localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(supSession));
          } catch (err) {
            void err;
          }
          return { ok: true };
        }
      } catch (err) {
        console.warn("Supabase auth attempted:", err);
      }

      return {
        ok: false,
        error: "Login yoki parol noto'g'ri. Standart: admin / admin123",
      };
    },
    [users]
  );

  // Logout
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

  return (
    <AdminAuthContext.Provider
      value={{
        session,
        loading,
        users,
        login,
        logout,
        addUser,
        removeUser,
        isAdmin: session?.role === "admin",
        isModerator: session?.role === "moderator" || session?.role === "admin",
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
