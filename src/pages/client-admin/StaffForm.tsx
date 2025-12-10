import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { toast } from "sonner";

export default function ClientAdminStaffForm() {
  const params = useParams<{ id?: string }>();
  const clientSlug = "pmpk9";
  const staffId = params.id ? parseInt(params.id) : null;
  const isEditing = !!staffId;
  const [, setLocation] = useLocation();

  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: true }
  );

  const { data: existingStaff, isLoading: loadingStaff } = trpc.staff.list.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id && isEditing }
  );

  const staffMember = existingStaff?.find(s => s.id === staffId);

  const [formData, setFormData] = useState({
    name: "",
    nameKz: "",
    position: "",
    positionKz: "",
    department: "",
    departmentKz: "",
    photoUrl: "",
    email: "",
    phone: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (staffMember) {
      setFormData({
        name: staffMember.name || "",
        nameKz: staffMember.nameKz || "",
        position: staffMember.position || "",
        positionKz: staffMember.positionKz || "",
        department: staffMember.department || "",
        departmentKz: staffMember.departmentKz || "",
        photoUrl: staffMember.photoUrl || "",
        email: staffMember.email || "",
        phone: staffMember.phone || "",
        sortOrder: staffMember.sortOrder || 0,
        isActive: staffMember.isActive ?? true,
      });
    }
  }, [staffMember]);

  const createMutation = trpc.staff.create.useMutation({
    onSuccess: () => {
      toast.success("Сотрудник добавлен");
      setLocation(`/admin/staff`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.staff.update.useMutation({
    onSuccess: () => {
      toast.success("Данные сотрудника обновлены");
      setLocation(`/admin/staff`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Введите ФИО сотрудника");
      return;
    }
    if (!formData.position.trim()) {
      toast.error("Введите должность");
      return;
    }

    if (isEditing && staffId) {
      updateMutation.mutate({
        id: staffId,
        ...formData,
      });
    } else if (client?.id) {
      createMutation.mutate({
        clientId: client.id,
        ...formData,
      });
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const basePath = `/admin`;

  if (isEditing && loadingStaff) {
    return (
      <ClientAdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gov-primary" />
        </div>
      </ClientAdminLayout>
    );
  }

  return (
    <ClientAdminLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={`${basePath}/staff`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              {isEditing ? "Редактирование сотрудника" : "Новый сотрудник"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Обновите информацию о сотруднике" : "Добавьте нового сотрудника в структуру"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>ФИО и должность сотрудника</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">ФИО (русский) *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameKz">ФИО (казахский)</Label>
                  <Input
                    id="nameKz"
                    value={formData.nameKz}
                    onChange={(e) => setFormData({ ...formData, nameKz: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="position">Должность (русский) *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Директор"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positionKz">Должность (казахский)</Label>
                  <Input
                    id="positionKz"
                    value={formData.positionKz}
                    onChange={(e) => setFormData({ ...formData, positionKz: e.target.value })}
                    placeholder="Директор"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Отдел (русский)</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Руководство"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departmentKz">Отдел (казахский)</Label>
                  <Input
                    id="departmentKz"
                    value={formData.departmentKz}
                    onChange={(e) => setFormData({ ...formData, departmentKz: e.target.value })}
                    placeholder="Басшылық"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>Телефон и email сотрудника</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (777) 123-45-67"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivanov@example.kz"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Фотография</CardTitle>
              <CardDescription>URL фотографии сотрудника</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="photoUrl">URL фотографии</Label>
                <Input
                  id="photoUrl"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Рекомендуемый размер: 300x400 пикселей
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Настройки</CardTitle>
              <CardDescription>Порядок отображения и статус</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Порядок сортировки</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Меньшее значение = выше в списке
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Статус</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <span className="text-sm">
                      {formData.isActive ? "Активен" : "Скрыт"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link href={`${basePath}/staff`}>
              <Button variant="outline" type="button">
                Отмена
              </Button>
            </Link>
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
                  {isEditing ? "Сохранить" : "Добавить"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ClientAdminLayout>
  );
}
