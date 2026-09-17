import { AdminLayout } from "@/admin/AdminLayout";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles } from "@/data/articles";
import { quizQuestions as baseQuizQuestions } from "@/data/quizQuestions";
import { allTrashItems } from "@/data/recycleItems";
import { getSubscribers } from "@/admin/subscribersStorage";
import { Newspaper, HelpCircle, Trash2, Mail, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  const { session, users } = useAdminAuth();
  const { data: articles } = useOverlayData("ecokids:overlay:articles", baseArticles);
  const { data: questions } = useOverlayData("ecokids:overlay:quizQuestions", baseQuizQuestions);
  const { data: items } = useOverlayData("ecokids:overlay:trashItems", allTrashItems);
  const subscribers = getSubscribers();

  const stats = [
    { label: "Maqolalar", value: articles.length, icon: Newspaper, href: "/admin/articles", color: "bg-primary/10 text-primary" },
    { label: "Viktorina savollari", value: questions.length, icon: HelpCircle, href: "/admin/quiz-questions", color: "bg-sky/10 text-sky-foreground" },
    { label: "Chiqindi elementlari", value: items.length, icon: Trash2, href: "/admin/recycle-items", color: "bg-orange/10 text-orange-600" },
    { label: "Obunachilar", value: subscribers.length, icon: Mail, href: "/admin/subscribers", color: "bg-accent/10 text-accent-foreground" },
    { label: "Admin/Yordamchilar", value: users.length, icon: Users, href: "/admin/users", color: "bg-muted text-foreground" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">
          Salom, {session?.displayName}! 👋
        </h1>
        <p className="text-muted-foreground">
          {session?.role === "admin"
            ? "Siz to'liq huquqqa ega administratorsiz."
            : "Siz yordamchi (moderator) sifatida kontentni boshqarishingiz mumkin."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.href}
            className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Link>
        ))}
      </div>


    </AdminLayout>
  );
};

export default AdminDashboardPage;
