import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  HelpCircle,
  Trash2,
  Mail,
  Users,
  Download,
  LogOut,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "./AdminAuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", label: "Boshqaruv paneli", icon: LayoutDashboard, exact: true },
  { to: "/admin/articles", label: "Maqolalar", icon: Newspaper },
  { to: "/admin/quiz-questions", label: "Viktorina savollari", icon: HelpCircle },
  { to: "/admin/recycle-items", label: "Chiqindi elementlari", icon: Trash2 },
  { to: "/admin/subscribers", label: "Obunachilar", icon: Mail },
  { to: "/admin/users", label: "Foydalanuvchilar", icon: Users, adminOnly: true },
  { to: "/admin/export", label: "Eksport / Import", icon: Download },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { session, logout, isAdmin } = useAdminAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleNav = navItems.filter((item) => !item.adminOnly || isAdmin);

  const SidebarContent = (
    <>
      <div className="px-4 py-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <span className="font-display font-bold text-lg">EcoKids Admin</span>
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {visibleNav.map((item) => {
          const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-border space-y-2">
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{session?.displayName}</span>
          <br />
          {session?.role === "admin" ? "Administrator" : "Yordamchi (moderator)"}
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <Home className="w-4 h-4" /> Saytga qaytish
        </Link>
        <Button variant="outline" size="sm" className="w-full" onClick={logout}>
          <LogOut className="w-4 h-4" /> Chiqish
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-card border-r border-border fixed inset-y-0">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-card flex flex-col">{SidebarContent}</aside>
        </div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border sticky top-0 z-40">
          <span className="font-display font-bold">🌍 EcoKids Admin</span>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};
