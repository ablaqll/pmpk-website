import { Button } from "@/components/ui/button";
import { 
  Phone, Mail, MapPin, Clock, Volume2, Menu, X
} from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

// Kazakhstan state symbols (local files)
const KZ_FLAG_URL = "/kz-flag.svg";
const KZ_EMBLEM_URL = "/kz-emblem.png";

interface SiteLayoutProps {
  children: React.ReactNode;
  basePath?: string;
}

// Language switcher component
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const languages: { code: Language; label: string }[] = [
    { code: 'kz', label: 'ҚАЗ' },
    { code: 'ru', label: 'РУС' },
    { code: 'en', label: 'ENG' },
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 text-xs font-medium transition-colors rounded ${
              language === lang.code 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-white/40 mx-1">|</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function SiteLayout({ children, basePath: propBasePath }: SiteLayoutProps) {
  const clientSlug = "pmpk9";
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  
  // Mock client data - will be replaced with Sanity queries later
  const mockClient = {
      id: '1',
      slug: 'pmpk9',
      name: 'ПМПК №9',
      description: 'Психолого-медико-педагогическая консультация',
      logo: '/pmpk9-logo.png',
      phone: '+7 777 608 00 65',
      email: 'pmpk9_ast@mail.ru',
      address: 'Астана қ., Е-321 көшесі, 18 үй',
      directorName: 'Иванова Мария Ивановна',
      directorBio: 'Педагог-психолог высшей категории, стаж работы 20 лет.',
      directorPhoto: null
  };

  const client = mockClient;
  const isLoading = false;

  // Use provided basePath or default to empty string (root)
  const basePath = propBasePath !== undefined ? propBasePath : '';
  
  // Navigation items with translations
  const navItems = [
    { labelKey: "nav.about", path: `${basePath}/about` },
    { labelKey: "nav.news", path: `${basePath}/news` },
    { labelKey: "nav.documents", path: `${basePath}/documents` },
    { labelKey: "nav.management", path: `${basePath}/management` },
    { labelKey: "nav.feedback", path: `${basePath}/feedback` },
    { labelKey: "nav.vacancies", path: `${basePath}/vacancies` },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-10 bg-gov-primary" />
        <div className="h-20 bg-white border-b" />
        <div className="container py-8">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Always use mock client as fallback - never show error
  if (!client) {
    return null; // This should never happen due to mock fallback, but just in case
  }

  // Client name based on language - shortened for header
  const clientName = language === 'kz' 
    ? '№9 Психологиялық-медициналық-педагогикалық консультация'
    : language === 'ru'
    ? '№9 Психолого-медико-педагогическая консультация'
    : 'Psychological-Medical-Pedagogical Consultation №9';

  const clientNameShort = language === 'en' ? 'PMPK' : 'ПМПК';
  
  // Full name for footer
  const clientNameFull = language === 'kz' 
    ? 'Астана қаласы әкімдігінің "№9 Психологиялық-медициналық-педагогикалық консультациясы" КММ'
    : language === 'ru'
    ? 'КГУ "Психолого-медико-педагогическая консультация №9" акимата города Астаны'
    : 'Psychological-Medical-Pedagogical Consultation №9 of Astana';

  const cityName = language === 'kz' ? 'Астана қаласы' : language === 'ru' ? 'г. Астана' : 'Astana';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar with Language Switcher and State Symbols */}
      <div className="bg-gov-primary text-white">
        <div className="container">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* State Symbols */}
              <div className="flex items-center gap-2">
                <img src={KZ_FLAG_URL} alt="Флаг Казахстана" className="h-5 sm:h-6 object-contain" />
                <img src={KZ_EMBLEM_URL} alt="Герб Казахстана" className="h-5 sm:h-6 object-contain" />
              </div>
              <span className="hidden sm:inline text-white/80">
                {language === 'kz' ? 'Қазақстан Республикасы' : language === 'ru' ? 'Республика Казахстан' : 'Republic of Kazakhstan'}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {client.phone && (
                <a href={`tel:${client.phone}`} className="flex items-center gap-1 hover:underline ml-2 sm:ml-4">
                  <Phone className="h-3 w-3" />
                  <span className="hidden sm:inline">{client.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header with Organization Logo */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <Link href={basePath}>
              <div className="flex items-center gap-2 sm:gap-4 cursor-pointer">
                {/* Organization Logo */}
                <img 
                  src="/pmpk9-logo.png" 
                  alt="ПМПК №9" 
                  className="h-10 w-10 sm:h-14 sm:w-14 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <h1 className="text-xs sm:text-sm lg:text-base font-bold text-gov-primary leading-tight line-clamp-2 max-w-[200px] sm:max-w-md">
                    <span className="sm:hidden">{clientNameShort}</span>
                    <span className="hidden sm:inline">{clientName}</span>
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {cityName}
                  </p>
                </div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.startsWith(item.path);
                return (
                  <Link key={item.path} href={item.path}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={isActive ? "bg-gov-primary/10 text-gov-primary" : ""}
                    >
                      {t(item.labelKey)}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = location.startsWith(item.path);
                  return (
                    <Link key={item.path} href={item.path}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${isActive ? "bg-gov-primary/10 text-gov-primary" : ""}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t(item.labelKey)}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer with State Symbols */}
      <footer className="bg-gov-primary text-white py-6 sm:py-8 mt-auto">
        <div className="container">
          {/* State Symbols Section */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/20">
            <img src={KZ_FLAG_URL} alt="Флаг Казахстана" className="h-8 sm:h-12 object-contain" />
            <img src={KZ_EMBLEM_URL} alt="Герб Казахстана" className="h-10 sm:h-16 object-contain" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/pmpk9-logo.png" alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain bg-white rounded-lg p-1" />
                <div>
                  <p className="font-semibold text-sm">{clientNameFull}</p>
                </div>
              </div>
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} {t('footer.rights')}
              </p>
              <p className="text-xs text-white/50 mt-2">
                © {new Date().getFullYear()} PMPK
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('contacts.title')}</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  {language === 'kz' ? 'Мекенжай: Астана қ., Е-321 көшесі, 18 үй' : language === 'ru' ? 'Адрес: г. Астана, ул. Е-321, дом 18' : 'Address: Astana, E-321 st., 18'}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href="tel:+77776080065" className="hover:text-white">+7 777 608 00 65</a>
                </p>
                <a 
                  href="https://wa.me/77776080065" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-300 transition-colors"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href="mailto:pmpk9_ast@mail.ru" className="hover:text-white">pmpk9_ast@mail.ru</a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  {language === 'kz' ? 'Дб-Жм 8:30-13:20' : language === 'ru' ? 'Пн-Пт 8:30-13:20' : 'Mon-Fri 8:30-13:20'}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">
                {language === 'kz' ? 'Әлеуметтік желілер' : language === 'ru' ? 'Социальные сети' : 'Social Media'}
              </h4>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com/pmpk_9ast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center hover:opacity-80 transition-opacity"
                  title="Instagram"
                >
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/77776080065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center hover:opacity-80 transition-opacity"
                  title="WhatsApp"
                >
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
              <div className="mt-4">
                <p className="text-sm text-white/70 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  {language === 'kz' ? 'Сенім телефоны' : language === 'ru' ? 'Телефон доверия' : 'Trust Phone'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
