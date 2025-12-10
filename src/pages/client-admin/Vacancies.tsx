import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { Plus, Search, Edit, Trash2, Briefcase } from "lucide-react";
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

export default function ClientAdminVacancies() {
  const clientSlug = "pmpk9";
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: true }
  );

  const { data: vacancies, isLoading, refetch } = trpc.vacancies.list.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id }
  );

  const deleteMutation = trpc.vacancies.delete.useMutation({
    onSuccess: () => {
      toast.success("Вакансия удалена");
      refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const filteredVacancies = vacancies?.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const basePath = `/admin`;

  return (
    <ClientAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              Вакансии
            </h1>
            <p className="text-muted-foreground">
              Управление открытыми вакансиями
            </p>
          </div>
          <Link href={`${basePath}/vacancies/new`}>
            <Button className="gap-2 bg-gov-primary hover:bg-gov-primary/90">
              <Plus className="h-4 w-4" />
              Добавить вакансию
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vacancies List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !filteredVacancies?.length ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Нет вакансий</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "По вашему запросу ничего не найдено"
                  : "Добавьте первую вакансию"}
              </p>
              {!searchQuery && (
                <Link href={`${basePath}/vacancies/new`}>
                  <Button className="bg-gov-primary hover:bg-gov-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить вакансию
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
                    <TableHead>Вакансия</TableHead>
                    <TableHead>Зарплата</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="w-24">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVacancies.map((vacancy) => (
                    <TableRow key={vacancy.id}>
                      <TableCell>
                        <div className="font-medium">{vacancy.title}</div>
                        {vacancy.titleKz && (
                          <div className="text-sm text-muted-foreground">
                            {vacancy.titleKz}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {vacancy.salary || "Не указана"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={vacancy.isActive ? "default" : "secondary"}>
                          {vacancy.isActive ? "Активна" : "Закрыта"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link href={`${basePath}/vacancies/${vacancy.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(vacancy.id)}
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
            <AlertDialogTitle>Удалить вакансию?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Вакансия будет удалена.
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
