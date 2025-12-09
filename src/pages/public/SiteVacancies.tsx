import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Briefcase, ExternalLink, DollarSign, CheckCircle } from "lucide-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function SiteVacancies() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  
  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );
  
  const { data: vacancies, isLoading } = trpc.vacancies.listActive.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id }
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <Briefcase className="h-8 w-8" />
            Вакансии
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            Присоединяйтесь к нашей команде профессионалов
          </p>
        </div>
      </section>

      <div className="container py-12">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : vacancies?.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="py-16 text-center">
              <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">Нет открытых вакансий</h3>
              <p className="text-muted-foreground mb-6">
                В настоящее время нет открытых вакансий. Следите за обновлениями!
              </p>
              <a href="https://enbek.kz" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Смотреть вакансии на enbek.kz
                </Button>
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {vacancies?.map((vacancy) => (
              <Card key={vacancy.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-gov-primary">
                        {vacancy.title}
                      </CardTitle>
                      {vacancy.salary && (
                        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>{vacancy.salary}</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="default" className="bg-green-600">
                      Активна
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {vacancy.requirements && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Требования:</h4>
                      <div className="space-y-2">
                        {vacancy.requirements.split('\n').map((req, index) => (
                          req.trim() && (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{req}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 pt-4 border-t">
                    {client?.email && (
                      <a href={`mailto:${client.email}?subject=Отклик на вакансию: ${vacancy.title}`}>
                        <Button>
                          Откликнуться
                        </Button>
                      </a>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Опубликовано: {new Date(vacancy.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* External Link */}
        <Card className="border-0 shadow-md mt-8">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gov-primary/10 flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <h3 className="font-semibold">Портал вакансий Казахстана</h3>
                  <p className="text-sm text-muted-foreground">
                    Найдите больше вакансий на официальном портале
                  </p>
                </div>
              </div>
              <a href="https://enbek.kz" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  enbek.kz
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
