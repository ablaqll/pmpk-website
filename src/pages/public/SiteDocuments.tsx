import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { FileText, Download, ExternalLink, File } from "lucide-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORY_LABELS: Record<string, string> = {
  charter: "Устав",
  attestation: "Аттестация",
  budget: "Бюджет",
  report: "Отчеты",
  order: "Приказы",
  other: "Прочее",
};

const CATEGORY_ICONS: Record<string, string> = {
  charter: "📜",
  attestation: "🏆",
  budget: "💰",
  report: "📊",
  order: "📋",
  other: "📁",
};

export default function SiteDocuments() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  
  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );
  
  const { data: documents, isLoading } = trpc.documents.listPublished.useQuery(
    { clientId: client?.id! },
    { enabled: !!client?.id }
  );

  // Group documents by category
  const groupedDocs = documents?.reduce((acc, doc) => {
    const cat = doc.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>) || {};

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <FileText className="h-8 w-8" />
            Документы
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            Нормативные документы, устав, отчеты и другие официальные материалы
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
        ) : Object.keys(groupedDocs).length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="py-16 text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">Документы не найдены</h3>
              <p className="text-muted-foreground">
                Документы будут добавлены в ближайшее время
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedDocs).map(([category, docs]) => (
              <Card key={category} className="border-0 shadow-md">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">{CATEGORY_ICONS[category] || "📁"}</span>
                    {CATEGORY_LABELS[category] || category}
                    <Badge variant="secondary" className="ml-2">
                      {docs.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="divide-y">
                    {docs.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-lg bg-gov-primary/10 flex items-center justify-center shrink-0">
                            <File className="h-5 w-5 text-gov-primary" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium truncate">{doc.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {doc.mimeType && (
                                <span className="uppercase">
                                  {doc.mimeType.split('/').pop()}
                                </span>
                              )}
                              {doc.fileSize && (
                                <>
                                  <span>•</span>
                                  <span>{formatFileSize(doc.fileSize)}</span>
                                </>
                              )}
                              <span>•</span>
                              <span>
                                {new Date(doc.createdAt).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Открыть
                            </Button>
                          </a>
                          <a href={doc.fileUrl} download>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* External Links */}
        <Card className="border-0 shadow-md mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Полезные ссылки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://adilet.zan.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <span className="text-2xl">⚖️</span>
                <div>
                  <p className="font-medium">Законодательство РК</p>
                  <p className="text-sm text-muted-foreground">adilet.zan.kz</p>
                </div>
              </a>
              <a 
                href="https://egov.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <span className="text-2xl">🏛️</span>
                <div>
                  <p className="font-medium">Электронное правительство</p>
                  <p className="text-sm text-muted-foreground">egov.kz</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
