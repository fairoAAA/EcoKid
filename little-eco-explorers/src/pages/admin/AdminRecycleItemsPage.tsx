import { useState } from "react";
import { AdminLayout } from "@/admin/AdminLayout";
import { useOverlayData } from "@/hooks/useOverlayData";
import { allTrashItems, TrashItem, TrashType, trashBins } from "@/data/recycleItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, RotateCcw } from "lucide-react";

const OVERLAY_KEY = "ecokids:overlay:trashItems";

const emptyItem = (): TrashItem => ({
  name: { uz: "", ru: "", en: "" },
  emoji: "🗑️",
  type: "plastic",
});

const AdminRecycleItemsPage = () => {
  const { data: items, save, resetToBase, isCustomized } = useOverlayData(OVERLAY_KEY, allTrashItems);
  const [editing, setEditing] = useState<TrashItem | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const openNew = () => {
    setEditing(emptyItem());
    setEditIndex(null);
  };

  const openEdit = (item: TrashItem, idx: number) => {
    setEditing(JSON.parse(JSON.stringify(item)));
    setEditIndex(idx);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.name.uz.trim()) {
      alert("O'zbekcha nom to'ldirilishi shart");
      return;
    }
    if (editIndex === null) {
      save([...items, editing]);
    } else {
      save(items.map((it, i) => (i === editIndex ? editing : it)));
    }
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleteIndex === null) return;
    save(items.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  const binLabel = (type: TrashType) => trashBins.find((b) => b.type === type)?.name.uz ?? type;

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Chiqindi elementlari</h1>
          <p className="text-sm text-muted-foreground">
            "Axlatni saralash" o'yinidagi buyumlar. Jami {items.length} ta. {isCustomized && "(Tahrirlangan)"}
          </p>
        </div>
        <div className="flex gap-2">
          {isCustomized && (
            <Button variant="outline" size="sm" onClick={() => confirm("Barcha tahrirlar bekor qilinsinmi?") && resetToBase()}>
              <RotateCcw className="w-4 h-4" /> Standartga qaytarish
            </Button>
          )}
          <Button size="sm" onClick={openNew}>
            <Plus className="w-4 h-4" /> Yangi buyum
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">Emoji</TableHead>
              <TableHead>Nomi (UZ)</TableHead>
              <TableHead>Turi</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-2xl">{item.emoji}</TableCell>
                <TableCell className="font-medium">{item.name.uz}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{binLabel(item.type)}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item, idx)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteIndex(idx)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editIndex === null ? "Yangi buyum" : "Buyumni tahrirlash"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label>Emoji</Label>
                <Input value={editing.emoji} onChange={(e) => setEditing({ ...editing, emoji: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Nomi (UZ)</Label>
                <Input value={editing.name.uz} onChange={(e) => setEditing({ ...editing, name: { ...editing.name, uz: e.target.value } })} />
              </div>
              <div className="space-y-1.5">
                <Label>Nomi (RU)</Label>
                <Input value={editing.name.ru} onChange={(e) => setEditing({ ...editing, name: { ...editing.name, ru: e.target.value } })} />
              </div>
              <div className="space-y-1.5">
                <Label>Nomi (EN)</Label>
                <Input value={editing.name.en} onChange={(e) => setEditing({ ...editing, name: { ...editing.name, en: e.target.value } })} />
              </div>
              <div className="space-y-1.5">
                <Label>Chiqindi turi (qaysi qutiga tushishi kerak)</Label>
                <Select value={editing.type} onValueChange={(v: TrashType) => setEditing({ ...editing, type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {trashBins.map((b) => (
                      <SelectItem key={b.type} value={b.type}>
                        {b.emoji} {b.name.uz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Bekor qilish
            </Button>
            <Button onClick={handleSave}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteIndex !== null} onOpenChange={(open) => !open && setDeleteIndex(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyumni o'chirish</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Davom etasizmi?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteIndex(null)}>
              Bekor qilish
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              O'chirish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminRecycleItemsPage;
