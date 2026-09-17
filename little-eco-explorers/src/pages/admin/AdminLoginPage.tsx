import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const AdminLoginPage = () => {
  const { session, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await login(username.trim(), password);
      if (res.ok) {
        navigate("/admin");
      } else {
        setError(res.error || "Login yoki parol noto'g'ri");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Tizimga kirishda kutilmagan xatolik yuz berdi";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Saytga qaytish
        </Link>
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Faqat admin va yordamchilar uchun</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Login yoki Email</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin yoki email"
                autoFocus
                disabled={submitting}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={submitting}
              />
            </div>
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Kirilmoqda..." : "Kirish"}
            </Button>
          </form>

          <div className="mt-6 text-xs text-muted-foreground bg-muted/60 rounded-lg p-3">
            <strong>Standart login:</strong> admin / admin123
            <br />
            Supabase foydalanuvchisi yoki standart administrator orqali kirishingiz mumkin.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
