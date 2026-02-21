import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users2, Target, Award, BookOpen, ArrowRight, ChevronRight,
  FileText, Building2
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedHeroBackground } from "@/components/AnimatedHeroBackground";

export default function SiteAbout() {
  const clientSlug = "pmpk9";
  const { t } = useLanguage();

  const STAFF = [
    { name: 'Байболова Айнур Сайранбекқызы', position: t('about.director'), photo: "/director.jpg" },
    { name: "Егимбаева Сандугаш Болтабековна", position: "педагог-психолог", photo: "/egimbaeva.jpeg" },
    { name: "Амарова Асемгуль Ташкенбаевна", position: "учитель-логопед", photo: "/amarova.jpeg" },
    { name: "Кушанова Лаура Сериковна", position: "социальный педагог", photo: "/kushanova.jpeg" },
    { name: "Байтулекова Асыл Батыровна", position: "врач-психиатр", photo: "/baitulekova.jpeg" },
    { name: "Бекимова Наргуль Кактаевна", position: "учитель-дефектолог", photo: "/bekimova.jpeg" },
    { name: "Әсетова Мөлдір Романқызы", position: "врач-невропатолог", photo: "/asetova.jpeg" },
    { name: "Абилова Шолпан Кайратовна", position: "методист", photo: "/abilova.jpeg" },
    { name: "Арыстанов Марат Максимович", position: "врач-офтальмолог", photo: "/arystanov.jpeg" },
  ];

  const mockClient = {
    id: '1',
    slug: 'pmpk9',
    name: 'ПМПК №9',
    description: 'Психолого-медико-педагогическая консультация',
    directorName: 'Байболова Айнур Сайранбекқызы',
    directorBio: 'Педагог-психолог высшей категории, стаж работы 20 лет.',
    directorPhoto: '/director.jpg'
  };
  const client = mockClient;
  const isLoading = false;

  const basePath = '';

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 flex flex-col justify-center min-h-[200px]">
        <AnimatedHeroBackground />
        <div className="container relative z-10 flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {client?.description || t('home.description')}
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 flex flex-col">
            {/* Organization Info */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gov-primary">
                  <Target className="h-5 w-5" />
                  {t('about.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {t('about.orgInfo')}
                </p>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gov-primary">
                  <BookOpen className="h-5 w-5" />
                  {t('about.activitiesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    t('about.activity1'),
                    t('about.activity2'),
                    t('about.activity3'),
                    t('about.activity4'),
                    t('about.activity5'),
                    t('about.activity6'),
                    t('about.activity7'),
                  ].map((activity, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-muted-foreground/10 transition-all hover:shadow-sm">
                      <div className="h-10 w-10 rounded-full bg-gov-primary text-white flex items-center justify-center shrink-0 font-bold shadow-md">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-1">
                        {activity}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 h-full">
            {/* Director Card */}
            {client?.directorName && (
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="bg-gov-primary p-4 text-white">
                  <h3 className="font-semibold">{t('about.director')}</h3>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    {client.directorPhoto ? (
                      <img
                        src={client.directorPhoto}
                        alt={client.directorName}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center">
                        <Users2 className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-lg line-clamp-2">{client.directorName}</p>
                      <p className="text-sm text-muted-foreground">{t('about.director')}</p>
                    </div>
                  </div>
                  {client.directorBio && (
                    <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
                      {client.directorBio}
                    </p>
                  )}
                  <Link href={`${basePath}/director-blog`}>
                    <Button variant="outline" size="sm" className="group w-full mt-4">
                      {t('home.readMore')}
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-90" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Quick Links */}
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="bg-gov-primary p-4 text-white">
                <h3 className="font-semibold">{t('about.sections')}</h3>
              </div>
              <CardContent className="p-2 space-y-1">
                <a href="/ustav.pdf" download className="block">
                  <Button variant="ghost" className="w-full justify-between h-12">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gov-primary" />
                      {t('about.charter')}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Values moved to Sidebar */}
            <Card className="border-0 shadow-md flex-1 overflow-hidden">
              <div className="bg-gov-primary p-4 text-white">
                <h3 className="font-semibold">{t('about.values')}</h3>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {[
                    { title: t('about.val1'), description: t('about.val1Desc') },
                    { title: t('about.val2'), description: t('about.val2Desc') },
                    { title: t('about.val3'), description: t('about.val3Desc') },
                    { title: t('about.val4'), description: t('about.val4Desc') },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-gov-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-gov-primary font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Staff Section - Full Width Container */}
      <div className="container py-12 border-t mt-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gov-primary flex items-center gap-2">
            <Users2 className="h-6 w-6" />
            {t('nav.structure')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAFF.map((member, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden bg-white">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-muted overflow-hidden shrink-0 ring-4 ring-gov-primary/5 group-hover:ring-gov-primary/20 transition-all">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gov-primary/5">
                        <Users2 className="h-10 w-10 text-gov-primary/30" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
