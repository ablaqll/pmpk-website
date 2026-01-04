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
  'home.readMore': { kz: 'Толығырақ', ru: 'Подробнее', en: 'Read More' },
  'home.stateSymbols': { kz: 'Мемлекеттік рәміздер', ru: 'Государственные символы', en: 'State Symbols' },
  'home.anthem': { kz: 'Әнұран', ru: 'Гимн', en: 'Anthem' },
  'home.listenAnthem': { kz: 'Әнұранды тыңдау', ru: 'Слушать гимн', en: 'Listen to Anthem' },
  
  // About page
  'about.title': { kz: 'Біз туралы', ru: 'О нас', en: 'About Us' },
  'about.director': { kz: 'Басшы', ru: 'Руководитель', en: 'Director' },
  'about.directorBlog': { kz: 'Басшының блогы', ru: 'Блог руководителя', en: 'Director\'s Blog' },
  'about.schedule': { kz: 'Қабылдау кестесі', ru: 'График приёма', en: 'Reception Schedule' },
  'about.structure': { kz: 'Құрылым', ru: 'Структура', en: 'Structure' },
  'about.documents': { kz: 'Құжаттама', ru: 'Документация', en: 'Documentation' },
  'about.charter': { kz: 'Жарғы', ru: 'Устав', en: 'Charter' },
  'about.regulations': { kz: 'Ереже', ru: 'Положение', en: 'Regulations' },
  
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
  
  // Vacancies page
  'vacancies.title': { kz: 'Вакансиялар', ru: 'Вакансии', en: 'Vacancies' },
  'vacancies.portal': { kz: 'Еңбек биржасы', ru: 'Вакансии', en: 'Job Portal' },
  'vacancies.requirements': { kz: 'Біліктілік талаптары', ru: 'Квалификационные требования', en: 'Qualification Requirements' },
  'vacancies.apply': { kz: 'Өтініш беру', ru: 'Подать заявку', en: 'Apply' },
  
  // Contacts
  'contacts.title': { kz: 'Байланыс ақпараты', ru: 'Контактная информация', en: 'Contact Information' },
  'contacts.usefulLinks': { kz: 'Пайдалы сілтемелер', ru: 'Полезные ссылки', en: 'Useful Links' },
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
