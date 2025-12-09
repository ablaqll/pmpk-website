import SuperAdminLayout from "@/components/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Building2, Users, Newspaper, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuperAdminDashboard() {
  const { data: stats, isLoading } = trpc.platform.stats.useQuery();

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
          <p className="text-muted-foreground">
            Добро пожаловать в панель управления платформой PMPK
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Всего клиентов
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.clientsCount || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Активных организаций
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Пользователей
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-pink-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.usersCount || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Зарегистрировано
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Публикаций
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.totalNews || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Новостей и статей
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Обращений
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.totalFeedback || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Вопросов и отзывов
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Быстрые действия
              </CardTitle>
              <CardDescription>
                Часто используемые функции
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/super-admin/clients/new">
                <Button variant="outline" className="w-full justify-between group">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Добавить нового клиента
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/super-admin/users">
                <Button variant="outline" className="w-full justify-between group">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Управление пользователями
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/super-admin/clients">
                <Button variant="outline" className="w-full justify-between group">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Список клиентов
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white">
            <CardHeader>
              <CardTitle className="text-white">PMPK Platform</CardTitle>
              <CardDescription className="text-white/80">
                Мультитенантная платформа для управления сайтами
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/90">
                Платформа позволяет создавать и управлять сайтами для психолого-медико-педагогических консультаций и других государственных организаций.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  Мультитенантность
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  Изоляция данных
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  CMS
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
