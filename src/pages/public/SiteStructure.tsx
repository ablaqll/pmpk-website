import { Card, CardContent } from "@/components/ui/card";
import { Users2, Mail, Phone, Building2 } from "lucide-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteStructure() {
  const clientSlug = "pmpk9";
  const { t } = useLanguage();
  
  const mockClient = { id: '1', slug: 'pmpk9', name: 'ПМПК №9' };
  const client = mockClient;
  const staff: any[] = [];
  const isLoading = false;

  // Group staff by department
  const groupedStaff = (staff || []).reduce((acc, person) => {
    const dept = person.department || t('about.director'); // Fallback to "Director/Leadership" translation
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(person);
    return acc;
  }, {} as Record<string, typeof staff>) || {};

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <Building2 className="h-8 w-8" />
            {t('structure.title')}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {t('structure.desc')}
          </p>
        </div>
      </section>

      <div className="container py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : Object.keys(groupedStaff).length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="py-16 text-center">
              <Users2 className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">{t('structure.staffInfo')}</h3>
              <p className="text-muted-foreground">
                {t('structure.noData')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedStaff).map(([department, members]) => (
              <div key={department}>
                <h2 className="text-2xl font-bold text-gov-primary mb-6 flex items-center gap-2">
                  <div className="h-8 w-1 bg-gov-gold rounded-full" />
                  {department}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((person) => (
                    <Card key={person.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          {person.photoUrl ? (
                            <img 
                              src={person.photoUrl} 
                              alt={person.name}
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <Users2 className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h3 className="font-semibold text-lg leading-tight">
                              {person.name}
                            </h3>
                            <p className="text-sm text-gov-primary font-medium mt-1">
                              {person.position}
                            </p>
                          </div>
                        </div>
                        
                        {(person.email || person.phone) && (
                          <div className="mt-4 pt-4 border-t space-y-2">
                            {person.email && (
                              <a 
                                href={`mailto:${person.email}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gov-primary transition-colors"
                              >
                                <Mail className="h-4 w-4" />
                                {person.email}
                              </a>
                            )}
                            {person.phone && (
                              <a 
                                href={`tel:${person.phone}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gov-primary transition-colors"
                              >
                                <Phone className="h-4 w-4" />
                                {person.phone}
                              </a>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
