import ClientAdminLayout from "@/components/ClientAdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { MessageSquare, CheckCircle, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useParams } from "wouter";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function FeedbackPage() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  
  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );
  
  const { data: feedbackList, isLoading, refetch } = trpc.feedback.list.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id }
  );
  
  // Filter locally based on tab
  const filteredFeedback = feedbackList?.filter(f => {
    if (activeTab === 'answered') return f.isAnswered;
    if (activeTab === 'pending') return !f.isAnswered;
    return true;
  }) || [];
  
  const answerMutation = trpc.feedback.answer.useMutation({
    onSuccess: () => {
      toast.success("Ответ отправлен");
      refetch();
      setSelectedFeedback(null);
      setAnswer("");
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  const pendingCount = feedbackList?.filter(f => !f.isAnswered).length || 0;
  const answeredCount = feedbackList?.filter(f => f.isAnswered).length || 0;

  return (
    <ClientAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gov-primary">Обращения граждан</h1>
          <p className="text-muted-foreground">
            Вопросы и ответы от посетителей сайта
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{feedbackList?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Всего обращений</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Ожидают ответа</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{answeredCount}</p>
                  <p className="text-sm text-muted-foreground">Отвечено</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="pending">
              Ожидают ответа
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 justify-center">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="answered">Отвечено</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Feedback List */}
        <div className="space-y-4">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))
          ) : filteredFeedback.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">Нет обращений</h3>
                <p className="text-muted-foreground">
                  Обращения от граждан будут отображаться здесь
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFeedback.map((item) => (
              <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription>
                        {item.email && <span>{item.email}</span>}
                        {item.phone && <span> • {item.phone}</span>}
                        <span className="ml-2">
                          {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.isPublished && (
                        <Badge variant="outline">Опубликовано</Badge>
                      )}
                      <Badge variant={item.isAnswered ? "default" : "secondary"}>
                        {item.isAnswered ? "Отвечено" : "Ожидает"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm">{item.question}</p>
                  </div>
                  {item.answer && (
                    <div className="bg-gov-primary/5 rounded-lg p-4 border-l-4 border-gov-primary">
                      <p className="text-sm font-medium text-gov-primary mb-1">Ответ:</p>
                      <p className="text-sm">{item.answer}</p>
                    </div>
                  )}
                  {!item.isAnswered && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedFeedback(item);
                        setAnswer(item.answer || "");
                        setIsPublished(item.isPublished);
                      }}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Ответить
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Answer Dialog */}
      <Dialog open={selectedFeedback !== null} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ответить на обращение</DialogTitle>
            <DialogDescription>
              От: {selectedFeedback?.name} ({selectedFeedback?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-1">Вопрос:</p>
              <p className="text-sm">{selectedFeedback?.question}</p>
            </div>
            <div className="space-y-2">
              <Label>Ваш ответ</Label>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Введите ответ на обращение..."
                rows={6}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Опубликовать на сайте</Label>
                <p className="text-xs text-muted-foreground">
                  Вопрос и ответ будут видны в разделе FAQ
                </p>
              </div>
              <Switch
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                if (selectedFeedback && answer) {
                  answerMutation.mutate({
                    id: selectedFeedback.id,
                    answer,
                    isPublished,
                  });
                }
              }}
              disabled={!answer || answerMutation.isPending}
            >
              <Send className="h-4 w-4 mr-2" />
              Отправить ответ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientAdminLayout>
  );
}
