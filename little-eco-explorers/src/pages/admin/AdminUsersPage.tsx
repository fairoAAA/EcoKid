import { useState } from "react";
import { AdminLayout } from "@/admin/AdminLayout";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { AdminRole } from "@/admin/AdminAuthContext";

const AdminUsersPage = () => {
  const { users, addUser, removeUser, session } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", displayName: "", role: "moderator" as AdminRole });
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!form.username.trim() || !form.password.trim() || !form.displayName.trim()) {
      setError("Barcha maydonlarni to'ldiring");
      return;
    }
    const result = addUser({ ...form });
    if (!result.ok) {
      setError(result.error ?? "Xatolik");
      return;
    }
    setOpen(false);
    setForm({ username: "", password: "", displayName: "", role: "moderator" });
    setError("");
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Foydalanuvchilar</h1>
          <p className="text-sm text-muted-foreground">Admin va yordamchi (moderator) hisoblarini boshqaring.</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4" /> Yangi hisob
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.username}>
                <TableCell className="font-medium">{u.displayName}</TableCell>
                <TableCell className="text-muted-foreground">{u.username}</TableCell>
                <TableCell>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {u.role === "admin" ? "Administrator" : "Yordamchi"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {u.username !== session?.username ? (
                    <Button variant="ghost" size="icon" onClick={() => confirm(`${u.displayName} o'chirilsinmi?`) && removeUser(u.username)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Siz</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi hisob yaratish</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>To'liq ism</Label>
              <Input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Login</Label>
              <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Parol</Label>
              <Input type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Rol</Label>
              <Select value={form.role} onValueChange={(v: AdminRole) => setForm({ ...form, role: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moderator">Yordamchi (moderator)</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleAdd}>Yaratish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsersPage;
