import { useRef, useState } from "react";
import { AdminLayout } from "@/admin/AdminLayout";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles } from "@/data/articles";
import { quizQuestions as baseQuizQuestions } from "@/data/quizQuestions";
import { allTrashItems } from "@/data/recycleItems";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileJson } from "lucide-react";

const AdminExportPage = () => {
  const articlesOverlay = useOverlayData("ecokids:overlay:articles", baseArticles);
  const questionsOverlay = useOverlayData("ecokids:overlay:quizQuestions", baseQuizQuestions);
  const itemsOverlay = useOverlayData("ecokids:overlay:trashItems", allTrashItems);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState("");

  const downloadJson = (data: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAll = () => {
    downloadJson(
      {
        articles: articlesOverlay.data,
        quizQuestions: questionsOverlay.data,
        trashItems: itemsOverlay.data,
        exportedAt: new Date().toISOString(),
      },
      "ecokids-content-export.json"
    );
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.articles) articlesOverlay.save(parsed.articles);
        if (parsed.quizQuestions) questionsOverlay.save(parsed.quizQuestions);
        if (parsed.trashItems) itemsOverlay.save(parsed.trashItems);
        setImportMsg("✅ Muvaffaqiyatli import qilindi!");
      } catch {
        setImportMsg("❌ Fayl formatida xatolik. To'g'ri JSON ekanligini tekshiring.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Eksport / Import</h1>
        <p className="text-sm text-muted-foreground">
          Backend bo'lmagani uchun bu — o'zgarishlaringizni "haqiqiy" saytga chiqarishning yo'li.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <FileJson className="w-8 h-8 text-primary mb-3" />
          <h2 className="font-display font-bold text-lg mb-2">Eksport qilish</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Barcha maqolalar, viktorina savollari va chiqindi elementlarini bitta JSON faylga yuklab oling.
            Bu faylni dasturchiga bering — u <code className="bg-muted px-1 rounded">src/data/</code> papkasidagi
            fayllarni yangilab, o'zgarishlarni barcha foydalanuvchilar uchun chiqaradi.
          </p>
          <Button onClick={exportAll}>
            <Download className="w-4 h-4" /> JSON faylni yuklab olish
          </Button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <Upload className="w-8 h-8 text-primary mb-3" />
          <h2 className="font-display font-bold text-lg mb-2">Import qilish</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Avval eksport qilingan (yoki boshqa admin tomonidan berilgan) JSON faylni yuklab, uni shu
            brauzeringizga tiklang.
          </p>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4" /> JSON fayl tanlash
          </Button>
          {importMsg && <p className="text-sm mt-3">{importMsg}</p>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminExportPage;
