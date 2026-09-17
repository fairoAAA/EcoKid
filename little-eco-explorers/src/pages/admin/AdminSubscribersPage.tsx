import { useState } from "react";
import { AdminLayout } from "@/admin/AdminLayout";
import { getSubscribers, removeSubscriber } from "@/admin/subscribersStorage";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Mail } from "lucide-react";

const AdminSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState(getSubscribers());

  const handleRemove = (email: string) => {
    removeSubscriber(email);
    setSubscribers(getSubscribers());
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Obunachilar</h1>
        <p className="text-sm text-muted-foreground">
          Yangiliklar xabarnomasiga (newsletter) obuna bo'lgan foydalanuvchilar ro'yxati — faqat shu brauzerda yig'ilgan.
        </p>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Hozircha obunachilar yo'q.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((s) => (
                <TableRow key={s.email}>
                  <TableCell className="font-medium">{s.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(s.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(s.email)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSubscribersPage;
