import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { Plus, Search, Edit, Trash2, FileText, Download, ExternalLink, FolderOpen } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
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
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

import { DEFAULT_CLIENT_ID } from "@/const/client";

export default function ClientAdminDocuments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: documents, isLoading, refetch } = trpc.documents.list.useQuery(
    { clientId: DEFAULT_CLIENT_ID, category: categoryFilter === "all" ? undefined : categoryFilter as any },
    { enabled: true }
  );

  const deleteMutation = trpc.documents.delete.useMutation({
    onSuccess: () => {
      toast.success("Документ удалён");
      refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const filteredDocuments = documents?.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const basePath = `/admin`;

  return (
    <ClientAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              Документы
            </h1>
            <p className="text-muted-foreground">
              Управление официальными документами организации
            </p>
          </div>
          <Link href={`${basePath}/documents/new`}>
            <Button className="gap-2 bg-gov-primary hover:bg-gov-primary/90">
              <Plus className="h-4 w-4" />
              Добавить документ
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
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

        {/* Documents List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !filteredDocuments?.length ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Нет документов</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || categoryFilter !== "all"
                  ? "По вашему запросу ничего не найдено"
                  : "Добавьте первый документ"}
              </p>
              {!searchQuery && categoryFilter === "all" && (
                <Link href={`${basePath}/documents/new`}>
                  <Button className="bg-gov-primary hover:bg-gov-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить документ
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Документ</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="w-32">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gov-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-gov-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            {doc.titleKz && (
                              <div className="text-sm text-muted-foreground">
                                {doc.titleKz}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {DOCUMENT_CATEGORIES[doc.category as keyof typeof DOCUMENT_CATEGORIES] || doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('ru-RU') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {doc.fileUrl && (
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          <Link href={`${basePath}/documents/${doc.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить документ?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Документ будет удалён из системы.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ClientAdminLayout>
  );
}
