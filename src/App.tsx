import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Main pages
import Home from "./pages/Home";

// Admin pages
import ClientAdminDashboard from "./pages/client-admin/Dashboard";
import ClientAdminNews from "./pages/client-admin/News";
import ClientAdminNewsForm from "./pages/client-admin/NewsForm";
import ClientAdminFeedback from "./pages/client-admin/Feedback";
import ClientAdminStaff from "./pages/client-admin/Staff";
import ClientAdminStaffForm from "./pages/client-admin/StaffForm";
import ClientAdminDocuments from "./pages/client-admin/Documents";
import ClientAdminDocumentForm from "./pages/client-admin/DocumentForm";
import ClientAdminVacancies from "./pages/client-admin/Vacancies";
import ClientAdminVacancyForm from "./pages/client-admin/VacancyForm";
import ClientAdminSettings from "./pages/client-admin/Settings";
import ClientAdminAboutPmpk from "./pages/client-admin/AboutPmpk";
import ClientAdminManagement from "./pages/client-admin/Management";
import ClientAdminEvents from "./pages/client-admin/Events";
import ClientAdminMemorandum from "./pages/client-admin/Memorandum";
import ClientAdminPublications from "./pages/client-admin/Publications";
import ClientAdminAttestation from "./pages/client-admin/Attestation";

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
      
      {/* Admin login page */}
      <Route path="/admin/login" component={Home} />
      
      {/* Admin panel routes - simplified to /admin */}
      <Route path="/admin" component={ClientAdminDashboard} />
      <Route path="/admin/about-pmpk" component={ClientAdminAboutPmpk} />
      <Route path="/admin/news" component={ClientAdminNews} />
      <Route path="/admin/news/new" component={ClientAdminNewsForm} />
      <Route path="/admin/news/:id" component={ClientAdminNewsForm} />
      <Route path="/admin/documents" component={ClientAdminDocuments} />
      <Route path="/admin/documents/new" component={ClientAdminDocumentForm} />
      <Route path="/admin/documents/:id" component={ClientAdminDocumentForm} />
      <Route path="/admin/management" component={ClientAdminManagement} />
      <Route path="/admin/feedback" component={ClientAdminFeedback} />
      <Route path="/admin/vacancies" component={ClientAdminVacancies} />
      <Route path="/admin/vacancies/new" component={ClientAdminVacancyForm} />
      <Route path="/admin/vacancies/:id" component={ClientAdminVacancyForm} />
      <Route path="/admin/events" component={ClientAdminEvents} />
      <Route path="/admin/memorandum" component={ClientAdminMemorandum} />
      <Route path="/admin/publications" component={ClientAdminPublications} />
      <Route path="/admin/attestation" component={ClientAdminAttestation} />
      <Route path="/admin/staff" component={ClientAdminStaff} />
      <Route path="/admin/staff/new" component={ClientAdminStaffForm} />
      <Route path="/admin/staff/:id" component={ClientAdminStaffForm} />
      <Route path="/admin/settings" component={ClientAdminSettings} />
      
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
