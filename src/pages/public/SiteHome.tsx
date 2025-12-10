import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { 
  Phone, Mail, MapPin, Clock, ChevronRight, Newspaper, 
  Users2, FileText, MessageSquare, ExternalLink, Volume2,
  Shield, BookOpen, GraduationCap, Heart
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// External portal links
const PORTAL_LINKS = [
  { nameKey: "docs.egov", url: "https://egov.kz", icon: "🏛️" },
  { nameKey: "contacts.usefulLinks", url: "https://birge.astana.kz", icon: "📋" },
  { nameKey: "docs.title", url: "https://adilet.zan.kz", icon: "⚖️" },
  { nameKey: "state.procurement", url: "https://goszakup.gov.kz", icon: "📑" },
  { nameKey: "vacancies.portal", url: "https://enbek.kz", icon: "💼" },
];

// Services offered by PMPK
const SERVICES = [
  { 
    icon: GraduationCap, 
    titleKey: "about.diag",
    descKey: "about.diagDesc"
  },
  { 
    icon: Heart, 
    titleKey: "about.consult",
    descKey: "about.consultDesc"
  },
  { 
    icon: BookOpen, 
    titleKey: "about.method",
    descKey: "about.methodDesc"
  },
  { 
    icon: Shield, 
    titleKey: "about.correct",
    descKey: "about.correctDesc"
  },
];

export default function SiteHome({ basePath: basePathProp }: { basePath?: string }) {
  const params = useParams<{ clientSlug?: string }>();
  // Default to pmpk9 if no slug is provided (custom domain case)
  const clientSlug = params.clientSlug || "pmpk9"; 
  const { language, t } = useLanguage();
  useScrollAnimation();
  
  const { data: clientData, isLoading: clientLoadingQuery } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug, retry: false }
  );
  
  // Mock Fallback for Netlify/Demo
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

  const client = clientData || (clientSlug === 'pmpk9' ? mockClient : null);
  const clientLoading = clientLoadingQuery && !client;

  const { data: newsData } = trpc.news.listPublished.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id, retry: false }
  );

  const mockNews = [
    {
      id: "1",
      title: "Открытие нового филиала",
      content: "Мы рады сообщить об открытии нового филиала...",
      imageUrl: "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&auto=format&fit=crop&q=60",
      createdAt: new Date().toISOString(),
      published: true
    },
    {
      id: "2",
      title: "График работы в праздничные дни",
      content: "Уважаемые родители! Обратите внимание на график работы...",
      imageUrl: null,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      published: true
    }
  ];

  const news = newsData || (clientSlug === 'pmpk9' ? mockNews : []);

  // Determine base path: if explicitly provided use it, otherwise check if we have clientSlug in params
  const basePath = basePathProp !== undefined 
    ? basePathProp 
    : (params.clientSlug ? `/site/${clientSlug}` : '');

  if (clientLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8">
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            {t('common.error')}
          </h1>
          <p className="text-muted-foreground">
            {t('common.noData')}
          </p>
        </div>
      </div>
    );
  }

  const recentNews = news?.slice(0, 4) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gov-primary py-8 sm:py-12 lg:py-16 fade-in-up">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
                {t('home.welcome')}
              </h2>
              <p className="text-base sm:text-lg text-white mb-4 sm:mb-6">
                {t('home.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`${basePath}/about`}>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-gov-primary hover:bg-white/90">
                    {t('home.readMore')}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href={`${basePath}/feedback`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    {t('feedback.question')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <img 
                src="/pmpk9-logo.png" 
                alt="ПМПК №9" 
                className="h-64 w-64 object-contain bg-white/10 rounded-2xl p-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-4 sm:py-6 bg-white border-b overflow-x-auto fade-in-up">
        <div className="container">
          <div className="flex lg:grid lg:grid-cols-5 gap-2 sm:gap-3 min-w-max lg:min-w-0">
            {PORTAL_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border hover:bg-muted/50 transition-colors group shrink-0 lg:shrink"
              >
                <span className="text-lg sm:text-xl">{link.icon}</span>
                <span className="text-xs sm:text-sm font-medium group-hover:text-gov-primary transition-colors whitespace-nowrap lg:whitespace-normal lg:line-clamp-1">
                  {t(link.nameKey)}
                </span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground shrink-0 hidden sm:block" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 sm:py-12 bg-gray-50 fade-in-up">
        <div className="container">
          <h2 className="text-xl sm:text-2xl font-bold text-gov-primary mb-6 sm:mb-8 text-center">
            {t('home.services')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((service, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all icon-float">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-gov-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-gov-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(service.descKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 fade-in-up">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* News Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gov-primary flex items-center gap-2">
                  <Newspaper className="h-5 w-5 sm:h-6 sm:w-6" />
                  {t('home.news')}
                </h2>
                <Link href={`${basePath}/news`}>
                  <Button variant="ghost" size="sm">
                    {t('home.allNews')}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              
              {recentNews.length === 0 ? (
                <Card className="border-0 shadow-md">
                  <CardContent className="py-12 text-center">
                    <Newspaper className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">{t('common.noData')}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {recentNews.map((item) => (
                    <Link key={item.id} href={`${basePath}/news/${item.id}`}>
                      <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer h-full">
                        {item.imageUrl && (
                          <div className="h-40 overflow-hidden rounded-t-lg">
                            <img 
                              src={item.imageUrl} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base line-clamp-2 hover:text-gov-primary transition-colors">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString(
                              language === 'kz' ? 'kk-KZ' : language === 'ru' ? 'ru-RU' : 'en-US',
                              { day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Director Blog Card */}
              {client.directorName && (
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="bg-gov-primary p-4">
                    <h3 className="text-white font-semibold">
                      {t('home.directorBlog')}
                    </h3>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      {client.directorPhoto ? (
                        <img 
                          src={client.directorPhoto} 
                          alt={client.directorName}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                          <Users2 className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold">{client.directorName}</p>
                        <p className="text-sm text-muted-foreground">
                          {t('about.director')}
                        </p>
                      </div>
                    </div>
                    {client.directorBio && (
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                        {client.directorBio}
                      </p>
                    )}
                    <Link href={`${basePath}/about`}>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        {t('home.readMore')}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Contact Card */}
              <Card className="border-0 shadow-md">
                <div className="bg-gov-primary p-4">
                  <h3 className="text-white font-semibold">{t('contacts.title')}</h3>
                </div>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gov-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('contacts.address')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('common.city')}, Е-321, 18
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gov-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('contacts.phone')}</p>
                      <a href="tel:+77776080065" className="text-sm text-gov-primary hover:underline">
                        +7 777 608 00 65
                      </a>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/77776080065" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-green-600">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">
                        {t('contacts.writeUs')}
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gov-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('contacts.email')}</p>
                      <a href="mailto:pmpk9_ast@mail.ru" className="text-sm text-gov-primary hover:underline">
                        pmpk9_ast@mail.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gov-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('contacts.schedule')}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'kz' ? 'Дб-Жм 8:30-13:20' : language === 'ru' ? 'Пн-Пт 8:30-13:20' : 'Mon-Fri 8:30-13:20'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Card */}
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="bg-gov-primary p-4">
                  <h3 className="text-white font-semibold">
                    {t('home.openMap')}
                  </h3>
                </div>
                <CardContent className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2503.8!2d71.4!3d51.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA2JzAwLjAiTiA3McKwMjQnMDAuMCJF!5e0!3m2!1sru!2skz!4v1"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Карта ПМПК №9"
                  />
                  <div className="p-4">
                    <a 
                      href="https://maps.google.com/?q=51.1,71.4" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gov-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t('home.openFullMap')}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6 space-y-3">
                  <Link href={`${basePath}/feedback`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {t('feedback.question')}
                    </Button>
                  </Link>
                  <Link href={`${basePath}/documents`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      {t('nav.documents')}
                    </Button>
                  </Link>
                  <Link href={`${basePath}/about`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Users2 className="h-4 w-4" />
                      {t('about.structure')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* State Symbols */}
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="bg-gov-gold/10 p-4">
                  <h3 className="font-semibold text-gov-primary">{t('home.stateSymbols')}</h3>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-center gap-6">
                    <img src="/kz-flag.svg" alt="Флаг РК" className="h-12 object-contain" />
                    <img src="/kz-emblem.png" alt="Герб РК" className="h-16 object-contain" />
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <a 
                      href="https://www.youtube.com/watch?v=XvjXVBkbDvE" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm text-gov-primary hover:underline"
                    >
                      <Volume2 className="h-4 w-4" />
                      {t('home.listenAnthem')}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
