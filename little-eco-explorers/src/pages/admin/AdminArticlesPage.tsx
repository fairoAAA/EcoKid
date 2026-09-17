import { useState } from "react";
import { AdminLayout } from "@/admin/AdminLayout";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles, Article, ArticleCategory } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OVERLAY_KEY = "ecokids:overlay:articles";
const emptyArticle = (): Article => ({
  slug: "",
  category: "tips",
  emoji: "📝",
  title: { uz: "", ru: "", en: "" },
  excerpt: { uz: "", ru: "", en: "" },
  body: [{ uz: "", ru: "", en: "" }],
  views: 0,
  rating: 5,
});

const categoryLabels: Record<ArticleCategory, string> = {
  animals: "Hayvonlar",
  plants: "O'simliklar",
  experiments: "Tajribalar",
  tips: "Maslahatlar",
};

const AdminArticlesPage = () => {
  const { data: articles, save, resetToBase, isCustomized } = useOverlayData(OVERLAY_KEY, baseArticles);
  const [editing, setEditing] = useState<Article | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  const openNew = () => {
    setEditing(emptyArticle());
    setIsNew(true);
  };

  const openEdit = (a: Article) => {
    setEditing(JSON.parse(JSON.stringify(a)));
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.slug.trim() || !editing.title.uz.trim()) {
      alert("Slug va o'zbekcha sarlavha to'ldirilishi shart");
      return;
    }
    if (isNew) {
      if (articles.some((a) => a.slug === editing.slug)) {
        alert("Bu slug allaqachon mavjud, boshqa slug tanlang");
        return;
      }
      save([...articles, editing]);
    } else {
      save(articles.map((a) => (a.slug === editing.slug ? editing : a)));
    }
    setEditing(null);
  };

  const handleDelete = () => {
    if (!deleteSlug) return;
    save(articles.filter((a) => a.slug !== deleteSlug));
    setDeleteSlug(null);
  };

  const setBodyParagraph = (lang: "uz" | "ru" | "en", text: string) => {
    if (!editing) return;
    const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    const maxLen = Math.max(paragraphs.length, editing.body.length, 1);
    const newBody = Array.from({ length: maxLen }, (_, i) => ({
      uz: editing.body[i]?.uz ?? "",
      ru: editing.body[i]?.ru ?? "",
      en: editing.body[i]?.en ?? "",
      [lang]: paragraphs[i] ?? "",
    })) as Article["body"];
    setEditing({ ...editing, body: newBody });
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Maqolalar</h1>
          <p className="text-sm text-muted-foreground">
            Jami {articles.length} ta maqola. {isCustomized && "(Bu ro'yxat sizning tahrirlaringizni o'z ichiga oladi.)"}
          </p>
        </div>
        <div className="flex gap-2">
          {isCustomized && (
            <Button variant="outline" size="sm" onClick={() => confirm("Barcha tahrirlar bekor qilinsinmi?") && resetToBase()}>
              <RotateCcw className="w-4 h-4" /> Standartga qaytarish
            </Button>
          )}
          <Button size="sm" onClick={openNew}>
            <Plus className="w-4 h-4" /> Yangi maqola
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sarlavha (UZ)</TableHead>
              <TableHead>Kategoriya</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((a) => (
              <TableRow key={a.slug}>
                <TableCell className="font-medium">
                  <span className="mr-2">{a.emoji}</span>
                  {a.title.uz}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{categoryLabels[a.category]}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{a.slug}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(a)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteSlug(a.slug)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tahrirlash / qo'shish oynasi */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Yangi maqola" : "Maqolani tahrirlash"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Slug (havoladagi identifikator)</Label>
                  <Input
                    value={editing.slug}
                    disabled={!isNew}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value.replace(/\s+/g, "-").toLowerCase() })}
                    placeholder="masalan: bird-nests"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Emoji</Label>
                  <Input value={editing.emoji} onChange={(e) => setEditing({ ...editing, emoji: e.target.value })} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Kategoriya</Label>
                <Select value={editing.category} onValueChange={(v: ArticleCategory) => setEditing({ ...editing, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="uz">
                <TabsList>
                  <TabsTrigger value="uz">🇺🇿 UZ</TabsTrigger>
                  <TabsTrigger value="ru">🇷🇺 RU</TabsTrigger>
                  <TabsTrigger value="en">🇬🇧 EN</TabsTrigger>
                </TabsList>
                {(["uz", "ru", "en"] as const).map((lang) => (
                  <TabsContent key={lang} value={lang} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label>Sarlavha</Label>
                      <Input
                        value={editing.title[lang]}
                        onChange={(e) => setEditing({ ...editing, title: { ...editing.title, [lang]: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Qisqacha tavsif</Label>
                      <Textarea
                        rows={2}
                        value={editing.excerpt[lang]}
                        onChange={(e) => setEditing({ ...editing, excerpt: { ...editing.excerpt, [lang]: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Maqola matni (har bir abzatsni bo'sh qator bilan ajrating)</Label>
                      <Textarea
                        rows={8}
                        value={editing.body.map((p) => p[lang]).join("\n\n")}
                        onChange={(e) => setBodyParagraph(lang, e.target.value)}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
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

      <Dialog open={!!deleteSlug} onOpenChange={(open) => !open && setDeleteSlug(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maqolani o'chirish</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteSlug(null)}>
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

export default AdminArticlesPage;
