import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { MessageSquare, Send, HelpCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function SiteFeedback() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
  });
  const [submitted, setSubmitted] = useState(false);
  
  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );
  
  const { data: publishedFeedback, isLoading } = trpc.feedback.listPublished.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id }
  );

  const createMutation = trpc.feedback.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", question: "" });
      toast.success("Ваше обращение отправлено");
    },
    onError: (error) => {
      toast.error("Ошибка: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.question) {
      toast.error("Заполните обязательные поля");
      return;
    }

    if (!client?.id) {
      toast.error("Ошибка загрузки данных");
      return;
    }

    createMutation.mutate({
      clientId: client.id,
      name: formData.name,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      question: formData.question,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <MessageSquare className="h-8 w-8" />
            Обращения граждан
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            Задайте вопрос или оставьте обращение. Мы ответим в кратчайшие сроки.
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-gov-primary" />
                  Отправить обращение
                </CardTitle>
                <CardDescription>
                  Заполните форму ниже, и мы ответим на ваш вопрос
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Обращение отправлено!</h3>
                    <p className="text-muted-foreground mb-6">
                      Мы рассмотрим ваш вопрос и ответим в ближайшее время
                    </p>
                    <Button onClick={() => setSubmitted(false)}>
                      Отправить ещё
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Введите ваше имя"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@mail.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="question">Ваш вопрос *</Label>
                      <Textarea
                        id="question"
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        placeholder="Опишите ваш вопрос или обращение..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={createMutation.isPending}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {createMutation.isPending ? "Отправка..." : "Отправить обращение"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-gov-primary mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6" />
              Часто задаваемые вопросы
            </h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : publishedFeedback?.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="py-8 text-center">
                  <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    Раздел FAQ будет заполнен по мере поступления вопросов
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {publishedFeedback?.map((item) => (
                  <Card key={item.id} className="border-0 shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex gap-3 mb-3">
                        <div className="h-6 w-6 rounded-full bg-gov-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-gov-primary font-bold text-sm">В</span>
                        </div>
                        <p className="font-medium">{item.question}</p>
                      </div>
                      {item.answer && (
                        <div className="flex gap-3 pl-9">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <span className="text-green-600 font-bold text-sm">О</span>
                          </div>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
