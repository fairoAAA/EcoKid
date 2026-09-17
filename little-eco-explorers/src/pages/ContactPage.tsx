import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Mail } from "lucide-react";

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-sky/10 py-16 md:py-24">
          <div className="eco-container text-center">
            <span className="text-7xl mb-4 inline-block">✉️</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{t("contact.title")}</h1>
          </div>
        </section>
        <section className="eco-section">
          <div className="eco-container max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed mb-6">{t("contact.body")}</p>
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-semibold">{t("contact.emailLabel")}:</span>
              <a href="mailto:hello@ecokids.example" className="text-primary hover:underline">
                hello@ecokids.example
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
