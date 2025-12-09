import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { 
  ArrowRight, Building2, Globe, Zap, Sparkles, Palette, Smartphone, 
  MessageCircle, BarChart3, Clock, Brain, CheckCircle2, Rocket, 
  Shield, Users, Instagram, ExternalLink, ChevronRight, Bot, 
  LineChart, Megaphone, Settings, Phone, Menu, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen liquid-bg particles-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src="/aql-logo.png" alt="AQL Lab" className="h-10 w-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                AQL Lab
              </span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">Студия внедрения ИИ</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">О нас</a>
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Услуги</a>
              <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Портфолио</a>
            </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-xl glass hover:scale-105 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-purple-600" /> : <Menu className="h-6 w-6 text-purple-600" />}
          </button>
          
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-9 w-24 bg-gray-100 animate-pulse rounded-lg" />
            ) : user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">{user.name}</span>
                {(user.role === 'super_admin' || user.role === 'admin') && (
                  <Link href="/super-admin">
                    <Button className="glass-button text-white ripple">
                      Панель управления
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                variant="outline"
                className="glass hover:scale-105 transition-all border-purple-200/50"
              >
                Войти
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t glass">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col gap-3">
                <a 
                  href="#about" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  О нас
                </a>
                <a 
                  href="#services" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Услуги
                </a>
                <a 
                  href="#portfolio" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Портфолио
                </a>
              </nav>
              <div className="pt-3 border-t">
                {loading ? (
                  <div className="h-9 w-full bg-gray-100 animate-pulse rounded-lg" />
                ) : user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                    {(user.role === 'super_admin' || user.role === 'admin') && (
                      <Link href="/super-admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition-all">
                          Панель управления
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <Button 
                    onClick={() => window.location.href = getLoginUrl()}
                    variant="outline"
                    className="w-full border-purple-200 hover:bg-purple-50"
                  >
                    Войти
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden wave-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-orange-100/50" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-purple-700 text-sm font-medium mb-8 shimmer">
              <Sparkles className="h-4 w-4 icon-pulse" />
              <span>Создаём сайты за 1 день с помощью ИИ</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent glow-text">
                Современные сайты
              </span>
              <br />
              <span className="text-gray-900">за 50 000 ₸</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              AQL Lab — студия внедрения искусственного интеллекта. 
              Мы создаём современные, адаптивные сайты всего за 1 день — быстро, стильно и с умом.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://www.instagram.com/aqllab" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="glass-button text-white ripple h-14 px-8 text-lg glow-box">
                  <Instagram className="mr-2 h-5 w-5" />
                  Написать в Instagram
                </Button>
              </a>
              <Link href="/site/pmpk9">
                <Button size="lg" variant="outline" className="glass h-14 px-8 text-lg hover:scale-105 transition-all">
                  Посмотреть пример
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  О нас
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                AQL Lab — это студия внедрения искусственного интеллекта, которая специализируется 
                на создании современных веб-сайтов и цифровых решений для бизнеса.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Мы используем передовые технологии и нейросети для генерации контента, 
                дизайна и автоматизации бизнес-процессов. Наша миссия — сделать 
                современные технологии доступными для каждого бизнеса.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center glass-card p-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">50+</p>
                  <p className="text-sm text-muted-foreground">Проектов</p>
                </div>
                <div className="text-center glass-card p-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">24ч</p>
                  <p className="text-sm text-muted-foreground">Срок сдачи</p>
                </div>
                <div className="text-center glass-card p-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">100%</p>
                  <p className="text-sm text-muted-foreground">Гарантия</p>
                </div>
              </div>
            </div>
            <div className="relative fade-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-3xl blur-3xl opacity-30" />
              <div className="relative glass-card p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-6 icon-float cursor-pointer group">
                    <Brain className="h-10 w-10 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">ИИ технологии</p>
                  </div>
                  <div className="glass rounded-xl p-6 icon-float cursor-pointer group">
                    <Rocket className="h-10 w-10 text-pink-500 mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">Быстрый запуск</p>
                  </div>
                  <div className="glass rounded-xl p-6 icon-float cursor-pointer group">
                    <Shield className="h-10 w-10 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">Надёжность</p>
                  </div>
                  <div className="glass rounded-xl p-6 icon-float cursor-pointer group">
                    <Users className="h-10 w-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">Поддержка</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Что вы получаете</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Полный комплект для запуска вашего бизнеса в интернете
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Полноценный сайт",
                description: "Лендинг, визитка или каталог под ваш бизнес",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Sparkles,
                title: "Уникальный контент",
                description: "Тексты, созданные искусственным интеллектом",
                color: "from-pink-500 to-pink-600"
              },
              {
                icon: Palette,
                title: "Фирменный дизайн",
                description: "В цветах и стиле вашей ниши",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Smartphone,
                title: "Адаптивность",
                description: "Идеально на телефонах, планшетах и ПК",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: MessageCircle,
                title: "Интеграции",
                description: "Подключение WhatsApp, Instagram, Telegram",
                color: "from-green-500 to-green-600"
              },
              {
                icon: BarChart3,
                title: "SEO и аналитика",
                description: "Базовая SEO-настройка и Google Analytics",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 group scale-in" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 leading-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Мы используем передовые технологии для создания сайтов
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Скорость",
                description: "Сайт готов за 24 часа"
              },
              {
                icon: Brain,
                title: "Нейросети",
                description: "Используем ИИ для контента и визуала"
              },
              {
                icon: Rocket,
                title: "Онлайн",
                description: "Работаем без лишней бюрократии"
              },
              {
                icon: CheckCircle2,
                title: "Фиксированная цена",
                description: "Всего 50 000 ₸ без скрытых платежей"
              },
              {
                icon: Users,
                title: "Опытная команда",
                description: "Специалисты AQL Lab"
              },
              {
                icon: Shield,
                title: "Гарантия",
                description: "Поддержка после запуска"
              }
            ].map((item, index) => (
              <div key={index} className="glass-card flex flex-col items-center text-center p-8 group scale-in" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="w-16 h-24 rounded-2xl glass flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-translate-y-2 transition-all">
                  <item.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Дополнительные услуги</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Расширьте возможности вашего бизнеса
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Megaphone,
                title: "Настройка рекламы",
                description: "Instagram и Google Ads для привлечения клиентов"
              },
              {
                icon: Bot,
                title: "Чат-боты и CRM",
                description: "Автоматизация общения с клиентами"
              },
              {
                icon: LineChart,
                title: "Автоворонки",
                description: "Лендинги под ключ с воронками продаж"
              }
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Портфолио
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наши реализованные проекты
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Focus Lab */}
            <a 
              href="https://focuslab.one" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group scale-in"
              style={{ transitionDelay: '0ms' }}
            >
              <div className="glass-card overflow-hidden h-full">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Globe className="h-12 w-12 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-bold text-xl">Focus Lab</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                    Focus Lab
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Современный сайт для бизнеса
                  </p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <span>focuslab.one</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </a>

            {/* Greed Inc */}
            <a 
              href="https://greedinc.fun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group scale-in"
              style={{ transitionDelay: '100ms' }}
            >
              <div className="glass-card overflow-hidden h-full">
                <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Globe className="h-12 w-12 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-bold text-xl">Greed Inc</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                    Greed Inc
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Креативный проект
                  </p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <span>greedinc.fun</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </a>

            {/* PMPK 9 */}
            <Link href="/site/pmpk9" className="group scale-in" style={{ transitionDelay: '200ms' }}>
              <div className="glass-card overflow-hidden h-full">
                <div className="aspect-video bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8a] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Building2 className="h-12 w-12 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-bold text-xl">ПМПК №9</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                    ПМПК №9 г. Астана
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Государственный сайт организации
                  </p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <span>Посмотреть</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Personal Cabinet Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Личный кабинет
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Управляйте своим сайтом и контентом
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="h-32 w-64 bg-gray-100 animate-pulse rounded-2xl" />
            </div>
          ) : user ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {(user.role === 'super_admin' || user.role === 'admin') && (
                <Link href="/super-admin">
                  <div className="glass-card p-6 text-center cursor-pointer group h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Супер-админ панель</h3>
                    <p className="text-muted-foreground text-sm mb-4">Управление всеми клиентами и пользователями</p>
                    <Button variant="ghost" className="text-purple-600 glass">
                      Открыть <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              )}
              
              <Link href="/admin/pmpk9">
                <div className="glass-card p-6 text-center cursor-pointer group h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Админ-панель</h3>
                  <p className="text-muted-foreground text-sm mb-4">Управление контентом сайта</p>
                  <Button variant="ghost" className="text-blue-600 glass">
                    Открыть <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              
              <Link href="/site/pmpk9">
                <div className="glass-card p-6 text-center cursor-pointer group h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Публичный сайт</h3>
                  <p className="text-muted-foreground text-sm mb-4">Просмотр сайта ПМПК №9</p>
                  <Button variant="ghost" className="text-green-600 glass">
                    Открыть <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center">
              <div className="glass-card p-12">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Войдите в систему</h3>
                <p className="text-muted-foreground mb-6">
                  Для доступа к админ-панели и управлению сайтом
                </p>
                <Button 
                  onClick={() => window.location.href = getLoginUrl()}
                  className="glass-button text-white ripple"
                >
                  Войти в личный кабинет
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="container text-center relative z-10">
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Готовы создать свой сайт?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
              Работаем по всему Казахстану и СНГ. Пишите прямо сейчас — покажем примеры наших сайтов и создадим ваш за 1 день!
            </p>
            <a href="https://www.instagram.com/aqllab" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-14 px-8 text-lg glass text-white hover:bg-white/20 shadow-xl ripple">
                <Instagram className="mr-2 h-5 w-5" />
                Написать в Instagram
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                {/* Black Logo SVG */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <rect width="48" height="48" rx="12" fill="#1a1a1a"/>
                  <path d="M14 32L24 16L34 32H14Z" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="24" cy="26" r="4" fill="white"/>
                  <path d="M20 20L24 14L28 20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <span className="font-bold text-xl text-gray-900">AQL Lab</span>
                  <p className="text-sm text-gray-500">Студия внедрения ИИ</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Создаём современные, адаптивные сайты за 1 день с помощью искусственного интеллекта. Работаем по всему Казахстану и СНГ.
              </p>
            </div>
            
            {/* Contacts */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 text-lg">Контакты</h4>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/77077099460" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  {/* WhatsApp Vector Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 group-hover:text-green-500 transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                  </svg>
                  <span className="font-medium">+7 707 709 9460</span>
                </a>
                <a 
                  href="tel:+77077099460"
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <Phone className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  <span className="font-medium">+7 707 709 9460</span>
                </a>
              </div>
            </div>
            
            {/* Social */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 text-lg">Мы в соцсетях</h4>
              <div className="flex items-center gap-4">
                {/* Instagram Vector Icon */}
                <a 
                  href="https://www.instagram.com/aqllab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300 group"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 group-hover:text-purple-600 transition-colors">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                  </svg>
                </a>
                {/* WhatsApp Vector Icon */}
                <a 
                  href="https://wa.me/77077099460" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center hover:border-green-300 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 group"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 group-hover:text-green-600 transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-500 mt-4 font-medium">
                @aqllab
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} AQL Lab. Все права защищены.
            </p>
            <p className="text-sm text-gray-400">
              Сделано с ❤️ в Казахстане
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
