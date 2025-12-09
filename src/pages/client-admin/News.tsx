import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { trpc } from "@/lib/trpc";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Newspaper } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const categoryLabels: Record<string, string> = {
  news: "Новости",
  press_release: "Пресс-релизы",
  announcement: "Объявления",
};

export default function NewsPage() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );
  
  const { data: news, isLoading, refetch } = trpc.news.list.useQuery(
    { 
      clientId: client?.id!,
      category: activeTab !== 'all' ? activeTab as any : undefined
    },
    { enabled: !!client?.id }
  );
  
  const deleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => {
      toast.success("Публикация удалена");
      refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  const filteredNews = news?.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const basePath = `/admin/${clientSlug}`;

  return (
    <ClientAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">Новости</h1>
            <p className="text-muted-foreground">
              Управление новостями, пресс-релизами и объявлениями
            </p>
          </div>
          <Link href={`${basePath}/news/new`}>
            <Button className="bg-gov-primary hover:bg-gov-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Добавить публикацию
            </Button>
          </Link>
        </div>

        {/* Tabs and Search */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="news">Новости</TabsTrigger>
                  <TabsTrigger value="press_release">Пресс-релизы</TabsTrigger>
                  <TabsTrigger value="announcement">Объявления</TabsTrigger>
                </TabsList>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* News Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-gov-primary" />
              Публикации
            </CardTitle>
            <CardDescription>
              {filteredNews.length} записей
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">Нет публикаций</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "По вашему запросу ничего не найдено" : "Добавьте первую публикацию"}
                </p>
                {!searchQuery && (
                  <Link href={`${basePath}/news/new`}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить публикацию
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Заголовок</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="w-[80px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-[300px]">
                        <div className="flex items-center gap-3">
                          {item.imageUrl && (
                            <img 
                              src={item.imageUrl} 
                              alt="" 
                              className="h-10 w-14 object-cover rounded"
                            />
                          )}
                          <span className="truncate">{item.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {categoryLabels[item.category] || item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.isPublished ? "default" : "secondary"}>
                          {item.isPublished ? "Опубликовано" : "Черновик"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {item.createdAt 
                          ? new Date(item.createdAt).toLocaleDateString('ru-RU')
                          : "—"
                        }
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setLocation(`${basePath}/news/${item.id}`)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteId(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить публикацию?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                if (deleteId) {
                  deleteMutation.mutate({ id: deleteId });
                }
              }}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ClientAdminLayout>
  );
}
