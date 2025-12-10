import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { getLoginUrl } from "@/const";
import { DEFAULT_CLIENT, DEFAULT_CLIENT_SLUG } from "@/const/client";
import { useIsMobile } from "@/hooks/useMobile";
import { 
  LayoutDashboard, LogOut, PanelLeft, Newspaper, Users2, 
  GraduationCap, Briefcase, MessageSquare, FileText, Calendar, Settings, Globe,
  Scale, Building, FileSignature, BookOpen, Award, UserCircle
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

const SIDEBAR_WIDTH_KEY = "client-admin-sidebar-width";
const DEFAULT_WIDTH = 260;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

export default function ClientAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();
  
  // Try to fetch client, but use default if it fails
  const { data: clientData } = trpc.clients.getBySlug.useQuery(
    { slug: DEFAULT_CLIENT_SLUG },
    { 
      enabled: true,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      gcTime: 0,
    }
  );
  
  // Always use default client if fetch fails
  const client = clientData || DEFAULT_CLIENT;
  const clientSlug = DEFAULT_CLIENT_SLUG;

  // Check localStorage for user immediately (don't wait for query)
  const [localUser, setLocalUser] = useState<any>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("manus-runtime-user-info");
      if (stored && stored !== "null" && stored !== "undefined") {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          setLocalUser(parsed);
        }
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Only show loading skeleton for max 1 second, then proceed
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000); // Max 1 second loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  // Use localUser if available, otherwise use user from useAuth
  const currentUser = localUser || user;
  const isLoading = showLoading && loading && !currentUser;

  if (isLoading) {
    return <DashboardLayoutSkeleton />
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gov-primary">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 rounded-full bg-gov-primary flex items-center justify-center">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-center text-gov-primary">
              Панель управления
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Войдите в систему для доступа к панели управления контентом
            </p>
          </div>
            <Button
            onClick={() => {
              window.location.href = "/admin/login";
            }}
            size="lg"
            className="w-full bg-gov-primary hover:bg-gov-primary/90"
          >
            Войти в систему
          </Button>
        </div>
      </div>
    );
  }

  // Check access - allow all admin roles (including super_admin for backward compatibility)
  const userRole = currentUser?.role?.toLowerCase() || '';
  const allowedRoles = ['admin', 'client_admin', 'editor', 'super_admin'];
  const hasAccess = allowedRoles.includes(userRole);
  
  if (!hasAccess) {
    // Log for debugging - this helps identify the issue
    console.error('❌ Access denied:', {
      userRole,
      allowedRoles,
      currentUser,
      hasAccess
    });
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-6 p-8 max-w-md w-full bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">🚫</span>
          </div>
          <h1 className="text-xl font-semibold text-center">Доступ запрещён</h1>
          <p className="text-sm text-muted-foreground text-center">
            У вас нет прав для доступа к панели управления
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Button variant="outline" onClick={() => window.location.href = '/admin/login'}>
              Войти в систему
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Вернуться на главную
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <ClientAdminLayoutContent 
        setSidebarWidth={setSidebarWidth} 
        client={client}
        clientSlug={clientSlug}
      >
        {children}
      </ClientAdminLayoutContent>
    </SidebarProvider>
  );
}

type ClientAdminLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
  client: { id: string | number; name: string; logoUrl?: string | null };
  clientSlug: string;
};

function ClientAdminLayoutContent({
  children,
  setSidebarWidth,
  client,
  clientSlug,
}: ClientAdminLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const basePath = `/admin`;
  
  const menuItems = [
    { icon: LayoutDashboard, label: t('admin.overview'), path: basePath },
    { icon: UserCircle, label: t('admin.aboutPmpk'), path: `${basePath}/about-pmpk` }, 
    { icon: Newspaper, label: t('admin.news'), path: `${basePath}/news` },
    { icon: Scale, label: t('admin.legalActs'), path: `${basePath}/documents` },
    { icon: Building, label: t('admin.management'), path: `${basePath}/management` },
    { icon: MessageSquare, label: t('admin.feedback'), path: `${basePath}/feedback` },
    { icon: Briefcase, label: t('admin.vacancies'), path: `${basePath}/vacancies` },
    { icon: Calendar, label: t('admin.events'), path: `${basePath}/events` },
    { icon: FileSignature, label: t('admin.memorandum'), path: `${basePath}/memorandum` },
    { icon: BookOpen, label: t('admin.publications'), path: `${basePath}/publications` },
    { icon: Award, label: t('admin.attestation'), path: `${basePath}/attestation` },
    { icon: Settings, label: t('admin.settings'), path: `${basePath}/settings` },
  ];

  const activeMenuItem = menuItems.find(item => 
    item.path === basePath ? location === basePath : location.startsWith(item.path)
  );

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r-0 bg-white"
          disableTransition={isResizing}
        >
          <SidebarHeader className="h-16 justify-center border-b bg-gov-primary">
            <div className="flex items-center gap-3 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-10 w-10 flex items-center justify-center bg-white/10 rounded-xl transition-colors focus:outline-none shrink-0"
                aria-label="Toggle navigation"
              >
                {isCollapsed ? (
                  <PanelLeft className="h-5 w-5 text-white" />
                ) : client.logoUrl ? (
                  <img src={client.logoUrl} alt="" className="h-8 w-8 object-contain rounded" />
                ) : (
                  <Globe className="h-5 w-5 text-white" />
                )}
              </button>
              {!isCollapsed ? (
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-white truncate text-sm">
                    {client.name}
                  </span>
                  <span className="text-xs text-white/70">
                    {t('admin.panel')}
                  </span>
                </div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0 py-4">
            <SidebarMenu className="px-2">
              {menuItems.map(item => {
                const isActive = item.path === basePath 
                  ? location === basePath
                  : location.startsWith(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className={`h-10 transition-all font-normal rounded-lg ${isActive ? 'bg-gov-primary/10' : ''}`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${isActive ? "text-gov-primary" : "text-muted-foreground"}`}
                      />
                      <span className={`text-sm ${isActive ? "font-medium text-gov-primary" : ""}`}>
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <div className="px-3 py-2 border-t bg-gray-50">
              <div className="flex items-center gap-2 opacity-60">
                {!isCollapsed && <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} PMPK</span>}
              </div>
            </div>
            <SidebarFooter className="p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent/50 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none">
                  <Avatar className="h-8 w-8 border shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-gov-primary/10 text-gov-primary">
                      {currentUser?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none">
                      {currentUser?.name || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {currentUser?.role === 'client_admin' ? t('admin.role.admin') : t('admin.role.editor')}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setLocation(`/site/${clientSlug}`)}>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>{t('admin.viewSite')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('admin.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-gov-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset className="bg-gray-50/50">
        {isMobile && (
          <div className="flex border-b h-14 items-center justify-between bg-white px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-9 w-9 rounded-lg" />
              <span className="font-medium text-foreground">
                {activeMenuItem?.label ?? "Меню"}
              </span>
            </div>
          </div>
        )}
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </>
  );
}
