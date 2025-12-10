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
    titleKey: "state.budget",
    descKey: "state.desc", // Simplified description key for now or add specific
    links: [
      { nameKey: "state.budget", url: "#" }, // Using existing keys for link names roughly
    ]
  },
  {
    icon: FileText,
    titleKey: "state.procurement",
    descKey: "state.desc",
    links: [
      { nameKey: "state.procurement", url: "https://goszakup.gov.kz" },
    ]
  },
  {
    icon: Shield,
    titleKey: "state.anticorruption",
    descKey: "state.desc",
    links: [
      { nameKey: "state.anticorruption", url: "#" },
    ]
  },
  {
    icon: Scale,
    titleKey: "state.legal",
    descKey: "state.desc",
    links: [
      { nameKey: "docs.title", url: "https://adilet.zan.kz" },
    ]
  },
];

// External government portals
const GOV_PORTALS = [
  { 
    nameKey: "docs.egov", 
    url: "https://egov.kz", 
    icon: Building2 
  },
  { 
    nameKey: "state.title", // Open Gov
    url: "https://open.gov.kz", 
    icon: Users 
  },
  { 
    nameKey: "docs.laws", 
    url: "https://adilet.zan.kz", 
    icon: Scale 
  },
  { 
    nameKey: "state.procurement", 
    url: "https://goszakup.gov.kz", 
    icon: FileText 
  },
];

export default function SiteManagement() {
  const { t } = useLanguage();

  return (
    <div className="py-8">
      <div className="container">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gov-primary mb-2">{t('state.title')}</h1>
          <p className="text-muted-foreground">
            {t('state.desc')}
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
                    {t(section.titleKey)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(section.descKey)}
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
                      {t(link.nameKey)}
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
                  {t('state.anticorruption')}
                </h3>
                <p className="text-sm text-amber-700 mb-3">
                  {t('state.desc')}
                </p>
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                  {t('feedback.sendRequest')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Government Portals */}
        <div>
          <h2 className="text-xl font-bold text-gov-primary mb-4">
            {t('state.services')}
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
                    {t(portal.nameKey)}
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
