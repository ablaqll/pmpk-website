import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Main pages
import Home from "./pages/Home";

// Super Admin pages
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import SuperAdminClients from "./pages/super-admin/Clients";
import SuperAdminClientForm from "./pages/super-admin/ClientForm";
import SuperAdminUsers from "./pages/super-admin/Users";

// Client Admin pages
import ClientAdminDashboard from "./pages/client-admin/Dashboard";
import ClientAdminAboutPmpk from "./pages/client-admin/AboutPmpk";
import ClientAdminNews from "./pages/client-admin/News";
import ClientAdminNewsForm from "./pages/client-admin/NewsForm";
import ClientAdminFeedback from "./pages/client-admin/Feedback";
import ClientAdminStaff from "./pages/client-admin/Staff";
import ClientAdminStaffForm from "./pages/client-admin/StaffForm";
import ClientAdminDocuments from "./pages/client-admin/Documents";
import ClientAdminDocumentForm from "./pages/client-admin/DocumentForm";
import ClientAdminVacancies from "./pages/client-admin/Vacancies";
import ClientAdminVacancyForm from "./pages/client-admin/VacancyForm";
import ClientAdminManagement from "./pages/client-admin/Management";
import ClientAdminEvents from "./pages/client-admin/Events";
import ClientAdminMemorandum from "./pages/client-admin/Memorandum";
import ClientAdminPublications from "./pages/client-admin/Publications";
import ClientAdminAttestation from "./pages/client-admin/Attestation";
import ClientAdminSettings from "./pages/client-admin/Settings";

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
  return <SiteLayout>{children}</SiteLayout>;
}

function Router() {
  return (
    <Switch>
      {/* Admin Login */}
      <Route path="/admin" component={Home} />
      
      {/* Super Admin routes */}
      <Route path="/super-admin" component={SuperAdminDashboard} />
      <Route path="/super-admin/clients" component={SuperAdminClients} />
      <Route path="/super-admin/clients/new" component={SuperAdminClientForm} />
      <Route path="/super-admin/clients/:id" component={SuperAdminClientForm} />
      <Route path="/super-admin/users" component={SuperAdminUsers} />
      
      {/* Client Admin routes */}
      <Route path="/admin/:clientSlug" component={ClientAdminDashboard} />
      <Route path="/admin/:clientSlug/about-pmpk" component={ClientAdminAboutPmpk} />
      <Route path="/admin/:clientSlug/news" component={ClientAdminNews} />
      <Route path="/admin/:clientSlug/news/new" component={ClientAdminNewsForm} />
      <Route path="/admin/:clientSlug/news/:id" component={ClientAdminNewsForm} />
      <Route path="/admin/:clientSlug/documents" component={ClientAdminDocuments} />
      <Route path="/admin/:clientSlug/documents/new" component={ClientAdminDocumentForm} />
      <Route path="/admin/:clientSlug/documents/:id" component={ClientAdminDocumentForm} />
      <Route path="/admin/:clientSlug/management" component={ClientAdminManagement} />
      <Route path="/admin/:clientSlug/feedback" component={ClientAdminFeedback} />
      <Route path="/admin/:clientSlug/vacancies" component={ClientAdminVacancies} />
      <Route path="/admin/:clientSlug/vacancies/new" component={ClientAdminVacancyForm} />
      <Route path="/admin/:clientSlug/vacancies/:id" component={ClientAdminVacancyForm} />
      <Route path="/admin/:clientSlug/events" component={ClientAdminEvents} />
      <Route path="/admin/:clientSlug/memorandum" component={ClientAdminMemorandum} />
      <Route path="/admin/:clientSlug/publications" component={ClientAdminPublications} />
      <Route path="/admin/:clientSlug/attestation" component={ClientAdminAttestation} />
      <Route path="/admin/:clientSlug/staff" component={ClientAdminStaff} />
      <Route path="/admin/:clientSlug/staff/new" component={ClientAdminStaffForm} />
      <Route path="/admin/:clientSlug/staff/:id" component={ClientAdminStaffForm} />
      <Route path="/admin/:clientSlug/settings" component={ClientAdminSettings} />
      
      {/* Public site routes - Defaulting Root to PMPK9 */}
      <Route path="/">
        {() => <SitePageWrapper><SiteHome /></SitePageWrapper>}
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

      {/* Explicit site routes for flexibility */}
      <Route path="/site/:clientSlug">
        {() => <SitePageWrapper><SiteHome /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/news">
        {() => <SitePageWrapper><SiteNews /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/news/:id">
        {() => <SitePageWrapper><SiteNewsDetail /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/about">
        {() => <SitePageWrapper><SiteAbout /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/structure">
        {() => <SitePageWrapper><SiteStructure /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/documents">
        {() => <SitePageWrapper><SiteDocuments /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/vacancies">
        {() => <SitePageWrapper><SiteVacancies /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/feedback">
        {() => <SitePageWrapper><SiteFeedback /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/contacts">
        {() => <SitePageWrapper><SiteContacts /></SitePageWrapper>}
      </Route>
      <Route path="/site/:clientSlug/management">
        {() => <SitePageWrapper><SiteManagement /></SitePageWrapper>}
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
