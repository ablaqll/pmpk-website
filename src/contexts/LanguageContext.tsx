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
  'home.directorBlog': { kz: 'Басшының блогы', ru: 'Блог руководителя', en: 'Director\'s Blog' },
  'home.readMore': { kz: 'Толығырақ', ru: 'Подробнее', en: 'Read More' },
  'home.stateSymbols': { kz: 'Мемлекеттік рәміздер', ru: 'Государственные символы', en: 'State Symbols' },
  'home.anthem': { kz: 'Әнұран', ru: 'Гимн', en: 'Anthem' },
  'home.listenAnthem': { kz: 'Әнұранды тыңдау', ru: 'Слушать гимн', en: 'Listen to Anthem' },
  'home.openMap': { kz: 'Картаны ашу', ru: 'Открыть карту', en: 'Open Map' },
  'home.openFullMap': { kz: 'Толық картаны ашу', ru: 'Открыть полную карту', en: 'Open Full Map' },

  // About page
  'about.title': { kz: 'Біз туралы', ru: 'О нас', en: 'About Us' },
  'about.orgInfo': {
    kz: 'Психологиялық-медициналық-педагогикалық консультация балаларды тексеруды және оларға консультация беруді, ерекше білім беру қажеттіліктерін және білім алу үшін арнаулы жағдайларды бағалауды, білім беру бағдарламасын айқындауды жүзеге асыратын, сондай-ақ мүмкіндігі шектеулі балаларды арнаулы психолық-педагогикалық қолдауға жіберетін білім беру ұйымы болып табылады.',
    ru: 'Психолого-медико-педагогическая консультация является организацией образования, осуществляющей обследование и консультирование детей, оценку особых образовательных потребностей и специальных условий для получения образования, определение образовательной программы, а также направляющей на специальную психолого-педагогическую поддержку детей с ограниченными возможностями.',
    en: 'The Psychological-Medical-Pedagogical Consultation is an educational organization that conducts examinations and counseling for children, evaluates special educational needs and special conditions for receiving education, determines educational programs, and provides referrals for special psychological and pedagogical support for children with disabilities.'
  },
  'about.activitiesTitle': {
    kz: 'ПМПК қызметінің негізгі бағыттары:',
    ru: 'Основные направления деятельности ПМПК:',
    en: 'Main areas of PMPK activity:'
  },
  'about.activity1': {
    kz: 'ерекше білім беру қажеттіліктерін анықтау және бағалау мақсатында туғаннан бастап 18 жасқа дейінгі балаларды психологиялық-медициналық-педагогикалық тексеру;',
    ru: 'психолого-медико-педагогическое обследование детей от рождения до 18 лет с целью выявления и оценки особых образовательных потребностей;',
    en: 'conducting psychological-medical-pedagogical examinations of children from birth to 18 years to identify and evaluate special educational needs;'
  },
  'about.activity2': {
    kz: 'балалардың ерекше білім беру қажеттіліктерін анықтау, жалпы білім беру мен арнайы білім беру ұйымдарында оларды қанағаттандыру жөнінде ұсынымдар беру;',
    ru: 'определение особых образовательных потребностей у детей и рекомендаций по их удовлетворению в общеобразовательных и специальных организациях образования;',
    en: 'determining special educational needs in children and providing recommendations for their satisfaction in general and special educational organizations;'
  },
  'about.activity3': {
    kz: 'ерекше білім беруді қажет ететін бала үшін білім беру бағдарламасының түрін белгілеу;',
    ru: 'установление типа образовательной программы для ребенка с особыми образовательными потребностями;',
    en: 'establishing the type of educational program for a child with special educational needs;'
  },
  'about.activity4': {
    kz: 'ерекше білім беруді қажет ететін балалар дамуының ауытқуларын болдырмау және жеңу, оларды оқыту және тәрбиелеу мәселелері бойынша отбасына кеңес беру;',
    ru: 'консультирование семьи по вопросам преодоления и предупреждения отклонений в развитии, обучения и воспитания детей с особыми образовательными потребностями;',
    en: 'counseling families on overcoming and preventing development deviations, and on the education and upbringing of children with special educational needs;'
  },
  'about.activity5': {
    kz: 'ерекше білім беруді қажет ететін балаларды оқыту және тәрбиелеу мәселелері бойынша мұғалімдерге, тәрбиешілерге, мектепке дейінгі және мектеп ұйымдарының мамандарына консультациялық-әдістемелік көмек көрсету;',
    ru: 'оказание консультативно-методической помощи по обучению и воспитанию детей с особыми образовательными потребностями учителям, воспитателям, специалистам дошкольных и школьных организаций образования;',
    en: 'providing consultative and methodological assistance on the education and upbringing of children with special educational needs to teachers, educators, and specialists of preschool and school educational organizations;'
  },
  'about.activity6': {
    kz: 'білім беру, медициналық, әлеуметтік қызметтері туралы ақпарат ұсыну мақсатында білім беру, әлеуметтік қорғау, денсаулық сақтау органдарымен, қоғамдық ұйымдармен ерекше білім беруді қажет ететін балаларды уақытылы анықтау бойынша бірлескен жұмыс;',
    ru: 'совместная работа с органами образования, социальной защиты, здравоохранения, общественными организациями по своевременному выявлению детей с особыми образовательными потребностями с целью предоставления информации об образовательных, медицинских, социальных услугах;',
    en: 'collaboration with education, social protection, health authorities, and public organizations for the timely identification of children with special educational needs to provide information about educational, medical, and social services;'
  },
  'about.activity7': {
    kz: 'ерекше білім беруді қажет ететін балалардың есебін жүргізу және жиынтық есептілікті қалыптастыру.',
    ru: 'ведение учета и формирование сводной отчетности о детях с особыми образовательными потребностями.',
    en: 'maintaining records and generating consolidated reports on children with special educational needs.'
  },
  'about.director': { kz: 'Басшы', ru: 'Руководитель', en: 'Director' },
  'about.directorBlogTitle': { kz: 'Басшы блогы', ru: 'Блог руководителя', en: 'Director\'s Blog' },
  'about.directorBlogContent': {
    kz: 'Құрметті әріптестер, ата-аналар және серіктестер!\n\nПМПК жұмысы – бұл тек қана тексеру немесе ұсыныстар беру емес. Бұл – әрбір баланың өз күшті жақтарын ашып, өзіне лайықты білім беру ортасын тауып, сенімді сезінуіне мүмкіндік беретін жол.\n\nБіз күн сайын түрлі өмірлік оқиғалармен кездесеміз. Әрбір осындай оқиғаның ішинде біздің міндетіміз – ең маңыздысын көру: баланың әлеуетін, оның бірегейлігін, мүмкіндіктерін анықтау. Біз тек қиындықтарды белгілеуге ғана емес, сонымен бірге өмірде шын мәнінде жұмыс істейтін шешімдерді табуға көмектесуге тырысамыз.\n\nБүгін мамандар мен ата-аналар арасындағы сенімді қарым-қатынасты қалыптастыру ерекше маңызды. Түсіністік тек ашық диалогта пайда болады, ал онымен вместе тиімді көмек те келеді. Біз жүгінген әрбір отбасын бағалаймыз және құрмет, тыныштық пен қолдау атмосферасын қалыптастыруға ұмтыламыз.\n\nАлда бізді әлі талай кіші жеңістер, үлкен нәтижелер және жақсы оқиғалар күткей!',
    ru: 'Дорогие родители, коллеги и партнёры!\n\nРабота ПМПК - это не просто обследование или рекомендации. Это путь к тому, чтобы каждый ребёнок получил возможность раскрыть свои сильные стороны, найти подходящее образовательное пространство и чувствовать себя уверенно.\n\nКаждый день мы встречаемся с самыми разными жизненными историями. И в каждой такой истории наша задача — увидеть главное: потенциал ребёнка, его уникальность, его возможности. Мы стремимся не только определять трудности, но и помогать находить решения, которые будут работать в реальной жизни.\n\nСегодня особенно важно выстраивать доверие между специалистами и родителями. Только в открытом диалоге рождается понимание, а вместе с ним — эффективная помощь. Мы ценим каждую семью, которая обращается к нам, и стремимся создать атмосферу уважения, спокойствия и поддержки.\n\nПусть впереди у нас будет ещё больше маленьких побед, больших результатов и добрых историй!',
    en: 'Dear parents, colleagues, and partners!\n\nThe work of the PMPK is not just about assessments or recommendations. It is a journey towards ensuring that every child has the opportunity to uncover their strengths, find a suitable educational environment, and feel confident.\n\nEvery day we encounter diverse life stories. In each of these stories, our task is to see the main thing: the child\'s potential, their uniqueness, and their possibilities. We strive not only to identify difficulties but also to help find solutions that will work in real life.\n\nToday, it is especially important to build trust between specialists and parents. Only in an open dialogue is understanding born, and with it, effective help. We value every family that turns to us and strive to create an atmosphere of respect, peace, and support.\n\nMay we have even more small victories, great results, and kind stories ahead!'
  },
  'about.sections': { kz: 'Бөлімдер', ru: 'Разделы', en: 'Sections' },
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
  'about.values': { kz: 'Құндылықтар', ru: 'Ценности', en: 'Values' },
  'about.val1': { kz: 'Кәсібилік', ru: 'Профессионализм', en: 'Professionalism' },
  'about.val1Desc': { kz: 'Мамандардың жоғары біліктілігі', ru: 'Высокая квалификация специалистов', en: 'High qualification of specialists' },
  'about.val2': { kz: 'Құпиялылық', ru: 'Конфиденциальность', en: 'Confidentiality' },
  'about.val2Desc': { kz: 'Дербес деректерді қорғау', ru: 'Защита персональных данных', en: 'Personal data protection' },
  'about.val3': { kz: 'Жеке тәсіл', ru: 'Индивидуальный подход', en: 'Individual approach' },
  'about.val3Desc': { kz: 'Әр балаға назар аудару', ru: 'Внимание к каждому ребенку', en: 'Attention to every child' },
  'about.val4': { kz: 'Қолдау', ru: 'Қолдау', en: 'Support' },
  'about.val4Desc': { kz: 'Отбасына психологиялық көмек', ru: 'Психологическая помощь семье', en: 'Psychological help for the family' },

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
