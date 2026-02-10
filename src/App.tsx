import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Public site pages
import SiteLayout from "./components/SiteLayout";
import SiteHome from "./pages/public/SiteHome";
import SiteNews from "./pages/public/SiteNews";
import SiteNewsDetail from "./pages/public/SiteNewsDetail";
import SiteAbout from "./pages/public/SiteAbout";
import SiteStructure from "./pages/public/SiteStructure";
import SiteDocuments from "./pages/public/SiteDocuments";
import SiteVacancies from "./pages/public/SiteVacancies";
import SiteFeedback from "./pages/public/SiteFeedback";
import SiteContacts from "./pages/public/SiteContacts";
import SiteManagement from "./pages/public/SiteManagement";
// import StudioPage from "./pages/StudioPage"; // Removed Sanity Studio

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import LoginPage from "./admin/LoginPage";
import DashboardPage from "./admin/DashboardPage";
import NewsEditor from "./admin/NewsEditor";
import StaffEditor from "./admin/StaffEditor";
import InfoEditor from "./admin/InfoEditor";
import VacanciesEditor from "./admin/VacanciesEditor";
import FaqEditor from "./admin/FaqEditor";

// Wrapper for public site pages with layout
function SitePageWrapper({ children }: { children: React.ReactNode }) {
  return <SiteLayout basePath="">{children}</SiteLayout>;
}

function Router() {
  return (
    <Switch>
      {/* Public site routes - Root leads to public website */}
      <Route path="/">
        {() => <SitePageWrapper><SiteHome basePath="" /></SitePageWrapper>}
      </Route>
      <Route path="/news">
        {() => <SitePageWrapper><SiteNews /></SitePageWrapper>}
      </Route>
      <Route path="/news/:id">
        {() => <SitePageWrapper><SiteNewsDetail /></SitePageWrapper>}
      </Route>
      <Route path="/about">
        {() => <SitePageWrapper><SiteAbout /></SitePageWrapper>}
      </Route>
      <Route path="/structure">
        {() => <SitePageWrapper><SiteStructure /></SitePageWrapper>}
      </Route>
      <Route path="/documents">
        {() => <SitePageWrapper><SiteDocuments /></SitePageWrapper>}
      </Route>
      <Route path="/vacancies">
        {() => <SitePageWrapper><SiteVacancies /></SitePageWrapper>}
      </Route>
      <Route path="/feedback">
        {() => <SitePageWrapper><SiteFeedback /></SitePageWrapper>}
      </Route>
      <Route path="/contacts">
        {() => <SitePageWrapper><SiteContacts /></SitePageWrapper>}
      </Route>
      <Route path="/management">
        {() => <SitePageWrapper><SiteManagement /></SitePageWrapper>}
      </Route>

      {/* Admin Dashboard Routes */}
      {/* Admin Dashboard Routes */}
      <Route path="/admin/login" component={LoginPage} />

      <Route path="/admin">
        <AdminLayout>
          <DashboardPage />
        </AdminLayout>
      </Route>

      <Route path="/admin/news">
        <AdminLayout>
          <NewsEditor />
        </AdminLayout>
      </Route>

      <Route path="/admin/staff">
        <AdminLayout>
          <StaffEditor />
        </AdminLayout>
      </Route>

      <Route path="/admin/info">
        <AdminLayout>
          <InfoEditor />
        </AdminLayout>
      </Route>

      <Route path="/admin/vacancies">
        <AdminLayout>
          <VacanciesEditor />
        </AdminLayout>
      </Route>

      <Route path="/admin/faq">
        <AdminLayout>
          <FaqEditor />
        </AdminLayout>
      </Route>

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
