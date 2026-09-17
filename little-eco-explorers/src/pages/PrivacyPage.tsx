import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const PrivacyPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-16 md:py-24">
          <div className="eco-container text-center">
            <span className="text-7xl mb-4 inline-block">🔒</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{t("privacy.title")}</h1>
          </div>
        </section>
        <section className="eco-section">
          <div className="eco-container max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
            <p>{t("privacy.p1")}</p>
            <p>{t("privacy.p2")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
