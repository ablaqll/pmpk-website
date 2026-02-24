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
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9A%D0%BE%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%86%D0%B8%D1%8F%20%D0%A0%D0%9A.pdf'
    },
    {
      id: 'doc-2',
      title: 'Трудовой кодекс Республики Казахстан',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%A2%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD.pdf'
    },
    {
      id: 'doc-3',
      title: 'Бюджетный кодекс Республики Казахстан',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%91%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD.pdf'
    },
    {
      id: 'doc-4',
      title: 'ГОСО всех уровней образования',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%93%D0%9E%D0%A1%D0%9E%20%D0%B2%D1%81%D0%B5%D1%85%20%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B5%D0%B9%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.pdf'
    },
    {
      id: 'doc-5',
      title: 'Дорожная карта по совершенствованию оказания комплексной помощи ДОВ в РК на 2021-2023 годы',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%94%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%B0%D1%8F%20%D0%BA%D0%B0%D1%80%D1%82%D0%B0%20%D0%BF%D0%BE%20%D1%81%D0%BE%D0%B2%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D1%81%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8E%20%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81%D0%BD%D0%BE%D0%B9%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%B8%20%D0%94%D0%9E%D0%92%20%D0%B2%20%D0%A0%D0%9A%20%D0%BD%D0%B0%202021-2023%20%D0%B3%D0%BE%D0%B4%D1%8B.pdf'
    },
    {
      id: 'doc-6',
      title: 'Закон О внесении изменений и дополнений в некоторые законодательные акты Республики Казахстан по вопросам улучшения качества жизни лиц с инвалидностью',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%9E%20%D0%B2%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B8%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B2%20%D0%BD%D0%B5%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%B0%D0%BA%D1%82%D1%8B%20%D0%A0%D0%9A%20%D0%BF%D0%BE%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0%D0%BC%20%D1%83%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%D0%B0%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B0%20%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8%20%D0%BB%D0%B8%D1%86%20%D1%81%20%D0%B8%D0%BD.pdf'
    },
    {
      id: 'doc-7',
      title: 'Закон О правах ребенка в Республике Казахстан',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%9E%20%D0%BF%D1%80%D0%B0%D0%B2%D0%B0%D1%85%20%D1%80%D0%B5%D0%B1%D0%B5%D0%BD%D0%BA%D0%B0%20%D0%B2%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B5%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD.pdf'
    },
    {
      id: 'doc-8',
      title: 'Закон О противодействии коррупции',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%9E%20%D0%BF%D1%80%D0%BE%D1%82%D0%B8%D0%B2%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D0%B8%20%D0%BA%D0%BE%D1%80%D1%80%D1%83%D0%BF%D1%86%D0%B8%D0%B8.pdf'
    },
    {
      id: 'doc-9',
      title: 'Закон О статусе педагога',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%9E%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B5%20%D0%BF%D0%B5%D0%B4%D0%B0%D0%B3%D0%BE%D0%B3%D0%B0.pdf'
    },
    {
      id: 'doc-10',
      title: 'Закон О языках в Республике Казахстан',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%9E%20%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0%D1%85%20%D0%B2%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B5%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD.pdf'
    },
    {
      id: 'doc-11',
      title: 'Закон РК О внесении изменений и дополнений в некоторые законодательные акты РК по вопросам инклюзивного образования',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%A0%D0%9A%20%D0%9E%20%D0%B2%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B8%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B2%20%D0%BD%D0%B5%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%B0%D0%BA%D1%82%D1%8B%20%D0%A0%D0%9A%20%D0%BF%D0%BE%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0%D0%BC%20%D0%B8%D0%BD%D0%BA%D0%BB%D1%8E%D0%B7%D0%B8%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.pdf'
    },
    {
      id: 'doc-12',
      title: 'Закон РК О внесении изменений и дополнений в some законодательные акты Республики Казахстан по вопросам образования',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%A0%D0%9A%20%D0%9E%20%D0%B2%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B8%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B2%20%D0%BD%D0%B5%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%B0%D0%BA%D1%82%D1%8B%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD%20%D0%BF%D0%BE%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.pdf'
    },
    {
      id: 'doc-13',
      title: 'Закон РК Об образовании',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%A0%D0%9A%20%D0%9E%20%D0%B1%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B8.pdf'
    },
    {
      id: 'doc-14',
      title: 'Закон о социальной и медико-педагогической коррекционной поддержке ДОВ',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD%20%D0%BE%20%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D0%B8%20%D0%BC%D0%B5%D0%B4%D0%B8%D0%BA%D0%BE-%D0%BF%D0%B5%D0%B4%D0%B0%D0%B3%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9%20%D0%BA%D0%BE%D1%80%D1%80%D0%B5%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9%20%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B5%20%D0%94%D0%9E%D0%92.pdf'
    },
    {
      id: 'doc-15',
      title: 'Кодекс РК О браке (супружестве) и семье',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9A%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%A0%D0%9A%20%D0%9E%20%D0%B1%D1%80%D0%B0%D0%BA%D0%B5%20%28%D1%81%D1%83%D0%BF%D1%80%D1%83%D0%B6%D0%B5%D1%81%D1%82%D0%B2%D0%B5%29%20%D0%B8%20%D1%81%D0%B5%D0%BC%D1%8C%D0%B5.pdf'
    },
    {
      id: 'doc-16',
      title: 'Модель развития дошкольного воспитания и обучения',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9C%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20%D0%B4%D0%BE%D1%88%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%B2%D0%BE%D1%81%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F.pdf'
    },
    {
      id: 'doc-17',
      title: 'О внесении изменений в приказ Министра образования и науки Республики Казахстан от 20 декабря 2012 года № 557',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9E%20%D0%B2%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B2%20%D0%BF%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%D0%9C%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B8%20%D0%BD%D0%B0%D1%83%D0%BA%D0%B8%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD%20%D0%BE%D1%82%2020%20%D0%B4%D0%B5%D0%BA%D0%B0%D0%B1%D1%80%D1%8F%202012%20%D0%B3%D0%BE%D0%B4%D0%B0%20%E2%84%96%20557.pdf'
    },
    {
      id: 'doc-18',
      title: 'О внесении изменений и дополнений в некоторые законодательные акты Республики Казахстан по вопросам инклюзивного образования (вторая ссылка)',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9E%20%D0%B2%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B8%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%B2%20%D0%BD%D0%B5%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%B0%D0%BA%D1%82%D1%8B%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD%20%D0%BF%D0%BE%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0%D0%BC%20%D0%B8%D0%BD%D0%BA%D0%BB%D1%8E%D0%B7%D0%B8%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.pdf'
    },
    {
      id: 'doc-19',
      title: 'О мерах по реализации законов Республики Казахстан от 27 декабря 2019 года О статусе педагога',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9E%20%D0%BC%D0%B5%D1%80%D0%B0%D1%85%20%D0%BF%D0%BE%20%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%B2%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD%20%D0%BE%D1%82%2027%20%D0%B4%D0%B5%D0%BA%D0%B0%D0%B1%D1%80%D1%8F%202019%20%D0%B3%D0%BE%D0%B4%D0%B0%20%D0%9E%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B5%20%D0%BF%D0%B5%D0%B4%D0%B0%D0%B3%D0%BE%D0%B3%D0%B0.pdf'
    },
    {
      id: 'doc-20',
      title: 'Об утверждении Национального плана по обеспечению прав и улучшению качества жизни лиц с инвалидностью в Республике Казахстан до 2025 года',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9E%D0%B1%20%D1%83%D1%82%D0%B2%D0%B5%D1%80%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%9D%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BF%D0%BB%D0%B0%D0%BD%D0%B0%20%D0%BF%D0%BE%20%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%BF%D1%80%D0%B0%D0%B2%20%D0%B8%20%D1%83%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%BA%D0%B0%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B0%20%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8%20%D0%BB%D0%B8%D1%86%20%D1%81%20%D0%B8%D0%BD%D0%B2%D0%B0%D0%BB%D0%B8%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D1%8C%D1%8E%20%D0%B2%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B5%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD%20%D0%B4%D0%BE%202025%20%D0%B3%D0%BE%D0%B4%D0%B0.pdf'
    },
    {
      id: 'doc-21',
      title: 'Об утверждении Типовых квалификационных характеристик должностей педагогов',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/LegislativeBasicsKZ/ru/%D0%9E%D0%B1%20%D1%83%D1%82%D0%B2%D0%B5%D1%80%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%A2%D0%B8%D0%BF%D0%BE%D0%B2%D1%8B%D1%85%20%D0%BA%D0%B2%D0%B0%D0%BB%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D1%85%20%D1%85%D0%B0%D1%80%D0%B0%D0%BA%D1%82%D0%B5%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%BA%20%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9%20%D0%BF%D0%B5%D0%B4%D0%B0%D0%B3%D0%BE%D0%B3%D0%BE%D0%B2.pdf'
    },
    {
      id: 'doc-22',
      title: 'Постановление Правительства Республики Казахстан от 28 марта 2023 года № 249.Об утверждении Концепции развития дошкольного, среднего, технического и профессионального образования Республики Казахстан на 2023 – 2029 годы',
      category: 'laws',
      fileUrl: 'https://special-edu.kz/EDU_LFSI/ByLaws/ru/%D0%9A%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D1%8F%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20%D0%B4%D0%BE%D1%88%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE,%20%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%B5%D0%B3%D0%BE,%20%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%20%D0%B8%20%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%81%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD%20%D0%BD%D0%B0%202023%20%E2%80%93%202029%20%D0%B3%D0%BE%D0%B4%D1%8B.docx'
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
                                  {doc.mimeType && <span>•</span>}
                                  <span>{formatFileSize(doc.fileSize)}</span>
                                </>
                              )}
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
