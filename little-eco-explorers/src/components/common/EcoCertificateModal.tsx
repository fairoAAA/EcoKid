import { useState } from "react";
import { Award, Printer, X, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";

interface EcoCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  badgeEmoji?: string;
}

export const EcoCertificateModal = ({
  isOpen,
  onClose,
  quizTitle,
  score,
  totalQuestions,
  badgeEmoji = "🌱",
}: EcoCertificateModalProps) => {
  const { language } = useLanguage();
  const [userName, setUserName] = useState("Jasur Eko-Kashfiyotchi");

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString(
    language === "ru" ? "ru-RU" : language === "en" ? "en-US" : "uz-UZ",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const texts = {
    title: {
      uz: "TABIAT QAHRAMONI DIPLOMI",
      ru: "ДИПЛОМ ЮНОГО ЭКО-ГЕРОЯ",
      en: "ECO-HERO CERTIFICATE",
    },
    presentedTo: {
      uz: "Ushbu sertifikat ekologik bilimlarni a'lo darajada o'zlashtirgani uchun berildi:",
      ru: "Настоящий сертификат вручается за отличные знания по экологии:",
      en: "This certificate is awarded for outstanding ecological knowledge to:",
    },
    namePlaceholder: {
      uz: "Ismingizni yozing...",
      ru: "Введите ваше имя...",
      en: "Enter your name...",
    },
    quizLabel: {
      uz: "Muvaffaqiyatli topshirilgan viktorina:",
      ru: "Успешно пройденная викторина:",
      en: "Successfully completed quiz:",
    },
    resultLabel: {
      uz: "To'plangan natija:",
      ru: "Результат:",
      en: "Achieved score:",
    },
    officialBadge: {
      uz: "EcoKids Rasmiy Eko-Sertifikati",
      ru: "Официальный сертификат EcoKids",
      en: "EcoKids Official Certificate",
    },
    printBtn: {
      uz: "Chop etish / PDF saqlash",
      ru: "Печать / Сохранить в PDF",
      en: "Print / Save as PDF",
    },
    closeBtn: {
      uz: "Yopish",
      ru: "Закрыть",
      en: "Close",
    },
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-card rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden print:m-0 print:border-4 print:shadow-none">
        {/* Close Button (hidden in print) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Yopish"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Body */}
        <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-amber-50/60 via-background to-emerald-50/60 relative">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 text-2xl select-none">🌿</div>
          <div className="absolute top-3 right-3 text-2xl select-none print:block hidden sm:block">🌿</div>
          <div className="absolute bottom-3 left-3 text-2xl select-none">🌸</div>
          <div className="absolute bottom-3 right-3 text-2xl select-none">🌸</div>

          {/* Badge Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-amber-900 mx-auto mb-4 flex items-center justify-center shadow-md border-4 border-white">
            <span className="text-4xl">{badgeEmoji}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-wider mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            {texts.title[language]}
            <Sparkles className="w-6 h-6 text-amber-500" />
          </h2>

          <p className="text-sm text-muted-foreground mb-4">
            {texts.presentedTo[language]}
          </p>

          {/* Child's Name Input & Display */}
          <div className="max-w-md mx-auto mb-6">
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={texts.namePlaceholder[language]}
              className="text-center font-display text-2xl font-bold text-primary border-b-2 border-primary/50 focus:border-primary shadow-none bg-transparent rounded-none h-12"
            />
          </div>

          <div className="bg-card/80 border border-emerald-200 rounded-2xl p-4 max-w-lg mx-auto mb-6 flex flex-col sm:flex-row items-center justify-around gap-4 shadow-sm">
            <div>
              <span className="text-xs text-muted-foreground block">{texts.quizLabel[language]}</span>
              <strong className="text-sm text-foreground">{quizTitle}</strong>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <span className="text-xs text-muted-foreground block">{texts.resultLabel[language]}</span>
              <span className="text-base font-bold text-emerald-600 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {score} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="flex items-center justify-between max-w-lg mx-auto text-xs text-muted-foreground border-t border-border/80 pt-4 px-4">
            <div>
              <span className="font-semibold block text-foreground">Sana:</span>
              <span>{today}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-full border border-emerald-300">
              <Award className="w-4 h-4" />
              {texts.officialBadge[language]}
            </div>
          </div>
        </div>

        {/* Action Buttons (hidden in print) */}
        <div className="p-4 bg-muted/40 border-t border-border flex items-center justify-end gap-3 print:hidden">
          <Button variant="outline" onClick={onClose}>
            {texts.closeBtn[language]}
          </Button>
          <Button onClick={handlePrint} className="gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold">
            <Printer className="w-4 h-4" />
            {texts.printBtn[language]}
          </Button>
        </div>
      </div>
    </div>
  );
};
