import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Lock, Mail, User, Sparkles, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserAuth } from "@/contexts/UserAuthContext";

const AVATARS = ["🦊", "🐻", "🦉", "🐿️", "🐼", "🐯", "🦁", "🐬", "🦅"];

export const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { signIn, signUp } = useUserAuth();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Sign In Form
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up Form
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🦊");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen || typeof document === "undefined") return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!signInEmail.trim() || !signInPassword.trim()) {
      setError("Email va parolni kiriting");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn(signInEmail, signInPassword);
      if (res.ok) {
        onClose();
      } else {
        setError(res.error || "Kirishda xatolik yuz berdi");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setError("Barcha maydonlarni to'ldiring");
      return;
    }

    if (signUpPassword.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setLoading(true);
    try {
      const res = await signUp(signUpName, signUpEmail, signUpPassword, selectedAvatar);
      if (res.ok) {
        setSuccessMsg("Tabriklaymiz! Akkauntingiz muvaffaqiyatli yaratildi 🎉");
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setError(res.error || "Ro'yxatdan o'tishda xatolik");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-4 flex min-h-full items-center justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border-2 border-primary/20 overflow-hidden my-auto max-h-[calc(100vh-1.5rem)] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Yopish"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tabs */}
        <div className="pt-5 px-6 pb-2 text-center flex-shrink-0 bg-card border-b border-border/40">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-2 shadow-inner">
            <span className="text-2xl">{activeTab === "signup" ? selectedAvatar : "🌿"}</span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            {activeTab === "signin" ? "EcoKids Akkauntiga Kirish" : "Yangi Eko-Akkaunt Ochish"}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {activeTab === "signin"
              ? "O'z yutuqlaringiz va eko-ballaringizni saqlang"
              : "Ro'yxatdan o'ting va sovg'a sifatida +50 Eko-Ball oling! 🎁"}
          </p>

          <div className="flex bg-muted/70 p-1 rounded-xl mt-3">
            <button
              type="button"
              onClick={() => { setActiveTab("signin"); setError(""); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "signin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Kirish
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("signup"); setError(""); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Ro'yxatdan o'tish
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-5 pt-3 overflow-y-auto flex-1 overscroll-contain">
          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> {successMsg}
            </div>
          )}

          {activeTab === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signin-email" className="text-xs">Elektron pochta</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="misol@ecokids.uz"
                    className="pl-9 h-10 text-sm"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="signin-password" className="text-xs">Parol</Label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 h-10 text-sm"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-2 h-10 font-bold" disabled={loading}>
                {loading ? "Kirilmoqda..." : "Kirish"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3">
              {/* Avatar Selector */}
              <div>
                <Label className="text-xs block mb-1">O'zingizga yoqqan avatarni tanlang:</Label>
                <div className="flex flex-wrap gap-1.5 justify-center bg-muted/40 p-2 rounded-xl border border-border">
                  {AVATARS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedAvatar(emoji)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all ${
                        selectedAvatar === emoji
                          ? "bg-primary text-white scale-110 shadow-sm ring-2 ring-primary"
                          : "bg-card hover:bg-muted"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="signup-name" className="text-xs">Ismingiz yoki Taxallusingiz</Label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="signup-name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="Jasur"
                    className="pl-9 h-10 text-sm"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="signup-email" className="text-xs">Elektron pochta</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="jasur@gmail.com"
                    className="pl-9 h-10 text-sm"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="signup-password" className="text-xs">Parol (kamida 6 ta belgi)</Label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 h-10 text-sm"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-2 h-10 font-bold bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? "Ro'yxatdan o'tilmoqda..." : "Akkaunt Yaratish"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
