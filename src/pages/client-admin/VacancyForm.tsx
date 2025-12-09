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

export default function ClientAdminVacancyForm() {
  const params = useParams<{ clientSlug: string; id?: string }>();
  const clientSlug = params.clientSlug;
  const vacancyId = params.id ? parseInt(params.id) : null;
  const isEditing = !!vacancyId;
  const [, setLocation] = useLocation();

  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );

  const { data: existingVacancies, isLoading: loadingVacancy } = trpc.vacancies.list.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id && isEditing }
  );

  const vacancy = existingVacancies?.find(v => v.id === vacancyId);

  const [formData, setFormData] = useState({
    title: "",
    titleKz: "",
    requirements: "",
    requirementsKz: "",
    salary: "",
    isActive: true,
  });

  useEffect(() => {
    if (vacancy) {
      setFormData({
        title: vacancy.title || "",
        titleKz: vacancy.titleKz || "",
        requirements: vacancy.requirements || "",
        requirementsKz: vacancy.requirementsKz || "",
        salary: vacancy.salary || "",
        isActive: vacancy.isActive ?? true,
      });
    }
  }, [vacancy]);

  const createMutation = trpc.vacancies.create.useMutation({
    onSuccess: () => {
      toast.success("Вакансия добавлена");
      setLocation(`/admin/${clientSlug}/vacancies`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.vacancies.update.useMutation({
    onSuccess: () => {
      toast.success("Вакансия обновлена");
      setLocation(`/admin/${clientSlug}/vacancies`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Введите название вакансии");
      return;
    }

    if (isEditing && vacancyId) {
      updateMutation.mutate({
        id: vacancyId,
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
  const basePath = `/admin/${clientSlug}`;

  if (isEditing && loadingVacancy) {
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
          <Link href={`${basePath}/vacancies`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              {isEditing ? "Редактирование вакансии" : "Новая вакансия"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Обновите информацию о вакансии" : "Добавьте новую вакансию"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>Название и требования</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Название (русский) *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Психолог"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleKz">Название (казахский)</Label>
                  <Input
                    id="titleKz"
                    value={formData.titleKz}
                    onChange={(e) => setFormData({ ...formData, titleKz: e.target.value })}
                    placeholder="Психолог"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Заработная плата</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="от 250 000 тг"
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Требования</CardTitle>
              <CardDescription>Квалификационные требования к кандидату</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requirements">Требования (русский)</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="- Высшее образование&#10;- Опыт работы от 3 лет&#10;- Знание казахского языка"
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirementsKz">Требования (казахский)</Label>
                <Textarea
                  id="requirementsKz"
                  value={formData.requirementsKz}
                  onChange={(e) => setFormData({ ...formData, requirementsKz: e.target.value })}
                  placeholder="- Жоғары білім&#10;- 3 жылдан астам жұмыс тәжірибесі&#10;- Қазақ тілін білу"
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Статус</CardTitle>
              <CardDescription>Активность вакансии</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <span className="text-sm">
                  {formData.isActive ? "Активна (отображается на сайте)" : "Закрыта (скрыта)"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link href={`${basePath}/vacancies`}>
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
