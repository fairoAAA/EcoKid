import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { AdminAuthProvider } from "@/admin/AdminAuthContext";
import { ProtectedRoute } from "@/admin/ProtectedRoute";

// Bosh sahifa darhol kerak bo'lgani uchun oddiy import qilinadi.
import Index from "./pages/Index";

// Qolgan hamma narsa "dangasa" (lazy) yuklanadi - shu bilan boshlang'ich
// JS bog'lami sezilarli kichrayadi (ayniqsa three.js talab qiladigan
// TreeGamePage va oddiy tashrif buyuruvchiga umuman kerak bo'lmaydigan
// butun admin panel).
const AnimalsPage = lazy(() => import("./pages/AnimalsPage"));
const PlantsPage = lazy(() => import("./pages/PlantsPage"));
const GamesPage = lazy(() => import("./pages/GamesPage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));
const ArticleDetailPage = lazy(() => import("./pages/ArticleDetailPage"));
const QuizzesPage = lazy(() => import("./pages/QuizzesPage"));
const RecycleGamePage = lazy(() => import("./pages/games/RecycleGamePage"));
const TreeGamePage = lazy(() => import("./pages/games/TreeGamePage"));
const QuizGamePage = lazy(() => import("./pages/games/QuizGamePage"));
const BirdRescueGamePage = lazy(() => import("./pages/games/BirdRescueGamePage"));
const EcoPuzzleGamePage = lazy(() => import("./pages/games/EcoPuzzleGamePage"));
const EcoMazeGamePage = lazy(() => import("./pages/games/EcoMazeGamePage"));
const OceanCleanerGamePage = lazy(() => import("./pages/games/OceanCleanerGamePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminArticlesPage = lazy(() => import("./pages/admin/AdminArticlesPage"));
const AdminQuizQuestionsPage = lazy(() => import("./pages/admin/AdminQuizQuestionsPage"));
const AdminRecycleItemsPage = lazy(() => import("./pages/admin/AdminRecycleItemsPage"));
const AdminSubscribersPage = lazy(() => import("./pages/admin/AdminSubscribersPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminExportPage = lazy(() => import("./pages/admin/AdminExportPage"));

const queryClient = new QueryClient();

const RouteFallback = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground font-medium animate-pulse-soft">{t("common.loading")}</p>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* Ommaviy sahifalar */}
                <Route path="/" element={<Index />} />
                <Route path="/animals" element={<AnimalsPage />} />
                <Route path="/plants" element={<PlantsPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/games/recycle" element={<RecycleGamePage />} />
                <Route path="/games/tree" element={<TreeGamePage />} />
                <Route path="/games/quiz" element={<QuizGamePage />} />
                <Route path="/games/bird-rescue" element={<BirdRescueGamePage />} />
                <Route path="/games/eco-puzzle" element={<EcoPuzzleGamePage />} />
                <Route path="/games/eco-maze" element={<EcoMazeGamePage />} />
                <Route path="/games/ocean-cleaner" element={<OceanCleanerGamePage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                <Route path="/quizzes" element={<QuizzesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />

                {/* Admin panel */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
                <Route path="/admin/articles" element={<ProtectedRoute><AdminArticlesPage /></ProtectedRoute>} />
                <Route path="/admin/quiz-questions" element={<ProtectedRoute><AdminQuizQuestionsPage /></ProtectedRoute>} />
                <Route path="/admin/recycle-items" element={<ProtectedRoute><AdminRecycleItemsPage /></ProtectedRoute>} />
                <Route path="/admin/subscribers" element={<ProtectedRoute><AdminSubscribersPage /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsersPage /></ProtectedRoute>} />
                <Route path="/admin/export" element={<ProtectedRoute><AdminExportPage /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
