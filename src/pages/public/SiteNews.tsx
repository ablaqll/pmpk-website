import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Newspaper, Calendar } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteNews() {
  const params = useParams<{ clientSlug: string }>();
  const clientSlug = params.clientSlug;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { t } = useLanguage();
  
  const { data: client } = trpc.clients.getBySlug.useQuery(
    { slug: clientSlug! },
    { enabled: !!clientSlug }
  );
  
  const { data: news, isLoading } = trpc.news.listPublished.useQuery(
    { 
      clientId: client?.id!,
      category: activeCategory !== 'all' ? activeCategory as any : undefined
    },
    { enabled: !!client?.id }
  );

  const basePath = `/site/${clientSlug}`;

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'news': return t('news.title');
      case 'press_release': return t('news.press');
      case 'announcement': return t('news.announcements');
      default: return category;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-6 sm:py-8">
        <div className="container">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
            <Newspaper className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
            {t('news.title')}
          </h1>
          <p className="text-white/80 mt-2 text-xs sm:text-sm lg:text-base">
            {t('news.desc')}
          </p>
        </div>
      </section>

      <div className="container py-4 sm:py-6 lg:py-8">
        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6 sm:mb-8">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm">{t('news.all')}</TabsTrigger>
            <TabsTrigger value="news" className="text-xs sm:text-sm">{t('news.title')}</TabsTrigger>
            <TabsTrigger value="press_release" className="text-xs sm:text-sm">{t('news.press')}</TabsTrigger>
            <TabsTrigger value="announcement" className="text-xs sm:text-sm">{t('news.announcements')}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </div>
        ) : news?.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="py-16 text-center">
              <Newspaper className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">{t('news.noData')}</h3>
              <p className="text-muted-foreground">
                {t('news.noDataDesc')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {news?.map((item) => (
              <Link key={item.id} href={`${basePath}/news/${item.id}`}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer h-full group">
                  {item.imageUrl && (
                    <div className="h-40 sm:h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={item.imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2 p-3 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(item.category)}
                      </Badge>
                    </div>
                    <CardTitle className="text-base sm:text-lg line-clamp-2 group-hover:text-gov-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      {new Date(item.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
