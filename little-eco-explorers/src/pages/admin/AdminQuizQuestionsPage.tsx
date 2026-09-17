import { useState } from "react";
import { AdminLayout } from "@/admin/AdminLayout";
import { useOverlayData } from "@/hooks/useOverlayData";
import { quizQuestions as baseQuizQuestions, QuizQuestion } from "@/data/quizQuestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, RotateCcw } from "lucide-react";

const OVERLAY_KEY = "ecokids:overlay:quizQuestions";

const emptyQuestion = (nextId: number): QuizQuestion => ({
  id: nextId,
  emoji: "🌍",
  question: { uz: "", ru: "", en: "" },
  options: [
    { uz: "", ru: "", en: "" },
    { uz: "", ru: "", en: "" },
    { uz: "", ru: "", en: "" },
    { uz: "", ru: "", en: "" },
  ],
  correct: 0,
  explanation: { uz: "", ru: "", en: "" },
});

const AdminQuizQuestionsPage = () => {
  const { data: questions, save, resetToBase, isCustomized } = useOverlayData(OVERLAY_KEY, baseQuizQuestions);
  const [editing, setEditing] = useState<QuizQuestion | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openNew = () => {
    const nextId = Math.max(0, ...questions.map((q) => q.id)) + 1;
    setEditing(emptyQuestion(nextId));
    setIsNew(true);
  };

  const openEdit = (q: QuizQuestion) => {
    setEditing(JSON.parse(JSON.stringify(q)));
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.question.uz.trim() || editing.options.some((o) => !o.uz.trim())) {
      alert("Savol va barcha 4 ta variant (kamida o'zbekcha) to'ldirilishi shart");
      return;
    }
    if (isNew) {
      save([...questions, editing]);
    } else {
      save(questions.map((q) => (q.id === editing.id ? editing : q)));
    }
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleteId === null) return;
    save(questions.filter((q) => q.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Viktorina savollari</h1>
          <p className="text-sm text-muted-foreground">
            Jami {questions.length} ta savol ({Math.ceil(questions.length / 10)} bosqich).{" "}
            {isCustomized && "(Tahrirlangan)"}
          </p>
        </div>
        <div className="flex gap-2">
          {isCustomized && (
            <Button variant="outline" size="sm" onClick={() => confirm("Barcha tahrirlar bekor qilinsinmi?") && resetToBase()}>
              <RotateCcw className="w-4 h-4" /> Standartga qaytarish
            </Button>
          )}
          <Button size="sm" onClick={openNew}>
            <Plus className="w-4 h-4" /> Yangi savol
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">#</TableHead>
              <TableHead>Savol (UZ)</TableHead>
              <TableHead>To'g'ri javob</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q.id}>
                <TableCell className="text-muted-foreground">{q.emoji}</TableCell>
                <TableCell className="font-medium max-w-md truncate">{q.question.uz}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{q.options[q.correct]?.uz}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(q)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(q.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Yangi savol" : "Savolni tahrirlash"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-1.5 max-w-[120px]">
                <Label>Emoji</Label>
                <Input value={editing.emoji} onChange={(e) => setEditing({ ...editing, emoji: e.target.value })} />
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
                      <Label>Savol matni</Label>
                      <Input
                        value={editing.question[lang]}
                        onChange={(e) => setEditing({ ...editing, question: { ...editing.question, [lang]: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Variantlar (to'g'ri javobni pastdagi tugma bilan belgilang)</Label>
                      {editing.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <button
                            type="button"
                            onClick={() => setEditing({ ...editing, correct: idx as 0 | 1 | 2 | 3 })}
                            className={`w-7 h-7 flex-shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                              editing.correct === idx ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground/30"
                            }`}
                            title="To'g'ri javob sifatida belgilash"
                          >
                            {idx + 1}
                          </button>
                          <Input
                            value={opt[lang]}
                            onChange={(e) => {
                              const newOptions = [...editing.options] as QuizQuestion["options"];
                              newOptions[idx] = { ...newOptions[idx], [lang]: e.target.value };
                              setEditing({ ...editing, options: newOptions });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <Label>Tushuntirish (javobdan keyin ko'rsatiladi)</Label>
                      <Textarea
                        rows={2}
                        value={editing.explanation[lang]}
                        onChange={(e) => setEditing({ ...editing, explanation: { ...editing.explanation, [lang]: e.target.value } })}
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

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Savolni o'chirish</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
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

export default AdminQuizQuestionsPage;
