import { Link } from "react-router-dom";
import { Leaf, Heart, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    sections: [
      { label: t("nav.animals"), href: "/animals" },
      { label: t("nav.plants"), href: "/plants" },
      { label: t("nav.games"), href: "/games" },
      { label: t("nav.quizzes"), href: "/quizzes" },
    ],
    about: [
      { label: t("footer.aboutUs"), href: "/about" },
      { label: t("footer.contact"), href: "/contact" },
      { label: t("footer.privacy"), href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="eco-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Leaf className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-2xl font-bold">EcoKids</span>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              {t("footer.description")}
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">{t("footer.sections")}</h3>
            <ul className="space-y-2">
              {footerLinks.sections.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">{t("footer.about")}</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} EcoKids. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1 text-sm text-primary-foreground/60">
              {t("footer.madeWith")} <Heart className="w-4 h-4 text-accent fill-accent" /> {t("footer.madeWithEnd")}
            </p>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
