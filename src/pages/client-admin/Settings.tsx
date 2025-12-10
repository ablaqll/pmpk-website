import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Save, Loader2, Building2, Phone, MapPin, Clock, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { toast } from "sonner";

export default function ClientAdminSettings() {
  const clientSlug = "pmpk9";

  const { data: client, refetch } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: true }
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        description: client.description || "",
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
      });
    }
  }, [client]);

  const updateMutation = trpc.clients.update.useMutation({
    onSuccess: () => {
      toast.success("Настройки сохранены");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (client?.id) {
      updateMutation.mutate({
        id: client.id,
        ...formData,
      });
    }
  };

  const isSubmitting = updateMutation.isPending;

  return (
    <ClientAdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
            Настройки сайта
          </h1>
          <p className="text-muted-foreground">
            Основная информация об организации
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Информация об организации
              </CardTitle>
              <CardDescription>Название и описание организации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название организации</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="№9 ПМПК"
                />
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
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Контактная информация
              </CardTitle>
              <CardDescription>Телефоны, email и мессенджеры</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (7172) 12-34-56"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="info@pmpk9.kz"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="trustPhone">Телефон доверия</Label>
                  <Input
                    id="trustPhone"
                    value={formData.trustPhone}
                    onChange={(e) => setFormData({ ...formData, trustPhone: e.target.value })}
                    placeholder="+7 (7172) 12-34-57"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="@pmpk9"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="https://instagram.com/pmpk9"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    placeholder="https://facebook.com/pmpk9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Адрес
              </CardTitle>
              <CardDescription>Местоположение организации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="г. Астана, ул. Е-321, дом 18"
                />
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Режим работы
              </CardTitle>
              <CardDescription>График работы организации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workSchedule">Режим работы</Label>
                <Textarea
                  id="workSchedule"
                  value={formData.workSchedule}
                  onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
                  placeholder="Пн-Пт: 9:00 - 18:00&#10;Сб-Вс: выходной"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Director Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Руководитель
              </CardTitle>
              <CardDescription>Информация о директоре для блога</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="directorPhoto">URL фотографии</Label>
                <Input
                  id="directorPhoto"
                  value={formData.directorPhoto}
                  onChange={(e) => setFormData({ ...formData, directorPhoto: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
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

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gov-primary hover:bg-gov-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить настройки
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ClientAdminLayout>
  );
}
