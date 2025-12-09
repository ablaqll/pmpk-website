import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { 
  Users2, Target, Award, BookOpen, ChevronRight,
  FileText, Building2
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function SiteAbout() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  
  const { data: client, isLoading } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );

  const basePath = `/site/${clientSlug}`;

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
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            О нашей организации
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {client?.description || "Психолого-медико-педагогическая консультация оказывает комплексную помощь детям с особыми образовательными потребностями и их семьям."}
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gov-primary">
                  <Target className="h-5 w-5" />
                  Наша миссия
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Психолого-медико-педагогическая консультация (ПМПК) — это государственное учреждение, 
                  осуществляющее комплексное психолого-медико-педагогическое обследование детей 
                  с целью определения специальных условий для получения образования.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Мы оказываем помощь детям с особыми образовательными потребностями, 
                  их родителям и педагогам в вопросах обучения, воспитания и развития.
                </p>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gov-primary">
                  <BookOpen className="h-5 w-5" />
                  Направления деятельности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Диагностика",
                      description: "Комплексное психолого-медико-педагогическое обследование детей"
                    },
                    {
                      title: "Консультирование",
                      description: "Консультации для родителей и педагогов по вопросам развития детей"
                    },
                    {
                      title: "Коррекция",
                      description: "Коррекционно-развивающие занятия для детей с ООП"
                    },
                    {
                      title: "Методическая помощь",
                      description: "Методическое сопровождение образовательных организаций"
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gov-primary">
                  <Award className="h-5 w-5" />
                  Наши ценности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Профессионализм",
                      description: "Высокий уровень квалификации специалистов и постоянное повышение компетенций"
                    },
                    {
                      title: "Индивидуальный подход",
                      description: "Учет особенностей каждого ребенка при определении образовательного маршрута"
                    },
                    {
                      title: "Конфиденциальность",
                      description: "Защита персональных данных и результатов обследования"
                    },
                    {
                      title: "Доступность",
                      description: "Обеспечение равного доступа к услугам для всех категорий граждан"
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-gov-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-gov-primary font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Director Card */}
            {client?.directorName && (
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="bg-gov-primary p-4">
                  <h3 className="text-white font-semibold">Руководитель</h3>
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
                      <p className="font-semibold text-lg">{client.directorName}</p>
                      <p className="text-sm text-muted-foreground">Директор</p>
                    </div>
                  </div>
                  {client.directorBio && (
                    <p className="text-sm text-muted-foreground mt-4">
                      {client.directorBio}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Links */}
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gov-primary rounded-t-lg">
                <CardTitle className="text-white text-base">Разделы</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-1">
                <Link href={`${basePath}/structure`}>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Структура ПМПК
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`${basePath}/documents`}>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Устав и документы
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
