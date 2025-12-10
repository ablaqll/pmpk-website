import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { Plus, Search, Edit, Trash2, User2, Phone, Mail, GripVertical } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DEFAULT_CLIENT_ID } from "@/const/client";

export default function ClientAdminStaff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: staff, isLoading, refetch } = trpc.staff.list.useQuery(
    { clientId: DEFAULT_CLIENT_ID },
    { enabled: true }
  );

  const deleteMutation = trpc.staff.delete.useMutation({
    onSuccess: () => {
      toast.success("Сотрудник удалён");
      refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const filteredStaff = staff?.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.department?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  // Group by department
  const groupedStaff = filteredStaff?.reduce((acc, s) => {
    const dept = s.department || "Без отдела";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(s);
    return acc;
  }, {} as Record<string, typeof filteredStaff>);

  const basePath = `/admin`;

  return (
    <ClientAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gov-primary">
              Сотрудники
            </h1>
            <p className="text-muted-foreground">
              Управление структурой организации
            </p>
          </div>
          <Link href={`${basePath}/staff/new`}>
            <Button className="gap-2 bg-gov-primary hover:bg-gov-primary/90">
              <Plus className="h-4 w-4" />
              Добавить сотрудника
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, должности или отделу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Staff List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : !filteredStaff?.length ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center">
              <User2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Нет сотрудников</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "По вашему запросу ничего не найдено"
                  : "Добавьте первого сотрудника организации"}
              </p>
              {!searchQuery && (
                <Link href={`${basePath}/staff/new`}>
                  <Button className="bg-gov-primary hover:bg-gov-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить сотрудника
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedStaff || {}).map(([department, members]) => (
            <Card key={department} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {department}
                  <Badge variant="secondary" className="ml-2">
                    {members?.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Сотрудник</TableHead>
                      <TableHead>Должность</TableHead>
                      <TableHead>Контакты</TableHead>
                      <TableHead className="w-24">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members?.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            {member.photoUrl && (
                              <AvatarImage src={member.photoUrl} alt={member.name} />
                            )}
                            <AvatarFallback className="bg-gov-primary/10 text-gov-primary">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{member.name}</div>
                          {member.nameKz && (
                            <div className="text-sm text-muted-foreground">
                              {member.nameKz}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>{member.position}</div>
                          {member.positionKz && (
                            <div className="text-sm text-muted-foreground">
                              {member.positionKz}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {member.phone && (
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3" />
                                {member.phone}
                              </div>
                            )}
                            {member.email && (
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                {member.email}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link href={`${basePath}/staff/${member.id}`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeleteId(member.id)}
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
          ))
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить сотрудника?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Сотрудник будет удалён из структуры организации.
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
