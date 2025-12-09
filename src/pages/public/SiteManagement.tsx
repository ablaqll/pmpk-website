import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, Shield, FileText, DollarSign, 
  Scale, Users, Building2, AlertTriangle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Management sections
const MANAGEMENT_SECTIONS = [
  {
    icon: DollarSign,
    titleKz: "Бюджет",
    titleRu: "Бюджет",
    titleEn: "Budget",
    descKz: "Бюджеттік қаражатты жоспарлау және пайдалану туралы ақпарат",
    descRu: "Информация о планировании и использовании бюджетных средств",
    descEn: "Information on budget planning and utilization",
    links: [
      { name: "Бюджетті орындау / Исполнение бюджета", url: "#" },
      { name: "Қаржылық есептілік / Финансовая отчётность", url: "#" },
    ]
  },
  {
    icon: FileText,
    titleKz: "Мемлекеттік сатып алулар",
    titleRu: "Государственные закупки",
    titleEn: "Public Procurement",
    descKz: "Мемлекеттік сатып алулар жоспары және нәтижелері",
    descRu: "План государственных закупок и результаты",
    descEn: "Public procurement plan and results",
    links: [
      { name: "Сатып алулар жоспары / План закупок", url: "https://goszakup.gov.kz" },
      { name: "Жасалған шарттар / Заключённые договоры", url: "#" },
    ]
  },
  {
    icon: Shield,
    titleKz: "Сыбайлас жемқорлыққа қарсы іс-қимыл",
    titleRu: "Противодействие коррупции",
    titleEn: "Anti-Corruption",
    descKz: "Сыбайлас жемқорлықтың алдын алу шаралары",
    descRu: "Меры по предотвращению коррупции",
    descEn: "Anti-corruption measures",
    links: [
      { name: "Сыбайлас жемқорлыққа қарсы стандарт / Антикоррупционный стандарт", url: "#" },
      { name: "Мүдделер қақтығысы / Конфликт интересов", url: "#" },
      { name: "Сенім телефоны / Телефон доверия", url: "#" },
    ]
  },
  {
    icon: Scale,
    titleKz: "Құқықтық ақпарат",
    titleRu: "Правовая информация",
    titleEn: "Legal Information",
    descKz: "Нормативтік-құқықтық актілер және заңнама",
    descRu: "Нормативно-правовые акты и законодательство",
    descEn: "Regulatory acts and legislation",
    links: [
      { name: "ҚР НҚА / НПА РК", url: "https://adilet.zan.kz" },
      { name: "Ішкі құжаттар / Внутренние документы", url: "#" },
    ]
  },
];

// External government portals
const GOV_PORTALS = [
  { 
    nameKz: "Электрондық үкімет", 
    nameRu: "Электронное правительство", 
    nameEn: "E-Government",
    url: "https://egov.kz", 
    icon: Building2 
  },
  { 
    nameKz: "Ашық үкімет", 
    nameRu: "Открытое правительство", 
    nameEn: "Open Government",
    url: "https://open.gov.kz", 
    icon: Users 
  },
  { 
    nameKz: "Заңнама базасы", 
    nameRu: "База законодательства", 
    nameEn: "Legislation Database",
    url: "https://adilet.zan.kz", 
    icon: Scale 
  },
  { 
    nameKz: "Мемлекеттік сатып алулар", 
    nameRu: "Госзакупки", 
    nameEn: "Public Procurement",
    url: "https://goszakup.gov.kz", 
    icon: FileText 
  },
];

export default function SiteManagement() {
  const { language, t } = useLanguage();

  const pageTitle = language === 'kz' 
    ? 'Мемлекеттік басқару' 
    : language === 'ru' 
    ? 'Государственное управление' 
    : 'State Management';

  return (
    <div className="py-8">
      <div className="container">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gov-primary mb-2">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {language === 'kz' 
              ? 'Мемлекеттік басқару және ашықтық туралы ақпарат'
              : language === 'ru'
              ? 'Информация о государственном управлении и открытости'
              : 'Information about state management and transparency'}
          </p>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {MANAGEMENT_SECTIONS.map((section, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gov-primary/10 flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-gov-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    {language === 'kz' ? section.titleKz : language === 'ru' ? section.titleRu : section.titleEn}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'kz' ? section.descKz : language === 'ru' ? section.descRu : section.descEn}
                </p>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm text-gov-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {link.name}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Anti-Corruption Notice */}
        <Card className="border-0 shadow-md bg-amber-50 mb-8">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">
                  {language === 'kz' 
                    ? 'Сыбайлас жемқорлық туралы хабарлау'
                    : language === 'ru'
                    ? 'Сообщить о коррупции'
                    : 'Report Corruption'}
                </h3>
                <p className="text-sm text-amber-700 mb-3">
                  {language === 'kz'
                    ? 'Егер сіз сыбайлас жемқорлық фактілерін байқасаңыз, сенім телефонына хабарлаңыз немесе жазбаша өтініш жіберіңіз.'
                    : language === 'ru'
                    ? 'Если вы стали свидетелем коррупционных действий, сообщите на телефон доверия или направьте письменное обращение.'
                    : 'If you witness corruption, report it via the trust phone or submit a written complaint.'}
                </p>
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                  {language === 'kz' ? 'Хабарлау' : language === 'ru' ? 'Сообщить' : 'Report'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Government Portals */}
        <div>
          <h2 className="text-xl font-bold text-gov-primary mb-4">
            {language === 'kz' 
              ? 'Мемлекеттік порталдар'
              : language === 'ru'
              ? 'Государственные порталы'
              : 'Government Portals'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GOV_PORTALS.map((portal, index) => (
              <a
                key={index}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border bg-white hover:bg-muted/50 transition-colors group"
              >
                <div className="h-10 w-10 rounded-lg bg-gov-primary/10 flex items-center justify-center group-hover:bg-gov-primary/20 transition-colors">
                  <portal.icon className="h-5 w-5 text-gov-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {language === 'kz' ? portal.nameKz : language === 'ru' ? portal.nameRu : portal.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{portal.url.replace('https://', '')}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
