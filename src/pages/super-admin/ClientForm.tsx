import SuperAdminLayout from "@/components/SuperAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Save, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientFormPage() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const isEditing = params.id && params.id !== "new";
  const clientId = isEditing ? parseInt(params.id!) : null;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    logoUrl: "",
    address: "",
    phone: "",
    email: "",
    trustPhone: "",
    instagram: "",
    facebook: "",
    telegram: "",
    workSchedule: "",
    directorName: "",
    directorPhoto: "",
    directorBio: "",
    isActive: true,
  });

  const { data: client, isLoading } = trpc.clients.getById.useQuery(
    { id: clientId! },
    { enabled: !!clientId }
  );

  const createMutation = trpc.clients.create.useMutation({
    onSuccess: () => {
      toast.success("Клиент успешно создан");
      setLocation("/super-admin/clients");
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  const updateMutation = trpc.clients.update.useMutation({
    onSuccess: () => {
      toast.success("Клиент успешно обновлён");
      setLocation("/super-admin/clients");
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        slug: client.slug || "",
        description: client.description || "",
        logoUrl: client.logoUrl || "",
        address: client.address || "",
        phone: client.phone || "",
        email: client.email || "",
        trustPhone: client.trustPhone || "",
        instagram: client.instagram || "",
        facebook: client.facebook || "",
        telegram: client.telegram || "",
        workSchedule: client.workSchedule || "",
        directorName: client.directorName || "",
        directorPhoto: client.directorPhoto || "",
        directorBio: client.directorBio || "",
        isActive: client.isActive ?? true,
      });
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.slug) {
      toast.error("Заполните обязательные поля");
      return;
    }

    if (isEditing && clientId) {
      updateMutation.mutate({ id: clientId, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const map: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
          'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return map[char] || char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (isLoading && isEditing) {
    return (
      <SuperAdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/super-admin/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditing ? "Редактирование клиента" : "Новый клиент"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Измените данные организации" : "Добавьте новую организацию на платформу"}
            </p>
          </div>
          <Button 
            type="submit" 
            className="bg-platform-gradient hover:opacity-90"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Сохранить" : "Создать"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Info */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Основная информация
              </CardTitle>
              <CardDescription>
                Название и идентификатор организации
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название организации *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      name: e.target.value,
                      slug: formData.slug || generateSlug(e.target.value)
                    });
                  }}
                  placeholder="ПМПК №9 г. Астана"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                  placeholder="pmpk-9-astana"
                />
                <p className="text-xs text-muted-foreground">
                  Будет использоваться в URL: /site/{formData.slug || "slug"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Краткое описание организации..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl">URL логотипа</Label>
                <Input
                  id="logoUrl"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Статус</Label>
                  <p className="text-sm text-muted-foreground">
                    Активные клиенты отображаются на сайте
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>
                Адрес, телефоны и социальные сети
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="г. Астана, ул. ..."
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (7172) ..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trustPhone">Телефон доверия</Label>
                  <Input
                    id="trustPhone"
                    value={formData.trustPhone}
                    onChange={(e) => setFormData({ ...formData, trustPhone: e.target.value })}
                    placeholder="+7 ..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@pmpk.kz"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workSchedule">График работы</Label>
                <Input
                  id="workSchedule"
                  value={formData.workSchedule}
                  onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
                  placeholder="Пн-Пт: 9:00-18:00"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    placeholder="URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="@channel"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Director Info */}
          <Card className="border-0 shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle>Информация о руководителе</CardTitle>
              <CardDescription>
                Данные для блога директора
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="directorName">ФИО руководителя</Label>
                  <Input
                    id="directorName"
                    value={formData.directorName}
                    onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="directorPhoto">Фото руководителя (URL)</Label>
                  <Input
                    id="directorPhoto"
                    value={formData.directorPhoto}
                    onChange={(e) => setFormData({ ...formData, directorPhoto: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="directorBio">Биография</Label>
                <Textarea
                  id="directorBio"
                  value={formData.directorBio}
                  onChange={(e) => setFormData({ ...formData, directorBio: e.target.value })}
                  placeholder="Краткая биография руководителя..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </SuperAdminLayout>
  );
}
