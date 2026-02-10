import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'kz' | 'ru' | 'en';

type Translations = {
  [key: string]: {
    kz: string;
    ru: string;
    en: string;
  };
};

// Translations dictionary
export const translations: Translations = {
  // Header
  'nav.about': { kz: 'ПМПК туралы', ru: 'О ПМПК', en: 'About PMPK' },
  'nav.news': { kz: 'Жаңалықтар', ru: 'Новости', en: 'News' },
  'nav.documents': { kz: 'ҚР НҚА', ru: 'НПА РК', en: 'Legal Acts' },
  'nav.management': { kz: 'Мемлекеттік басқару', ru: 'Гос. управление', en: 'State Management' },
  'nav.feedback': { kz: 'Кері байланыс', ru: 'Обратная связь', en: 'Feedback' },
  'nav.vacancies': { kz: 'Вакансия', ru: 'Вакансии', en: 'Vacancies' },
  'nav.contacts': { kz: 'Байланыс', ru: 'Контакты', en: 'Contacts' },
  'nav.structure': { kz: 'Құрылым', ru: 'Структура', en: 'Structure' },

  // Home page
  'home.welcome': {
    kz: 'Қош келдіңіз!',
    ru: 'Добро пожаловать!',
    en: 'Welcome!'
  },
  'home.description': {
    kz: 'Психологиялық-медициналық-педагогикалық консультация',
    ru: 'Психолого-медико-педагогическая консультация',
    en: 'Psychological-Medical-Pedagogical Consultation'
  },
  'home.services': { kz: 'Қызметтер', ru: 'Услуги', en: 'Services' },
  'home.news': { kz: 'Соңғы жаңалықтар', ru: 'Последние новости', en: 'Latest News' },
  'home.allNews': { kz: 'Барлық жаңалықтар', ru: 'Все новости', en: 'All News' },
  'home.readMore': { kz: 'Толығырақ', ru: 'Подробнее', en: 'Read More' },
  'home.stateSymbols': { kz: 'Мемлекеттік рәміздер', ru: 'Государственные символы', en: 'State Symbols' },
  'home.anthem': { kz: 'Әнұран', ru: 'Гимн', en: 'Anthem' },
  'home.listenAnthem': { kz: 'Әнұранды тыңдау', ru: 'Слушать гимн', en: 'Listen to Anthem' },
  'home.openMap': { kz: 'Картаны ашу', ru: 'Открыть карту', en: 'Open Map' },
  'home.openFullMap': { kz: 'Толық картаны ашу', ru: 'Открыть полную карту', en: 'Open Full Map' },

  // About page
  'about.title': { kz: 'Біз туралы', ru: 'О нас', en: 'About Us' },
  'about.director': { kz: 'Басшы', ru: 'Руководитель', en: 'Director' },
  'about.directorBlog': { kz: 'Басшының блогы', ru: 'Блог руководителя', en: 'Director\'s Blog' },
  'about.schedule': { kz: 'Қабылдау кестесі', ru: 'График приёма', en: 'Reception Schedule' },
  'about.structure': { kz: 'Құрылым', ru: 'Структура', en: 'Structure' },
  'about.documents': { kz: 'Құжаттама', ru: 'Документация', en: 'Documentation' },
  'about.charter': { kz: 'Жарғы', ru: 'Устав', en: 'Charter' },
  'about.regulations': { kz: 'Ереже', ru: 'Положение', en: 'Regulations' },
  'about.diag': { kz: 'Диагностика', ru: 'Диагностика', en: 'Diagnostics' },
  'about.diagDesc': { kz: 'Кешенді диагностика', ru: 'Комплексная диагностика', en: 'Complex Diagnostics' },
  'about.consult': { kz: 'Кеңес беру', ru: 'Консультирование', en: 'Consulting' },
  'about.consultDesc': { kz: 'Ата-аналарға кеңес', ru: 'Консультации для родителей', en: 'Parent Consulting' },
  'about.method': { kz: 'Әдістемелік көмек', ru: 'Методическая помощь', en: 'Methodological Help' },
  'about.methodDesc': { kz: 'Педагогтарға көмек', ru: 'Помощь педагогам', en: 'Help for Educators' },
  'about.correct': { kz: 'Түзету', ru: 'Коррекция', en: 'Correction' },
  'about.correctDesc': { kz: 'Түзету сабақтары', ru: 'Коррекционные занятия', en: 'Correction Classes' },

  // News page
  'news.title': { kz: 'Жаңалықтар', ru: 'Новости', en: 'News' },
  'news.all': { kz: 'Барлығы', ru: 'Все', en: 'All' },
  'news.press': { kz: 'Баспасөз хабарламалары', ru: 'Пресс-релизы', en: 'Press Releases' },
  'news.announcements': { kz: 'Хабарландырулар', ru: 'Объявления', en: 'Announcements' },

  // Documents page
  'docs.title': { kz: 'ҚР НҚА', ru: 'НПА РК', en: 'Legal Acts of RK' },
  'docs.egov': { kz: 'Электрондық үкімет', ru: 'Электронное правительство', en: 'E-Government' },
  'docs.laws': { kz: 'Заңдар мен кодекстер', ru: 'Законы и кодексы', en: 'Laws and Codes' },
  'docs.orders': { kz: 'Бұйрықтар мен қаулылар', ru: 'Приказы и постановления', en: 'Orders and Resolutions' },

  // State management
  'state.title': { kz: 'Мемлекеттік басқару', ru: 'Государственное управление', en: 'State Management' },
  'state.legal': { kz: 'Құқықтық актілер', ru: 'Правовые акты', en: 'Legal Acts' },
  'state.budget': { kz: 'Бюджет', ru: 'Бюджет', en: 'Budget' },
  'state.procurement': { kz: 'Мемлекеттік сатып алулар', ru: 'Государственные закупки', en: 'Public Procurement' },
  'state.anticorruption': { kz: 'Сыбайлас жемқорлыққа қарсы', ru: 'Противодействие коррупции', en: 'Anti-Corruption' },
  'state.services': { kz: 'Мемлекеттік қызметтер', ru: 'Государственные услуги', en: 'State Services' },

  // Feedback page
  'feedback.title': { kz: 'Кері байланыс', ru: 'Обратная связь', en: 'Feedback' },
  'feedback.question': { kz: 'Сұрақ қою', ru: 'Задать вопрос', en: 'Ask a Question' },
  'feedback.name': { kz: 'Аты-жөні', ru: 'ФИО', en: 'Full Name' },
  'feedback.email': { kz: 'Электрондық пошта', ru: 'Электронная почта', en: 'Email' },
  'feedback.phone': { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
  'feedback.message': { kz: 'Хабарлама', ru: 'Сообщение', en: 'Message' },
  'feedback.send': { kz: 'Жіберу', ru: 'Отправить', en: 'Send' },
  'feedback.reception': { kz: 'Жеке қабылдау', ru: 'Личный приём', en: 'Personal Reception' },
  'feedback.desc': { kz: 'Өтініш қалдырыңыз, біз сізбен хабарласамыз.', ru: 'Оставьте заявку, и мы с вами свяжемся.', en: 'Leave a request and we will contact you.' },
  'feedback.sendRequest': { kz: 'Өтініш қалдыру', ru: 'Оставить заявку', en: 'Send Request' },
  'feedback.fillForm': { kz: 'Деректерді толтырыңыз', ru: 'Заполните данные', en: 'Fill in the data' },
  'feedback.placeholder': { kz: ' ', ru: ' ', en: ' ' },
  'feedback.success': { kz: 'Сәтті жіберілді', ru: 'Успешно отправлено', en: 'Successfully sent' },
  'feedback.successDesc': { kz: 'Біз сіздің өтінішіңізді алдық', ru: 'Мы получили вашу заявку', en: 'We received your request' },
  'feedback.sendMore': { kz: 'Тағы жіберу', ru: 'Отправить еще', en: 'Send more' },
  'feedback.faq': { kz: 'Жиі қойылатын сұрақтар', ru: 'Часто задаваемые вопросы', en: 'FAQ' },
  'feedback.faqDesc': { kz: 'Пайдаланушылардың сұрақтарына жауаптар', ru: 'Ответы на вопросы пользователей', en: 'Answers to user questions' },
  'feedback.noFaq': { kz: 'Сұрақтар табылмады', ru: 'Вопросы не найдены', en: 'No questions found' },

  // Vacancies page
  'vacancies.title': { kz: 'Вакансиялар', ru: 'Вакансии', en: 'Vacancies' },
  'vacancies.portal': { kz: 'Еңбек биржасы', ru: 'Вакансии', en: 'Job Portal' },
  'vacancies.requirements': { kz: 'Біліктілік талаптары', ru: 'Квалификационные требования', en: 'Qualification Requirements' },
  'vacancies.apply': { kz: 'Өтініш беру', ru: 'Подать заявку', en: 'Apply' },

  // Contacts
  'contacts.title': { kz: 'Байланыс ақпараты', ru: 'Контактная информация', en: 'Contact Information' },
  'contacts.usefulLinks': { kz: 'Пайдалы сілтемелер', ru: 'Полезные ссылки', en: 'Useful Links' },
  'contacts.writeUs': { kz: 'Бізге жазыңыз', ru: 'Написать нам', en: 'Write to us' },
  'contacts.address': { kz: 'Мекенжай', ru: 'Адрес', en: 'Address' },
  'contacts.phone': { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
  'contacts.email': { kz: 'Электрондық пошта', ru: 'Электронная почта', en: 'Email' },
  'contacts.schedule': { kz: 'Қабылдау кестесі', ru: 'График приёма', en: 'Reception Schedule' },
  'contacts.trustPhone': { kz: 'Сенім телефоны', ru: 'Телефон доверия', en: 'Trust Phone' },

  // Footer
  'footer.rights': { kz: 'Барлық құқықтар қорғалған', ru: 'Все права защищены', en: 'All rights reserved' },
  'footer.poweredBy': { kz: 'Жасаған', ru: 'Разработано', en: 'Powered by' },

  // Common
  'common.loading': { kz: 'Жүктелуде...', ru: 'Загрузка...', en: 'Loading...' },
  'common.error': { kz: 'Қате', ru: 'Ошибка', en: 'Error' },
  'common.noData': { kz: 'Деректер жоқ', ru: 'Нет данных', en: 'No data' },
  'common.city': { kz: 'Астана қ.', ru: 'г. Астана', en: 'Astana city' },

  // Missing keys
  'news.desc': { kz: 'Орталықтың соңғы жаңалықтары мен оқиғалары', ru: 'Последние новости и события центра', en: 'Latest news and events of the center' },
  'news.noDataDesc': { kz: 'Әзірге жаңалықтар жоқ', ru: 'Пока новостей нет', en: 'No news yet' },

  // News Detail
  'newsDetail.backToNews': { kz: 'Жаңалықтарға оралу', ru: 'Вернуться к новостям', en: 'Back to News' },
  'newsDetail.share': { kz: 'Бөлісу', ru: 'Поделиться', en: 'Share' },
  'newsDetail.allNews': { kz: 'Барлық жаңалықтар', ru: 'Все новости', en: 'All News' },
  'newsDetail.linkCopied': { kz: 'Сілтеме көшірілді', ru: 'Ссылка скопирована', en: 'Link copied' },
  'newsDetail.notFound': { kz: 'Жаңалық табылмады', ru: 'Новость не найдена', en: 'News not found' },
  'newsDetail.notFoundDesc': { kz: 'Сіз іздеген жаңалық жойылған немесе ешқашан болмаған.', ru: 'Новость, которую вы ищете, была удалена или никогда не существовала.', en: 'The news you are looking for has been deleted or never existed.' },

  'home.directorBlog': { kz: 'Басшының блогы', ru: 'Блог руководителя', en: 'Director\'s Blog' },
  'state.desc': { kz: 'Мемлекеттік басқару және қызметтер туралы ақпарат', ru: 'Информация о государственном управлении и услугах', en: 'Information about state management and services' },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('site-language');
    return (saved as Language) || 'kz';
  });

  useEffect(() => {
    localStorage.setItem('site-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
