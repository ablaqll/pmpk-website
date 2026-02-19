import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { AnimatedHeroBackground } from '@/components/AnimatedHeroBackground';

const SiteVacancies = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 flex flex-col justify-center min-h-[200px]">
        <AnimatedHeroBackground />
        <div className="container relative z-10 flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-[#c9a227]" />
            {t('vacancies.title')}
          </h1>
        </div>
      </section>

      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 sm:p-12 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mb-6">
                <Briefcase className="h-10 w-10 text-[#1e3a5f]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                Опубликованные вакансии можете посмотреть здесь
              </h2>

              <a
                href="https://enbek.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#c9a227] hover:bg-[#b08d22] text-white rounded-xl px-8 h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Перейти на enbek.kz
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SiteVacancies;
