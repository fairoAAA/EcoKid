import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { addSubscriber } from "@/admin/subscribersStorage";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Bu loyihada backend yo'q, shuning uchun obunani shu brauzerning
    // localStorage'ida saqlaymiz - admin panelning "Obunachilar" bo'limida
    // ko'rinadi.
    await new Promise((resolve) => setTimeout(resolve, 600));
    addSubscriber(email);
    setIsLoading(false);
    setEmail("");

    toast({
      title: t("newsletter.successTitle"),
      description: t("newsletter.successDesc"),
    });
  };

  return (
    <section className="eco-section">
      <div className="eco-container">
        <div className="bg-gradient-to-br from-primary via-primary to-sky rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-accent/20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-accent/20 translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-card/10" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("newsletter.title")}
            </h2>

            <p className="text-primary-foreground/90 text-lg mb-8">{t("newsletter.description")}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card/95 border-0 h-12 text-foreground"
              />
              <Button type="submit" variant="accent" size="lg" disabled={isLoading} className="sm:w-auto">
                {isLoading ? (
                  t("common.loading")
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t("newsletter.subscribe")}
                  </>
                )}
              </Button>
            </form>

            <p className="text-primary-foreground/70 text-sm mt-4">{t("newsletter.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
