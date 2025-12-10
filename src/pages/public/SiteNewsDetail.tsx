import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteNewsDetail() {
  const params = useParams<{ clientSlug: string; id: string }>();
  const clientSlug = params.clientSlug || "pmpk9";
  const newsId = parseInt(params.id!);
  const { t, language } = useLanguage();
  
  const { data: newsItem, isLoading } = trpc.news.getById.useQuery(
    { id: newsId },
    { enabled: !!newsId }
  );

  const basePath = clientSlug ? `/site/${clientSlug}` : '';

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'news': return t('news.title');
      case 'press_release': return t('news.press');
      case 'announcement': return t('news.announcements');
      default: return category;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('newsDetail.linkCopied'));
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">{t('newsDetail.notFound')}</h1>
        <p className="text-muted-foreground mb-6">
          {t('newsDetail.notFoundDesc')}
        </p>
        <Link href={`${basePath}/news`}>
          <Button>{t('newsDetail.backToNews')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="container py-8">
      {/* Back Button */}
      <Link href={`${basePath}/news`}>
        <Button variant="ghost" className="mb-6 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('newsDetail.backToNews')}
        </Button>
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline">
            {getCategoryLabel(newsItem.category)}
          </Badge>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gov-primary mb-4">
          {newsItem.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(newsItem.createdAt).toLocaleDateString(
              language === 'kz' ? 'kk-KZ' : language === 'ru' ? 'ru-RU' : 'en-US',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            {t('newsDetail.share')}
          </Button>
        </div>
      </header>

      {/* Featured Image */}
      {newsItem.imageUrl && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={newsItem.imageUrl} 
            alt={newsItem.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {newsItem.content.split('\n').map((paragraph, index) => (
          paragraph.trim() && (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          )
        ))}
      </div>

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between">
          <Link href={`${basePath}/news`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('newsDetail.allNews')}
            </Button>
          </Link>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            {t('newsDetail.share')}
          </Button>
        </div>
      </div>
    </article>
  );
}
