
import React, { useState, useEffect } from 'react';
import SiteLayout from '@/components/SiteLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ExternalLink } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { storage, Vacancy } from '@/services/storage';

const SiteVacancies = () => {
  const { t, language } = useLanguage();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await storage.getVacancies();
        setVacancies(data.filter(v => v.published));
      } catch (err) {
        console.error("Failed to load vacancies", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const client = {
    email: 'pmpk9_ast@mail.ru' // Fallback
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <Briefcase className="h-8 w-8" />
            {t('vacancies.title')}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {t('vacancies.desc')}
          </p>
        </div>
      </section>

      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <div className="text-center py-12">{t('common.loading')}</div>
          ) : vacancies.length === 0 ? (
            <Card className="border-0 shadow-md mb-8">
              <CardContent className="py-16 text-center">
                <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-medium mb-2">{t('vacancies.noVacancies')}</h3>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 mb-12">
              {vacancies.map((vacancy) => (
                <Card key={vacancy.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-primary/5 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl md:text-2xl text-primary">{vacancy.title}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(vacancy.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {vacancy.salary && (
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-600 border border-green-200">
                          {vacancy.salary}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">{t('vacancies.requirements')}:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-6">
                      {vacancy.requirements?.split('\n').map((req, i) => (
                        req.trim() && <li key={i}>{req}</li>
                      ))}
                    </ul>

                    <a href={`mailto:${client.email}?subject=${encodeURIComponent(language === 'kz' ? `Вакансияға өтініш: ${vacancy.title}` : language === 'ru' ? `Отклик на вакансию: ${vacancy.title}` : `Application for vacancy: ${vacancy.title}`)}`}>
                      <Button>
                        {t('vacancies.apply')}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* External Link */}
          <Card className="border-0 shadow-md">
            <CardContent className="py-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gov-primary/10 flex items-center justify-center">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('vacancies.portal')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('vacancies.portalDesc')}
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
        </motion.div>
      </div>
    </>
  );
};

export default SiteVacancies;
