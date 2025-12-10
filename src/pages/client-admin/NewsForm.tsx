import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Save, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_CLIENT_ID } from "@/const/client";

export default function NewsFormPage() {
  const params = useParams<{ id?: string }>();
  const [, setLocation] = useLocation();
  const isEditing = params.id && params.id !== "new";
  const newsId = isEditing ? parseInt(params.id!) : null;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "news" as "news" | "press_release" | "announcement",
    isPublished: false,
  });

  const { data: newsItem, isLoading } = trpc.news.getById.useQuery(
    { id: newsId! },
    { enabled: !!newsId }
  );

  const createMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      toast.success("Публикация создана");
      setLocation(`/admin/news`);
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  const updateMutation = trpc.news.update.useMutation({
    onSuccess: () => {
      toast.success("Публикация обновлена");
      setLocation(`/admin/news`);
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  useEffect(() => {
    if (newsItem) {
      setFormData({
        title: newsItem.title || "",
        content: newsItem.content || "",
        imageUrl: newsItem.imageUrl || "",
        category: newsItem.category as any || "news",
        isPublished: newsItem.isPublished ?? false,
      });
    }
  }, [newsItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error("Заполните обязательные поля");
      return;
    }

    if (!client?.id) {
      toast.error("Клиент не найден");
      return;
    }

    if (isEditing && newsId) {
      updateMutation.mutate({ id: newsId, ...formData });
    } else {
      createMutation.mutate({ clientId: DEFAULT_CLIENT_ID, ...formData });
    }
  };

  const basePath = `/admin`;
  
  // Remove unused client check - we always have a default client

  if (isLoading && isEditing) {
    return (
      <ClientAdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </ClientAdminLayout>
    );
  }

  return (
    <ClientAdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={`${basePath}/news`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              {isEditing ? "Редактирование" : "Новая публикация"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Измените данные публикации" : "Создайте новую публикацию"}
            </p>
          </div>
          <Button 
            type="submit" 
            className="bg-gov-primary hover:bg-gov-primary/90"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Сохранить" : "Создать"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-gov-primary" />
                  Содержание
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Введите заголовок публикации"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Содержание *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Полный текст публикации..."
                    rows={12}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Категория</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">Новости</SelectItem>
                      <SelectItem value="press_release">Пресс-релиз</SelectItem>
                      <SelectItem value="announcement">Объявление</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Опубликовать</Label>
                    <p className="text-xs text-muted-foreground">
                      Показать на сайте
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Изображение</CardTitle>
                <CardDescription>
                  Обложка публикации
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL изображения</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                {formData.imageUrl && (
                  <div className="rounded-lg overflow-hidden border">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </ClientAdminLayout>
  );
}
