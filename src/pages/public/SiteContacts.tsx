import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { 
  MapPin, Phone, Mail, Clock, ExternalLink, 
  MessageSquare, Volume2, Instagram, Send
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteContacts() {
  const clientSlug = "pmpk9";
  const { language, t } = useLanguage();
  
  // Mock client fallback
  const mockClient = {
    id: '1',
    slug: 'pmpk9',
    name: 'ПМПК №9',
    phone: '+7 777 608 00 65',
    email: 'pmpk9_ast@mail.ru',
    trustPhone: null,
    telegram: null
  };
  const { data: clientData, isLoading: isClientLoading } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug },
    { enabled: true, retry: false, refetchOnWindowFocus: false }
  );
  const client = clientData || mockClient;
  const isLoading = isClientLoading && !client;

  const basePath = '';

  // Updated contact info
  const contactInfo = {
    address: "Е-321, 18, Астана",
    addressKz: "Е-321, 18, Астана қаласы",
    phone: "8 777 608 00 65",
    email: "pmpk9_ast@mail.ru",
    schedule: language === 'kz' ? 'Дб-Жм 8:30-13:20' : language === 'ru' ? 'Пн-Пт 8:30-13:20' : 'Mon-Fri 8:30-13:20',
    instagram: "pmpk_9ast"
  };

  // 2GIS map coordinates for E-321, 18 Astana
  const mapUrl = "https://2gis.kz/astana/geo/9570784936839925";

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <MapPin className="h-8 w-8" />
            {t('contacts.title')}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {language === 'kz' 
              ? 'Бізбен кез келген ыңғайлы тәсілмен байланысыңыз'
              : language === 'ru'
              ? 'Свяжитесь с нами любым удобным способом'
              : 'Contact us in any convenient way'}
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gov-primary" />
                  {t('contacts.address')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{language === 'kz' ? contactInfo.addressKz : contactInfo.address}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'kz' 
                    ? '№9 ПМПК, Астана қаласы'
                    : language === 'ru'
                    ? 'ПМПК №9, город Астана'
                    : 'PMPK №9, Astana city'}
                </p>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gov-primary" />
                  {t('contacts.phone')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-lg hover:text-gov-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.phone}
                </a>
                {client?.trustPhone && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gov-gold/10 border border-gov-gold/20">
                    <Volume2 className="h-5 w-5 text-gov-gold" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'kz' ? 'Сенім телефоны' : language === 'ru' ? 'Телефон доверия' : 'Trust phone'}
                      </p>
                      <a 
                        href={`tel:${client.trustPhone}`}
                        className="text-lg font-semibold hover:text-gov-primary transition-colors"
                      >
                        {client.trustPhone}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gov-primary" />
                  {t('contacts.email')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-lg hover:text-gov-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </CardContent>
            </Card>

            {/* Work Schedule */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gov-primary" />
                  {t('contacts.schedule')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{contactInfo.schedule}</p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {language === 'kz' ? 'Әлеуметтік желілер' : language === 'ru' ? 'Социальные сети' : 'Social Media'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <a 
                    href={`https://instagram.com/${contactInfo.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-105 transition-transform"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  {client?.telegram && (
                    <a 
                      href={client.telegram.startsWith('http') ? client.telegram : `https://t.me/${client.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center text-white hover:scale-105 transition-transform"
                    >
                      <Send className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map & Feedback */}
          <div className="space-y-6">
            {/* 2GIS Map */}
            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gov-primary" />
                  {language === 'kz' ? 'Картадағы орналасуы' : language === 'ru' ? 'Расположение на карте' : 'Location on map'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* 2GIS Widget */}
                <div className="relative h-80 bg-muted">
                  <iframe
                    src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A51.128422%2C%22lon%22%3A71.430411%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22astana%22%7D%2C%22org%22%3A%229570784936839925%22%7D"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="2GIS Map"
                  />
                </div>
                <div className="p-4 bg-muted/50 border-t">
                  <a 
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-gov-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {language === 'kz' ? '2ГИС-те ашу' : language === 'ru' ? 'Открыть в 2ГИС' : 'Open in 2GIS'}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Feedback CTA */}
            <Card className="border-0 shadow-md bg-gov-primary text-white">
              <CardContent className="py-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'kz' ? 'Сұрақтарыңыз бар ма?' : language === 'ru' ? 'Есть вопросы?' : 'Have questions?'}
                </h3>
                <p className="text-white/80 mb-6">
                  {language === 'kz' 
                    ? 'Бізге өтініш жіберіңіз, біз тез арада жауап береміз'
                    : language === 'ru'
                    ? 'Отправьте нам обращение, и мы ответим в кратчайшие сроки'
                    : 'Send us a request and we will respond as soon as possible'}
                </p>
                <Link href={`${basePath}/feedback`}>
                  <Button variant="secondary" size="lg">
                    {t('feedback.question')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">
                  {language === 'kz' ? 'Пайдалы сілтемелер' : language === 'ru' ? 'Полезные ссылки' : 'Useful links'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a 
                  href="https://birge.astana.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <span>
                    {language === 'kz' ? 'Астана қаласының қызметтері' : language === 'ru' ? 'Услуги города Астана' : 'Astana city services'}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
                <a 
                  href="https://egov.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <span>
                    {language === 'kz' ? 'Электрондық үкімет' : language === 'ru' ? 'Электронное правительство' : 'E-Government'}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
