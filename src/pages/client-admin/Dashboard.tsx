import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Newspaper, Users2, Briefcase, MessageSquare, ArrowRight, Globe } from "lucide-react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientAdminDashboard() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  
  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );
  
  const { data: stats, isLoading } = trpc.clients.stats.useQuery(
    { id: client?.id! },
    { enabled: !!client?.id }
  );

  const basePath = `/admin/${clientSlug}`;

  return (
    <ClientAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              Панель управления
            </h1>
            <p className="text-muted-foreground">
              {client?.name || "Загрузка..."}
            </p>
          </div>
          <Link href={`/site/${clientSlug}`}>
            <Button variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              Просмотр сайта
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Публикаций
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.newsCount || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Новостей и объявлений
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Сотрудников
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Users2 className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.staffCount || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                В структуре организации
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Вакансий
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.vacanciesCount || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Открытых позиций
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Обращений
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.feedbackCount || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Вопросов от граждан
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>
                Часто используемые функции
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href={`${basePath}/news/new`}>
                <Button variant="outline" className="w-full justify-between group">
                  <span className="flex items-center gap-2">
                    <Newspaper className="h-4 w-4" />
                    Добавить новость
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={`${basePath}/staff/new`}>
                <Button variant="outline" className="w-full justify-between group">
                  <span className="flex items-center gap-2">
                    <Users2 className="h-4 w-4" />
                    Добавить сотрудника
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={`${basePath}/feedback`}>
                <Button variant="outline" className="w-full justify-between group">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Ответить на обращения
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gov-primary text-white">
            <CardHeader>
              <CardTitle className="text-white">Информация</CardTitle>
              <CardDescription className="text-white/80">
                Управление контентом сайта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/90">
                Здесь вы можете управлять всем контентом вашего сайта: новостями, 
                информацией о сотрудниках, вакансиями и обращениями граждан.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  Новости
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  Сотрудники
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  Документы
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientAdminLayout>
  );
}
