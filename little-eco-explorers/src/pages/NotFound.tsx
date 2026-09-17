import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center py-20 px-4">
          <span className="text-7xl mb-4 inline-block">🍂</span>
          <h1 className="mb-2 font-display text-5xl font-black text-primary">404</h1>
          <p className="mb-2 text-xl font-semibold text-foreground">{t("notFound.title")}</p>
          <p className="mb-6 text-muted-foreground max-w-md mx-auto">{t("notFound.subtitle")}</p>
          <Link to="/">
            <Button size="lg">{t("notFound.backHome")}</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
