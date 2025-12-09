import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DOCUMENT_CATEGORIES = {
  charter: "Устав",
  order: "Приказы",
  budget: "Бюджет",
  report: "Отчёты",
  attestation: "Аттестация",
  other: "Прочее",
};

export default function ClientAdminDocumentForm() {
  const params = useParams<{ clientSlug: string; id?: string }>();
  const clientSlug = params.clientSlug;
  const documentId = params.id ? parseInt(params.id) : null;
  const isEditing = !!documentId;
  const [, setLocation] = useLocation();

  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );

  const { data: existingDocs, isLoading: loadingDoc } = trpc.documents.list.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id && isEditing }
  );

  const existingDoc = existingDocs?.find(d => d.id === documentId);

  const [formData, setFormData] = useState({
    title: "",
    titleKz: "",
    fileUrl: "",
    fileKey: "",
    category: "other" as "charter" | "attestation" | "budget" | "report" | "order" | "other",
    isPublished: true,
  });

  useEffect(() => {
    if (existingDoc) {
      setFormData({
        title: existingDoc.title || "",
        titleKz: existingDoc.titleKz || "",
        fileUrl: existingDoc.fileUrl || "",
        fileKey: existingDoc.fileKey || "",
        category: (existingDoc.category as "charter" | "attestation" | "budget" | "report" | "order" | "other") || "other",
        isPublished: existingDoc.isPublished ?? true,
      });
    }
  }, [existingDoc]);

  const createMutation = trpc.documents.create.useMutation({
    onSuccess: () => {
      toast.success("Документ добавлен");
      setLocation(`/admin/${clientSlug}/documents`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.documents.update.useMutation({
    onSuccess: () => {
      toast.success("Документ обновлён");
      setLocation(`/admin/${clientSlug}/documents`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Введите название документа");
      return;
    }

    if (isEditing && documentId) {
      updateMutation.mutate({
        id: documentId,
        title: formData.title,
        titleKz: formData.titleKz || undefined,
        category: formData.category,
        isPublished: formData.isPublished,
      });
    } else if (client?.id) {
      createMutation.mutate({
        clientId: client.id,
        title: formData.title,
        titleKz: formData.titleKz || undefined,
        fileUrl: formData.fileUrl,
        fileKey: formData.fileKey || formData.fileUrl.split('/').pop() || 'document',
        category: formData.category,
        isPublished: formData.isPublished,
      });
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const basePath = `/admin/${clientSlug}`;

  if (isEditing && loadingDoc) {
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
          <Link href={`${basePath}/documents`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              {isEditing ? "Редактирование документа" : "Новый документ"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Обновите информацию о документе" : "Добавьте новый документ"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>Название и категория документа</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Название (русский) *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Положение о ПМПК"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleKz">Название (казахский)</Label>
                  <Input
                    id="titleKz"
                    value={formData.titleKz}
                    onChange={(e) => setFormData({ ...formData, titleKz: e.target.value })}
                    placeholder="ПМПК туралы ереже"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DOCUMENT_CATEGORIES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* File */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Файл документа</CardTitle>
              <CardDescription>Ссылка на файл (PDF, DOC)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="fileUrl">URL файла</Label>
                <Input
                  id="fileUrl"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://example.com/document.pdf"
                />
                <p className="text-xs text-muted-foreground">
                  Поддерживаемые форматы: PDF, DOC, DOCX
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link href={`${basePath}/documents`}>
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
