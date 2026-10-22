import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarEmoji: string;
  ecoPoints: number;
  levelTitle: string;
  badges: string[];
  createdAt: string;
}

interface StoredLocalAccount extends UserProfile {
  passwordHash: string;
}

interface UserAuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (
    displayName: string,
    email: string,
    password: string,
    avatarEmoji?: string
  ) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  addEcoPoints: (amount: number) => void;
  updateAvatar: (emoji: string) => void;
}

const LOCAL_USER_SESSION_KEY = "ecokids:user:active_session";
const LOCAL_USER_DB_KEY = "ecokids:user:accounts_list";

function calculateLevelTitle(points: number): string {
  if (points >= 500) return "Oliy Eko-Master 🌟";
  if (points >= 250) return "Yashil Qo'riqchi 🛡️";
  if (points >= 100) return "Tabiat Do'sti 🌿";
  return "Yosh Eko-Kashfiyotchi 🌱";
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_USER_SESSION_KEY);
      return stored ? (JSON.parse(stored) as UserProfile) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Sync session state to localStorage
  const persistSession = (profile: UserProfile | null) => {
    setUser(profile);
    try {
      if (profile) {
        localStorage.setItem(LOCAL_USER_SESSION_KEY, JSON.stringify(profile));
      } else {
        localStorage.removeItem(LOCAL_USER_SESSION_KEY);
      }
    } catch (err) {
      void err;
    }
  };

  // Check Supabase session on startup
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          const authUser = data.session.user;
          // Fetch or initialize profile
          const meta = authUser.user_metadata || {};
          const profile: UserProfile = {
            id: authUser.id,
            email: authUser.email || "",
            displayName: meta.display_name || authUser.email?.split("@")[0] || "Eko-Kashfiyotchi",
            avatarEmoji: meta.avatar_emoji || "🦊",
            ecoPoints: Number(meta.eco_points || 50),
            levelTitle: calculateLevelTitle(Number(meta.eco_points || 50)),
            badges: ["Yangi do'st 🌱"],
            createdAt: authUser.created_at || new Date().toISOString(),
          };
          persistSession(profile);
        }
      } catch (err) {
        void err;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        // If user logged out of Supabase and no local session
        // Don't wipe if user is logged into local account
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const getLocalAccounts = (): StoredLocalAccount[] => {
    try {
      const stored = localStorage.getItem(LOCAL_USER_DB_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveLocalAccounts = (accounts: StoredLocalAccount[]) => {
    try {
      localStorage.setItem(LOCAL_USER_DB_KEY, JSON.stringify(accounts));
    } catch (err) {
      void err;
    }
  };

  // Sign Up
  const signUp = useCallback(
    async (displayName: string, email: string, password: string, avatarEmoji: string = "🦊") => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = displayName.trim() || "Kichik Eko-Kashfiyotchi";

      // 1. Try Supabase Auth
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              display_name: cleanName,
              avatar_emoji: avatarEmoji,
              eco_points: 50,
            },
          },
        });

        if (!error && data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: cleanEmail,
            displayName: cleanName,
            avatarEmoji,
            ecoPoints: 50,
            levelTitle: calculateLevelTitle(50),
            badges: ["Yangi do'st 🌱"],
            createdAt: new Date().toISOString(),
          };
          persistSession(profile);
          return { ok: true };
        }
      } catch (err) {
        console.warn("Supabase signUp unavailable, falling back to local account:", err);
      }

      // 2. Local Fallback Account
      const accounts = getLocalAccounts();
      if (accounts.some((a) => a.email === cleanEmail)) {
        return { ok: false, error: "Ushbu email bilan akkaunt allaqachon ro'yxatdan o'tgan" };
      }

      const newAccount: StoredLocalAccount = {
        id: `local-user-${Date.now()}`,
        email: cleanEmail,
        displayName: cleanName,
        avatarEmoji,
        ecoPoints: 50, // Welcome gift points
        levelTitle: calculateLevelTitle(50),
        badges: ["Yangi do'st 🌱"],
        createdAt: new Date().toISOString(),
        passwordHash: password, // Simple local store
      };

      accounts.push(newAccount);
      saveLocalAccounts(accounts);
      persistSession(newAccount);
      return { ok: true };
    },
    []
  );

  // Sign In
  const signIn = useCallback(async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (!error && data.session?.user) {
        const authUser = data.session.user;
        const meta = authUser.user_metadata || {};
        const profile: UserProfile = {
          id: authUser.id,
          email: authUser.email || cleanEmail,
          displayName: meta.display_name || cleanEmail.split("@")[0],
          avatarEmoji: meta.avatar_emoji || "🦊",
          ecoPoints: Number(meta.eco_points || 50),
          levelTitle: calculateLevelTitle(Number(meta.eco_points || 50)),
          badges: ["Yangi do'st 🌱"],
          createdAt: authUser.created_at || new Date().toISOString(),
        };
        persistSession(profile);
        return { ok: true };
      }
    } catch (err) {
      console.warn("Supabase signIn unavailable, checking local accounts:", err);
    }

    // 2. Local Accounts Fallback
    const accounts = getLocalAccounts();
    const match = accounts.find((a) => a.email === cleanEmail && a.passwordHash === password);
    if (match) {
      persistSession(match);
      return { ok: true };
    }

    return { ok: false, error: "Email yoki parol noto'g'ri kiritildi" };
  }, []);

  // Sign Out
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      void err;
    }
    persistSession(null);
  }, []);

  // Add Eco Points (earned in games, quizzes, challenges)
  const addEcoPoints = useCallback(
    (amount: number) => {
      if (!user) return;
      const nextPoints = user.ecoPoints + amount;
      const updated: UserProfile = {
        ...user,
        ecoPoints: nextPoints,
        levelTitle: calculateLevelTitle(nextPoints),
      };
      persistSession(updated);

      // Update in local accounts if exists
      const accounts = getLocalAccounts();
      const idx = accounts.findIndex((a) => a.id === user.id);
      if (idx !== -1) {
        accounts[idx] = { ...accounts[idx], ...updated };
        saveLocalAccounts(accounts);
      }
    },
    [user]
  );

  // Update Avatar
  const updateAvatar = useCallback(
    (emoji: string) => {
      if (!user) return;
      const updated: UserProfile = { ...user, avatarEmoji: emoji };
      persistSession(updated);

      const accounts = getLocalAccounts();
      const idx = accounts.findIndex((a) => a.id === user.id);
      if (idx !== -1) {
        accounts[idx] = { ...accounts[idx], ...updated };
        saveLocalAccounts(accounts);
      }
    },
    [user]
  );

  return (
    <UserAuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        addEcoPoints,
        updateAvatar,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within UserAuthProvider");
  }
  return context;
};
