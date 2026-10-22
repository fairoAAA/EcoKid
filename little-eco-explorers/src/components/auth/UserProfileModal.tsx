import { useState } from "react";
import { createPortal } from "react-dom";
import { X, LogOut, Award, Sparkles, Shield, Flame, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/contexts/UserAuthContext";

const AVATARS = ["🦊", "🐻", "🦉", "🐿️", "🐼", "🐯", "🦁", "🐬", "🦅"];

export const UserProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, signOut, updateAvatar } = useUserAuth();
  const [editingAvatar, setEditingAvatar] = useState(false);

  if (!isOpen || !user || typeof document === "undefined") return null;

  // Next level points calculation
  const nextMilestone = user.ecoPoints < 100 ? 100 : user.ecoPoints < 250 ? 250 : 500;
  const levelProgress = Math.min(100, Math.round((user.ecoPoints / nextMilestone) * 100));

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-4 flex min-h-full items-center justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border-2 border-emerald-500/30 overflow-hidden my-auto max-h-[calc(100vh-1.5rem)] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Yopish"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Card Header */}
        <div className="pt-6 px-6 pb-3 text-center bg-gradient-to-b from-emerald-500/15 via-background to-background flex-shrink-0 border-b border-border/40">
          <div className="relative inline-block mx-auto mb-2">
            <button
              type="button"
              onClick={() => setEditingAvatar(!editingAvatar)}
              className="w-16 h-16 rounded-2xl bg-card border-4 border-emerald-400 shadow-md flex items-center justify-center text-4xl hover:scale-105 transition-transform"
              title="Avatarni o'zgartirish uchun bosing"
            >
              {user.avatarEmoji}
            </button>
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold shadow">
              O'zgartirish
            </span>
          </div>

          {editingAvatar && (
            <div className="mb-3 p-2 bg-muted/70 rounded-2xl border border-border animate-in zoom-in-95 duration-150">
              <span className="text-xs text-muted-foreground block mb-1">Yangi avatarni tanlang:</span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => { updateAvatar(emoji); setEditingAvatar(false); }}
                    className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center hover:scale-110 ${
                      user.avatarEmoji === emoji ? "bg-emerald-500 text-white" : "bg-card"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            {user.displayName}
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold mt-1">
            <Shield className="w-3.5 h-3.5" />
            {user.levelTitle}
          </div>
        </div>

        {/* Stats & Progress */}
        <div className="px-6 pb-6 pt-3 space-y-4 overflow-y-auto flex-1 overscroll-contain">
          {/* Eco Points Box */}
          <div className="bg-muted/40 border border-border rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-1.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-emerald-500" /> Jami Eko-Ballar
              </span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                {user.ecoPoints} ball
              </span>
            </div>

            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <div className="text-[11px] text-muted-foreground text-right">
              Keyingi darajagacha: {Math.max(0, nextMilestone - user.ecoPoints)} ball
            </div>
          </div>

          {/* Badges Earned */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Yutuqlar va Nishonlar
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300"
                >
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  {badge}
                </div>
              ))}
              <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted text-muted-foreground">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Faol Eko-Ishtirokchi
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="pt-2 border-t border-border flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground truncate max-w-[180px]">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30 gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Chiqish
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
