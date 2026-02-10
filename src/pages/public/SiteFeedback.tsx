
import React, { useState, useEffect } from 'react';
import SiteLayout from '@/components/SiteLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Send, HelpCircle, CheckCircle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { storage, FaqItem } from '@/services/storage';

const SiteFeedback = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    question: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const data = await storage.getFaq();
        setFaqs(data.filter(f => f.published));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadFaqs();
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.question) {
      toast.error(t('common.error'));
      return;
    }
    console.log("Form submitted:", formData);
    // In a real app we'd post this to an endpoint
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", question: "" });
    toast.success(t('feedback.success'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-gov-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
            <MessageSquare className="h-8 w-8" />
            {t('feedback.title')}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {t('feedback.desc')}
          </p>
        </div>
      </section>

      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Form */}
          <div>
            <Card className="border-0 shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-gov-primary" />
                  {t('feedback.sendRequest')}
                </CardTitle>
                <CardDescription>
                  {t('feedback.fillForm')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t('feedback.success')}</h3>
                    <p className="text-muted-foreground mb-6">
                      {t('feedback.successDesc')}
                    </p>
                    <Button onClick={() => setSubmitted(false)}>
                      {t('feedback.sendMore')}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('feedback.name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('feedback.name')}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('feedback.email')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@mail.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('feedback.phone')}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="question">{t('feedback.message')} *</Label>
                      <Textarea
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder=""
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gov-primary hover:bg-gov-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {t('feedback.send')}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div>
            <Card className="border-0 shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-gov-primary" />
                  {t('feedback.faq')}
                </CardTitle>
                <CardDescription>
                  {t('feedback.faqDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">{t('common.loading')}</div>
                ) : faqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left font-semibold">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 whitespace-pre-wrap">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    {t('feedback.noFaq')}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </SiteLayout>
  );
};

export default SiteFeedback;
