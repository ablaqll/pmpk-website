import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ExternalLink, File } from "lucide-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedHeroBackground } from "@/components/AnimatedHeroBackground";

const CATEGORY_ICONS: Record<string, string> = {
  charter: "📜",
  attestation: "🏆",
  budget: "💰",
  report: "📊",
  order: "📋",
  laws: "⚖️",
  other: "📁",
};

export default function SiteDocuments() {
  const clientSlug = "pmpk9";
  const { t } = useLanguage();

  const mockClient = { id: '1', slug: 'pmpk9', name: 'ПМПК №9' };
  const client = mockClient;
  const documents: any[] = [
    {
      id: 'doc-1',
      title: 'Конституция РК',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9A%D0%BE%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%86%D0%B8%D1%8F%20%D0%A0%D0%9A.pdf',
      createdAt: new Date().toISOString()
    },
    {
      id: 'doc-2',
      title: 'Трудовой кодекс Республики Казахстан',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%A2%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD.pdf',
      createdAt: new Date().toISOString()
    },
    {
      id: 'doc-3',
      title: 'Бюджетный кодекс Республики Казахстан',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%91%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD.pdf',
      createdAt: new Date().toISOString()
    },
    {
      id: 'doc-4',
      title: 'ГОСО всех уровней образования',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%93%D0%9E%D0%A1%D0%9E%20%D0%B2%D1%81%D0%B5%D1%85%20%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B5%D0%B9%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.pdf',
      createdAt: new Date().toISOString()
    },
    {
      id: 'doc-5',
      title: 'Закон Об образовании РК',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%A0%D0%9A%20%D0%9E%D0%B1%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B8.pdf',
      createdAt: new Date().toISOString()
    },
    {
      id: 'doc-6',
      title: 'Закон О статусе педагога',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%9E%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B5%20%D0%BF%D0%B5%D0%B4%D0%B0%D0%B3%D0%BE%D0%B3%D0%B0.pdf',
      createdAt: new Date().toISOString()
    }
  ];
  const isLoading = false;

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

  const getCategoryLabel = (cat: string) => {
    return t(`doc.${cat}`) || t('doc.other');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 flex flex-col justify-center min-h-[200px]">
        <AnimatedHeroBackground />
        <div className="container relative z-10 flex flex-col h-full items-start">
          <h1 className="text-3xl lg:text-4xl font-bold flex items-center gap-3 my-0">
            <FileText className="h-8 w-8 text-[#c9a227]" />
            {t('docs.title')}
          </h1>
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
              <h3 className="text-xl font-medium mb-2">{t('docs.noDocs')}</h3>
              <p className="text-muted-foreground">
                {t('docs.soon')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {(Object.entries(groupedDocs) as [string, any[]][]).map(([category, docs]) => (
              <Card key={category} className="border-0 shadow-md">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">{CATEGORY_ICONS[category] || "📁"}</span>
                    {getCategoryLabel(category)}
                    <Badge variant="secondary" className="ml-2">
                      {docs.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="divide-y">
                    {docs.map((doc: any) => (
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
                              {t('docs.open')}
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
                  <p className="font-medium">{t('docs.laws')}</p>
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
                  <p className="font-medium">{t('docs.egov')}</p>
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
