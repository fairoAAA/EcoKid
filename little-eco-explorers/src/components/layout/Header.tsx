import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Leaf, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SearchDialog } from "./SearchDialog";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserProfileModal } from "@/components/auth/UserProfileModal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { t } = useLanguage();
  const { user } = useUserAuth();

  const navItems = [
    { label: t("nav.animals"), href: "/animals" },
    { label: t("nav.plants"), href: "/plants" },
    { label: t("nav.games"), href: "/games" },
    { label: t("nav.articles"), href: "/articles" },
    { label: t("nav.quizzes"), href: "/quizzes" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-md border-b border-border">
      <div className="eco-container">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-soft group-hover:shadow-hover transition-all duration-300 group-hover:-translate-y-0.5">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl md:text-2xl font-bold text-primary">
              EcoKids
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button variant="nav" size="sm">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
              aria-label="Qidirish"
            >
              <Search className="w-5 h-5" />
            </Button>

            <LanguageSwitcher />

            {/* User Account Button */}
            {user ? (
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-left shadow-sm"
              >
                <span className="text-xl select-none">{user.avatarEmoji}</span>
                <div className="hidden sm:block">
                  <span className="text-xs font-bold text-foreground block leading-tight">
                    {user.displayName}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> {user.ecoPoints} ball
                  </span>
                </div>
              </button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAuthOpen(true)}
                className="gap-1.5 font-bold border-primary/40 hover:bg-primary/10 text-xs sm:text-sm"
              >
                <User className="w-4 h-4 text-primary" />
                <span>Kirish</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menyu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    {item.label}
                  </Button>
                </Link>
              ))}

              <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => { setSearchOpen(true); setIsMenuOpen(false); }}
                >
                  <Search className="w-4 h-4" /> {t("nav.search")}
                </Button>

                {user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setProfileOpen(true); setIsMenuOpen(false); }}
                    className="gap-1.5"
                  >
                    <span>{user.avatarEmoji}</span> Profilim ({user.ecoPoints} b.)
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => { setAuthOpen(true); setIsMenuOpen(false); }}
                    className="gap-1.5 font-bold"
                  >
                    <User className="w-4 h-4" /> Kirish / Ro'yxatdan o'tish
                  </Button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <UserProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </header>
  );
};
