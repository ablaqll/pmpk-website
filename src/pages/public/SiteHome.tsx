import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Phone, Mail, MapPin, Clock, ChevronRight, Newspaper,
  Users2, FileText, MessageSquare, ExternalLink, Volume2,
  Shield, BookOpen, GraduationCap, Heart, ArrowRight
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { storage } from "@/services/storage";
import { AnimatedHeroBackground } from "@/components/AnimatedHeroBackground";

// External portal links
const PORTAL_LINKS = [
  { nameKey: "docs.egov", url: "https://egov.kz", icon: "🏛️" },
  { nameKey: "contacts.usefulLinks", url: "https://birge.astana.kz", icon: "📋" },
  { nameKey: "docs.title", url: "https://adilet.zan.kz", icon: "⚖️" },
  { nameKey: "state.procurement", url: "https://goszakup.gov.kz", icon: "📑" },
  { nameKey: "vacancies.portal", url: "https://enbek.kz", icon: "💼" },
];

// Services offered by PMPK with accent colors
const SERVICES = [
  {
    icon: GraduationCap,
    titleKey: "about.diag",
    descKey: "about.diagDesc",
    accent: "from-blue-500 to-blue-600",
    bgAccent: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Heart,
    titleKey: "about.consult",
    descKey: "about.consultDesc",
    accent: "from-rose-500 to-rose-600",
    bgAccent: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: BookOpen,
    titleKey: "about.method",
    descKey: "about.methodDesc",
    accent: "from-amber-500 to-amber-600",
    bgAccent: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Shield,
    titleKey: "about.correct",
    descKey: "about.correctDesc",
    accent: "from-emerald-500 to-emerald-600",
    bgAccent: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

export default function SiteHome({ basePath: basePathProp }: { basePath?: string }) {
  const { language, t } = useLanguage();


  const [client, setClient] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollAnimation([isLoading, client, language]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const info = await storage.getGeneralInfo();
        const allNews = await storage.getNews();
        const newsItems = allNews.filter(n => n.published);

        setClient({
          // Use info from storage, layout falls back to specific keys
          directorName: info.directorName,
          directorBio: info.directorBio,
          directorPhoto: info.directorPhoto,
        });
        setNews(newsItems);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const basePath = basePathProp !== undefined ? basePathProp : '';

  if (isLoading) {
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
      {/* Hero Section — Modern gradient with decorative elements */}
      <section className="relative overflow-hidden fade-in-up">
        <AnimatedHeroBackground />

        <div className="container relative py-12 sm:py-16 lg:py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              {/* Gold accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-[#c9a227] to-[#e0b930] rounded-full mb-6" />

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white leading-tight">
                {t('home.welcome')}
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                {t('home.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`${basePath}/about`}>
                  <Button size="lg" className="group w-full sm:w-auto bg-white text-[#1e3a5f] font-semibold hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 rounded-xl px-6">
                    {t('home.readMore')}
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={`${basePath}/feedback`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-xl px-6">
                    {t('feedback.question')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-transparent rounded-full blur-3xl scale-125 animate-pulse" />
                <img
                  src="/pmpkpng.png"
                  alt="ПМПК №9"
                  className="relative h-80 w-80 lg:h-96 lg:w-96 object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Quick Links — Cleaner horizontal bar */}
      <section className="py-4 sm:py-5 bg-white border-b overflow-x-auto fade-in-up">
        <div className="container">
          <div className="flex lg:grid lg:grid-cols-5 gap-2 sm:gap-3 min-w-max lg:min-w-0">
            {PORTAL_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-100 hover:border-[#1e3a5f]/20 hover:bg-[#1e3a5f]/[0.03] transition-all duration-200 group shrink-0 lg:shrink"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#1e3a5f] transition-colors whitespace-nowrap lg:whitespace-normal lg:line-clamp-1">
                  {t(link.nameKey)}
                </span>
                <ExternalLink className="h-3.5 w-3.5 ml-auto text-gray-300 group-hover:text-[#1e3a5f]/50 shrink-0 hidden sm:block transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section — Colored accent cards */}
      <section className="py-10 sm:py-14 bg-gray-50 fade-in-up">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a5f] mb-2">
              {t('home.services')}
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#c9a227] to-[#e0b930] rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 icon-float overflow-hidden group relative">
                {/* Top colored accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${service.accent}`} />
                <CardContent className="pt-6 pb-6">
                  <div className={`h-14 w-14 rounded-2xl ${service.bgAccent} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <service.icon className={`h-7 w-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="font-bold mb-2 text-lg text-gray-900">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t(service.descKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content — News + Sidebar */}
      <section className="py-10 sm:py-14 bg-white fade-in-up">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* News Section */}
            <div className="lg:col-span-2">
              {/* Work Schedule */}
              <div className="mb-8 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-[#1e3a5f] text-center mb-6 leading-tight">
                  {language === 'kz' ? '«№9 психологиялық-медициналық-педагогикалық консультациясы» КММ' : language === 'ru' ? 'КГУ «Психолого-медико-педагогическая консультация №9»' : 'KGU "Psychological-Medical-Pedagogical Consultation №9"'}
                  <br />
                  <span className="text-base sm:text-lg mt-2 block font-semibold text-gray-700">
                    {language === 'kz' ? 'ЖҰМЫС КЕСТЕСІ' : language === 'ru' ? 'ГРАФИК РАБОТЫ' : 'WORK SCHEDULE'}
                  </span>
                </h3>
                <div className="max-w-md mx-auto space-y-3 text-sm sm:text-base text-gray-600 font-medium">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => {
                    const localDay = language === 'kz'
                      ? ['Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма'][idx]
                      : language === 'ru'
                        ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'][idx]
                        : day;

                    return (
                      <div key={day} className={`flex justify-between ${idx < 4 ? 'pb-3 border-b border-gray-100' : 'pt-1'}`}>
                        <span className="text-gray-900">{localDay}</span>
                        <span className="font-semibold text-[#1e3a5f]">08.00-12.50</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1e3a5f] flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
                    <Newspaper className="h-5 w-5 text-[#1e3a5f]" />
                  </div>
                  {t('home.news')}
                </h2>
                <Link href={`${basePath}/news`}>
                  <Button variant="ghost" size="sm" className="text-[#1e3a5f] hover:bg-[#1e3a5f]/5 rounded-lg">
                    {t('home.allNews')}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {recentNews.length === 0 ? (
                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="py-16 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Newspaper className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-medium">{t('common.noData')}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-5">
                  {recentNews.map((item) => (
                    <Link key={item.id} href={`${basePath}/news/${item.id}`}>
                      <Card className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full group rounded-xl overflow-hidden hover:border-[#1e3a5f]/15">
                        {item.imageUrl && (
                          <div className="h-44 overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt=""
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-[#1e3a5f] transition-colors">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                            <Clock className="h-3 w-3" />
                            {new Date(item.createdAt).toLocaleDateString(
                              language === 'kz' ? 'kk-KZ' : language === 'ru' ? 'ru-RU' : 'en-US',
                              { day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Director Blog Card */}
              {client.directorName && (
                <Card className="border border-gray-100 shadow-sm overflow-hidden rounded-xl">
                  <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a72] p-4">
                    <h3 className="text-white font-semibold text-sm tracking-wide">
                      {t('home.directorBlog')}
                    </h3>
                  </div>
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-4">
                      {client.directorPhoto ? (
                        <img
                          src={client.directorPhoto}
                          alt={client.directorName}
                          className="h-20 w-20 rounded-xl object-cover ring-2 ring-gray-100"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden ring-2 ring-gray-100">
                          <img
                            src="/director.jpg"
                            alt={client.directorName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <Users2 className="h-8 w-8 text-gray-300 hidden" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{client.directorName}</p>
                        <p className="text-sm text-[#1e3a5f]/70 font-medium">
                          {t('about.director')}
                        </p>
                      </div>
                    </div>
                    {client.directorBio && (
                      <p className="text-sm text-gray-500 mt-4 line-clamp-3 leading-relaxed">
                        {client.directorBio}
                      </p>
                    )}
                    <Link href={`${basePath}/director-blog`}>
                      <Button variant="outline" size="sm" className="w-full mt-4 rounded-lg border-gray-200 hover:border-[#1e3a5f]/30 hover:bg-[#1e3a5f]/[0.03] text-[#1e3a5f]">
                        {t('home.readMore')}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Contact Card */}
              <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a72] p-4">
                  <h3 className="text-white font-semibold text-sm tracking-wide">{t('contacts.title')}</h3>
                </div>
                <CardContent className="pt-5 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#1e3a5f]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{t('contacts.address')}</p>
                      <p className="text-sm text-gray-500">
                        {t('common.city')}, Е-321, 18
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#1e3a5f]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="h-4 w-4 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{t('contacts.phone')}</p>
                      <a href="tel:+77776080065" className="text-sm text-[#1e3a5f] hover:underline">
                        +7 777 608 00 65
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/77776080065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-emerald-700">WhatsApp</p>
                      <p className="text-xs text-gray-400">
                        {t('contacts.writeUs')}
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#1e3a5f]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="h-4 w-4 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{t('contacts.email')}</p>
                      <a href="mailto:pmpk9_ast@mail.ru" className="text-sm text-[#1e3a5f] hover:underline">
                        pmpk9_ast@mail.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#1e3a5f]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-4 w-4 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{t('contacts.schedule')}</p>
                      <p className="text-sm text-gray-500">
                        {language === 'kz' ? 'Дб-Жм 8:30-13:20' : language === 'ru' ? 'Пн-Пт 8:30-13:20' : 'Mon-Fri 8:30-13:20'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border border-gray-100 shadow-sm rounded-xl">
                <CardContent className="pt-5 pb-5 flex flex-col gap-3">
                  <Link href={`${basePath}/feedback`}>
                    <Button variant="outline" className="w-full justify-center gap-2 rounded-lg border-gray-200 hover:border-[#1e3a5f]/20 hover:bg-[#1e3a5f]/[0.03] transition-all duration-200">
                      <MessageSquare className="h-4 w-4 text-[#1e3a5f]" />
                      {t('feedback.question')}
                    </Button>
                  </Link>
                  <Link href={`${basePath}/documents`}>
                    <Button variant="outline" className="w-full justify-center gap-2 rounded-lg border-gray-200 hover:border-[#1e3a5f]/20 hover:bg-[#1e3a5f]/[0.03] transition-all duration-200">
                      <FileText className="h-4 w-4 text-[#1e3a5f]" />
                      {t('nav.documents')}
                    </Button>
                  </Link>
                  <Link href={`${basePath}/about`}>
                    <Button variant="outline" className="w-full justify-center gap-2 rounded-lg border-gray-200 hover:border-[#1e3a5f]/20 hover:bg-[#1e3a5f]/[0.03] transition-all duration-200">
                      <Users2 className="h-4 w-4 text-[#1e3a5f]" />
                      {t('about.structure')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Map Card */}
              <Card className="border border-gray-100 shadow-sm overflow-hidden rounded-xl">
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a72] p-4">
                  <h3 className="text-white font-semibold text-sm tracking-wide">
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
                      className="flex items-center gap-2 text-sm text-[#1e3a5f] hover:underline font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t('home.openFullMap')}
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
