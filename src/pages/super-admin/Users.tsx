import SuperAdminLayout from "@/components/SuperAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Search, Users, Shield, UserCog } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const roleLabels: Record<string, string> = {
  user: "Пользователь",
  admin: "Администратор",
  super_admin: "Супер-админ",
  client_admin: "Админ клиента",
  editor: "Редактор",
};

const roleBadgeVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  user: "secondary",
  admin: "default",
  super_admin: "destructive",
  client_admin: "default",
  editor: "outline",
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<{
    id: number;
    role: string;
    clientId?: number;
  } | null>(null);
  
  const { data: users, isLoading, refetch } = trpc.platform.users.useQuery();
  const { data: clients } = trpc.clients.list.useQuery();
  
  const updateRoleMutation = trpc.platform.updateUserRole.useMutation({
    onSuccess: () => {
      toast.success("Роль пользователя обновлена");
      refetch();
      setEditingUser(null);
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  const filteredUsers = users?.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Пользователи</h1>
          <p className="text-muted-foreground">
            Управление пользователями и их ролями
          </p>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени или email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Список пользователей
            </CardTitle>
            <CardDescription>
              {filteredUsers.length} пользователей
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">Нет пользователей</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "По вашему запросу ничего не найдено" : "Пользователи появятся после регистрации"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Последний вход</TableHead>
                    <TableHead className="w-[100px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const assignedClient = clients?.find(c => c.id === user.clientId);
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {user.name?.charAt(0).toUpperCase() || "?"}
                              </span>
                            </div>
                            <span>{user.name || "—"}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email || "—"}</TableCell>
                        <TableCell>
                          <Badge variant={roleBadgeVariants[user.role] || "secondary"}>
                            {roleLabels[user.role] || user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {assignedClient ? (
                            <span className="text-sm">{assignedClient.name}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {user.lastSignedIn 
                            ? new Date(user.lastSignedIn).toLocaleDateString('ru-RU')
                            : "—"
                          }
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingUser({
                              id: user.id,
                              role: user.role,
                              clientId: user.clientId ?? undefined,
                            })}
                          >
                            <UserCog className="h-4 w-4 mr-1" />
                            Роль
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={editingUser !== null} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Изменить роль пользователя
            </DialogTitle>
            <DialogDescription>
              Выберите роль и при необходимости привяжите к клиенту
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Роль</Label>
              <Select
                value={editingUser?.role}
                onValueChange={(value) => setEditingUser(prev => prev ? { ...prev, role: value } : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Пользователь</SelectItem>
                  <SelectItem value="editor">Редактор</SelectItem>
                  <SelectItem value="client_admin">Админ клиента</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                  <SelectItem value="super_admin">Супер-админ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(editingUser?.role === 'client_admin' || editingUser?.role === 'editor') && (
              <div className="space-y-2">
                <Label>Привязка к клиенту</Label>
                <Select
                  value={editingUser?.clientId?.toString() || ""}
                  onValueChange={(value) => setEditingUser(prev => 
                    prev ? { ...prev, clientId: value ? parseInt(value) : undefined } : null
                  )}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите клиента" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients?.map(client => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                if (editingUser) {
                  updateRoleMutation.mutate({
                    userId: editingUser.id,
                    role: editingUser.role as any,
                    clientId: editingUser.clientId,
                  });
                }
              }}
              disabled={updateRoleMutation.isPending}
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
