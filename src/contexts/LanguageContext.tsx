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
  // Admin Menu
  'admin.overview': { kz: 'Шолу', ru: 'Обзор', en: 'Overview' },
  'admin.aboutPmpk': { kz: 'ПМПК туралы', ru: 'О ПМПК', en: 'About PMPK' },
  'admin.news': { kz: 'Жаңалықтар', ru: 'Новости', en: 'News' },
  'admin.legalActs': { kz: 'НҚА РК', ru: 'НПА РК', en: 'Legal Acts' },
  'admin.management': { kz: 'Гос. басқару', ru: 'Гос. управление', en: 'State Governance' },
  'admin.feedback': { kz: 'Кері байланыс', ru: 'Обратная связь', en: 'Feedback' },
  'admin.vacancies': { kz: 'Вакансиялар', ru: 'Вакансии', en: 'Vacancies' },
  'admin.events': { kz: 'Іс-шаралар', ru: 'Мероприятия', en: 'Events' },
  'admin.memorandum': { kz: 'Меморандум', ru: 'Меморандум', en: 'Memorandum' },
  'admin.publications': { kz: 'Басылым', ru: 'Издание', en: 'Publications' },
  'admin.attestation': { kz: 'Аттестация', ru: 'Аттестация', en: 'Attestation' },
  'admin.settings': { kz: 'Баптаулар', ru: 'Настройки', en: 'Settings' },
  'admin.panel': { kz: 'Басқару панелі', ru: 'Панель управления', en: 'Control Panel' },
  'admin.viewSite': { kz: 'Сайтты қарау', ru: 'Просмотр сайта', en: 'View Site' },
  'admin.logout': { kz: 'Шығу', ru: 'Выйти', en: 'Logout' },
  'admin.role.admin': { kz: 'Әкімші', ru: 'Администратор', en: 'Admin' },
  'admin.role.editor': { kz: 'Редактор', ru: 'Редактор', en: 'Editor' },

  // Header
  'nav.about': { kz: 'ПМПК туралы', ru: 'О ПМПК', en: 'About PMPK' },
  'nav.news': { kz: 'Жаңалықтар', ru: 'Новости', en: 'News' },
  'nav.documents': { kz: 'НҚА РК', ru: 'НПА РК', en: 'Legal Acts' },
  'nav.management': { kz: 'Гос. басқару', ru: 'Гос. управление', en: 'State Governance' },
  'nav.feedback': { kz: 'Кері байланыс', ru: 'Обратная связь', en: 'Feedback' },
  'nav.vacancies': { kz: 'Вакансия', ru: 'Вакансии', en: 'Vacancies' },
  'nav.events': { kz: 'Іс-шаралар', ru: 'Мероприятия', en: 'Events' },
  'nav.memorandum': { kz: 'Меморандум', ru: 'Меморандум', en: 'Memorandum' },
  'nav.publications': { kz: 'Басылым', ru: 'Издание', en: 'Publication' },
  'nav.attestation': { kz: 'Аттестация', ru: 'Аттестация', en: 'Attestation' },
  'nav.contacts': { kz: 'Байланыс', ru: 'Контакты', en: 'Contacts' },
  'nav.structure': { kz: 'Құрылым', ru: 'Структура', en: 'Structure' },
  
  // Home page
  'home.welcome': { 
    kz: 'Қош келдіңіз!', 
    ru: 'Добро пожаловать!', 
    en: 'Welcome!' 
  },
  'home.description': { 
    kz: 'Психологиялық-медициналық-педагогикалық консультация ерекше білім беру қажеттіліктері бар балаларға және олардың отбасыларына кешенді көмек көрсетеді.', 
    ru: 'Психолого-медико-педагогическая консультация оказывает комплексную помощь детям с особыми образовательными потребностями и их семьям.', 
    en: 'The Psychological-Medical-Pedagogical Consultation provides comprehensive assistance to children with special educational needs and their families.' 
  },
  'home.services': { kz: 'Қызметтер', ru: 'Услуги', en: 'Services' },
  'home.news': { kz: 'Соңғы жаңалықтар', ru: 'Последние новости', en: 'Latest News' },
  'home.allNews': { kz: 'Барлық жаңалықтар', ru: 'Все новости', en: 'All News' },
  'home.readMore': { kz: 'Толығырақ', ru: 'Подробнее', en: 'Read More' },
  'home.stateSymbols': { kz: 'Мемлекеттік рәміздер', ru: 'Государственные символы', en: 'State Symbols' },
  'home.anthem': { kz: 'Әнұран', ru: 'Гимн', en: 'Anthem' },
  'home.listenAnthem': { kz: 'Әнұранды тыңдау', ru: 'Слушать гимн', en: 'Listen to Anthem' },
  'home.directorBlog': { kz: 'Басшы блогы', ru: 'Блог руководителя', en: 'Director\'s Blog' },
  'home.openMap': { kz: 'Картада көрсету', ru: 'На карте', en: 'On the map' },
  'home.openFullMap': { kz: 'Толық картаны ашу', ru: 'Открыть полную карту', en: 'Open full map' },
  
  // About page
  'about.title': { kz: 'Біз туралы', ru: 'О нас', en: 'About Us' },
  'about.director': { kz: 'Басшы', ru: 'Руководитель', en: 'Director' },
  'about.directorBlog': { kz: 'Басшының блогы', ru: 'Блог руководителя', en: 'Director\'s Blog' },
  'about.schedule': { kz: 'Қабылдау кестесі', ru: 'График приёма', en: 'Reception Schedule' },
  'about.structure': { kz: 'Құрылым', ru: 'Структура', en: 'Structure' },
  'about.documents': { kz: 'Құжаттама', ru: 'Документация', en: 'Documentation' },
  'about.charter': { kz: 'Жарғы', ru: 'Устав', en: 'Charter' },
  'about.regulations': { kz: 'Ереже', ru: 'Положение', en: 'Regulations' },
  'about.mission': { kz: 'Біздің миссиямыз', ru: 'Наша миссия', en: 'Our Mission' },
  'about.activities': { kz: 'Қызмет бағыттары', ru: 'Направления деятельности', en: 'Activities' },
  'about.values': { kz: 'Біздің құндылықтарымыз', ru: 'Наши ценности', en: 'Our Values' },
  'about.sections': { kz: 'Бөлімдер', ru: 'Разделы', en: 'Sections' },
  'about.missionText1': {
    kz: 'Психологиялық-медициналық-педагогикалық консультация (ПМПК) — білім алу үшін арнайы жағдайларды анықтау мақсатында балаларды кешенді психологиялық-медициналық-педагогикалық тексеруді жүзеге асыратын мемлекеттік мекеме.',
    ru: 'Психолого-медико-педагогическая консультация (ПМПК) — это государственное учреждение, осуществляющее комплексное психолого-медико-педагогическое обследование детей с целью определения специальных условий для получения образования.',
    en: 'Psychological-Medical-Pedagogical Consultation (PMPK) is a state institution that carries out a comprehensive psychological-medical-pedagogical examination of children in order to determine special conditions for education.'
  },
  'about.missionText2': {
    kz: 'Біз ерекше білім беру қажеттіліктері бар балаларға, олардың ата-аналарына және педагогтарға оқыту, тәрбиелеу және дамыту мәселелерінде көмек көрсетеміз.',
    ru: 'Мы оказываем помощь детям с особыми образовательными потребностями, их родителям и педагогам в вопросах обучения, воспитания и развития.',
    en: 'We provide assistance to children with special educational needs, their parents and teachers in matters of training, education and development.'
  },
  'about.diag': { kz: 'Диагностика', ru: 'Диагностика', en: 'Diagnostics' },
  'about.diagDesc': { kz: 'Балаларды кешенді психологиялық-медициналық-педагогикалық тексеру', ru: 'Комплексное психолого-медико-педагогическое обследование детей', en: 'Comprehensive psychological-medical-pedagogical examination of children' },
  'about.consult': { kz: 'Кеңес беру', ru: 'Консультирование', en: 'Consulting' },
  'about.consultDesc': { kz: 'Балаларды дамыту мәселелері бойынша ата-аналар мен педагогтарға кеңес беру', ru: 'Консультации для родителей и педагогов по вопросам развития детей', en: 'Consultations for parents and teachers on child development' },
  'about.correct': { kz: 'Түзету', ru: 'Коррекция', en: 'Correction' },
  'about.correctDesc': { kz: 'ЕББҚ бар балаларға арналған түзету-дамыту сабақтары', ru: 'Коррекционно-развивающие занятия для детей с ООП', en: 'Correctional and developmental classes for children with SEN' },
  'about.method': { kz: 'Әдістемелік көмек', ru: 'Методическая помощь', en: 'Methodological assistance' },
  'about.methodDesc': { kz: 'Білім беру ұйымдарын әдістемелік сүйемелдеу', ru: 'Методическое сопровождение образовательных организаций', en: 'Methodological support of educational organizations' },
  'about.val1': { kz: 'Кәсібилік', ru: 'Профессионализм', en: 'Professionalism' },
  'about.val1Desc': { kz: 'Мамандардың біліктілігінің жоғары деңгейі және құзыреттерін үнемі арттыру', ru: 'Высокий уровень квалификации специалистов и постоянное повышение компетенций', en: 'High level of qualification of specialists and constant improvement of competencies' },
  'about.val2': { kz: 'Жеке көзқарас', ru: 'Индивидуальный подход', en: 'Individual approach' },
  'about.val2Desc': { kz: 'Білім беру бағытын анықтау кезінде әр баланың ерекшеліктерін ескеру', ru: 'Учет особенностей каждого ребенка при определении образовательного маршрута', en: 'Taking into account the characteristics of each child when determining the educational route' },
  'about.val3': { kz: 'Құпиялылық', ru: 'Конфиденциальность', en: 'Confidentiality' },
  'about.val3Desc': { kz: 'Дербес деректерді және тексеру нәтижелерін қорғау', ru: 'Защита персональных данных и результатов обследования', en: 'Protection of personal data and examination results' },
  'about.val4': { kz: 'Қолжетімділік', ru: 'Доступность', en: 'Accessibility' },
  'about.val4Desc': { kz: 'Азаматтардың барлық санаттары үшін қызметтерге тең қолжетімділікті қамтамасыз ету', ru: 'Обеспечение равного доступа к услугам для всех категорий граждан', en: 'Ensuring equal access to services for all categories of citizens' },

  // Structure
  'structure.title': { kz: 'Ұйым құрылымы', ru: 'Структура организации', en: 'Organization Structure' },
  'structure.desc': { kz: 'Біздің мамандар тобы білікті көмек көрсетуге дайын', ru: 'Наша команда специалистов готова оказать квалифицированную помощь', en: 'Our team of specialists is ready to provide qualified assistance' },
  'structure.staffInfo': { kz: 'Қызметкерлер туралы ақпарат', ru: 'Информация о сотрудниках', en: 'Staff Information' },
  'structure.noData': { kz: 'Ұйым құрылымы туралы деректер жақын арада қосылады', ru: 'Данные о структуре организации будут добавлены в ближайшее время', en: 'Data on the structure of the organization will be added in the near future' },
  
  // News page
  'news.title': { kz: 'Жаңалықтар', ru: 'Новости', en: 'News' },
  'news.desc': { kz: 'Ұйымның соңғы жаңалықтары мен хабарландырулары', ru: 'Актуальные новости и объявления организации', en: 'Latest news and announcements of the organization' },
  'news.all': { kz: 'Барлығы', ru: 'Все', en: 'All' },
  'news.press': { kz: 'Баспасөз хабарламалары', ru: 'Пресс-релизы', en: 'Press Releases' },
  'news.announcements': { kz: 'Хабарландырулар', ru: 'Объявления', en: 'Announcements' },
  'news.noData': { kz: 'Жарияланымдар жоқ', ru: 'Нет публикаций', en: 'No publications' },
  'news.noDataDesc': { kz: 'Бұл санатта әзірге жарияланымдар жоқ', ru: 'В данной категории пока нет публикаций', en: 'There are no publications in this category yet' },
  
  // Documents page
  'docs.title': { kz: 'ҚР НҚА', ru: 'НПА РК', en: 'Legal Acts of RK' },
  'docs.desc': { kz: 'Нормативтік құжаттар, жарғы, есептер және басқа да ресми материалдар', ru: 'Нормативные документы, устав, отчеты и другие официальные материалы', en: 'Regulatory documents, charter, reports and other official materials' },
  'docs.laws': { kz: 'Заңдар мен кодекстер', ru: 'Законы и кодексы', en: 'Laws and Codes' },
  'docs.orders': { kz: 'Бұйрықтар мен қаулылар', ru: 'Приказы и постановления', en: 'Orders and Resolutions' },
  'docs.noDocs': { kz: 'Құжаттар табылмады', ru: 'Документы не найдены', en: 'Documents not found' },
  'docs.soon': { kz: 'Құжаттар жақын арада қосылады', ru: 'Документы будут добавлены в ближайшее время', en: 'Documents will be added in the near future' },
  'docs.open': { kz: 'Ашу', ru: 'Открыть', en: 'Open' },
  'docs.usefulLinks': { kz: 'Пайдалы сілтемелер', ru: 'Полезные ссылки', en: 'Useful links' },
  'docs.egov': { kz: 'Электрондық үкімет', ru: 'Электронное правительство', en: 'E-Government' },
  
  // Document Categories
  'doc.charter': { kz: 'Жарғы', ru: 'Устав', en: 'Charter' },
  'doc.attestation': { kz: 'Аттестация', ru: 'Аттестация', en: 'Attestation' },
  'doc.budget': { kz: 'Бюджет', ru: 'Бюджет', en: 'Budget' },
  'doc.report': { kz: 'Есептер', ru: 'Отчеты', en: 'Reports' },
  'doc.order': { kz: 'Бұйрықтар', ru: 'Приказы', en: 'Orders' },
  'doc.other': { kz: 'Басқа', ru: 'Прочее', en: 'Other' },

  // State management
  'state.title': { kz: 'Мемлекеттік басқару', ru: 'Государственное управление', en: 'State Management' },
  'state.budget': { kz: 'Бюджет', ru: 'Бюджет', en: 'Budget' },
  'state.procurement': { kz: 'Мемлекеттік сатып алулар', ru: 'Государственные закупки', en: 'Public Procurement' },
  'state.anticorruption': { kz: 'Сыбайлас жемқорлыққа қарсы', ru: 'Противодействие коррупции', en: 'Anti-Corruption' },
  'state.services': { kz: 'Мемлекеттік қызметтер', ru: 'Государственные услуги', en: 'State Services' },
  'state.legal': { kz: 'Құқықтық ақпарат', ru: 'Правовая информация', en: 'Legal Information' },
  'state.desc': { kz: 'Мемлекеттік басқару және ашықтық туралы ақпарат', ru: 'Информация о государственном управлении и открытости', en: 'Information about state management and transparency' },
  
  // Feedback page
  'feedback.title': { kz: 'Кері байланыс', ru: 'Обратная связь', en: 'Feedback' },
  'feedback.desc': { kz: 'Сұрақ қойыңыз немесе өтініш қалдырыңыз. Біз қысқа мерзімде жауап береміз.', ru: 'Задайте вопрос или оставьте обращение. Мы ответим в кратчайшие сроки.', en: 'Ask a question or leave a request. We will respond as soon as possible.' },
  'feedback.question': { kz: 'Сұрақ қою', ru: 'Задать вопрос', en: 'Ask a Question' },
  'feedback.sendRequest': { kz: 'Өтініш жіберу', ru: 'Отправить обращение', en: 'Send Request' },
  'feedback.fillForm': { kz: 'Төмендегі форманы толтырыңыз, біз сіздің сұрағыңызға жауап береміз', ru: 'Заполните форму ниже, и мы ответим на ваш вопрос', en: 'Fill out the form below and we will answer your question' },
  'feedback.name': { kz: 'Аты-жөні', ru: 'Ваше имя', en: 'Your Name' },
  'feedback.email': { kz: 'Email', ru: 'Email', en: 'Email' },
  'feedback.phone': { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
  'feedback.message': { kz: 'Сіздің сұрағыңыз', ru: 'Ваш вопрос', en: 'Your Question' },
  'feedback.placeholder': { kz: 'Сұрағыңызды немесе өтінішіңізді сипаттаңыз...', ru: 'Опишите ваш вопрос или обращение...', en: 'Describe your question or request...' },
  'feedback.send': { kz: 'Жіберу', ru: 'Отправить', en: 'Send' },
  'feedback.sending': { kz: 'Жіберілуде...', ru: 'Отправка...', en: 'Sending...' },
  'feedback.reception': { kz: 'Жеке қабылдау', ru: 'Личный приём', en: 'Personal Reception' },
  'feedback.success': { kz: 'Өтініш жіберілді!', ru: 'Обращение отправлено!', en: 'Request sent!' },
  'feedback.successDesc': { kz: 'Біз сіздің сұрағыңызды қарастырып, жақын арада жауап береміз', ru: 'Мы рассмотрим ваш вопрос и ответим в ближайшее время', en: 'We will review your question and respond shortly' },
  'feedback.sendMore': { kz: 'Тағы жіберу', ru: 'Отправить ещё', en: 'Send another' },
  'feedback.faq': { kz: 'Жиі қойылатын сұрақтар', ru: 'Часто задаваемые вопросы', en: 'FAQ' },
  'feedback.noFaq': { kz: 'Сұрақтар түсуіне қарай толтырылады', ru: 'Раздел FAQ будет заполнен по мере поступления вопросов', en: 'FAQ section will be filled as questions arrive' },
  
  // Vacancies page
  'vacancies.title': { kz: 'Вакансиялар', ru: 'Вакансии', en: 'Vacancies' },
  'vacancies.desc': { kz: 'Кәсіби мамандар командасына қосылыңыз', ru: 'Присоединяйтесь к нашей команде профессионалов', en: 'Join our team of professionals' },
  'vacancies.requirements': { kz: 'Талаптар:', ru: 'Требования:', en: 'Requirements:' },
  'vacancies.apply': { kz: 'Өтініш беру', ru: 'Откликнуться', en: 'Apply' },
  'vacancies.active': { kz: 'Белсенді', ru: 'Активна', en: 'Active' },
  'vacancies.published': { kz: 'Жарияланды:', ru: 'Опубликовано:', en: 'Published:' },
  'vacancies.noVacancies': { kz: 'Ашық вакансиялар жоқ', ru: 'Нет открытых вакансий', en: 'No open vacancies' },
  'vacancies.noVacanciesDesc': { kz: 'Қазіргі уақытта ашық вакансиялар жоқ. Жаңартуларды бақылаңыз!', ru: 'В настоящее время нет открытых вакансий. Следите за обновлениями!', en: 'Currently there are no open vacancies. Follow updates!' },
  'vacancies.watchEnbek': { kz: 'Enbek.kz вакансияларын қарау', ru: 'Смотреть вакансии на enbek.kz', en: 'Watch vacancies on enbek.kz' },
  'vacancies.portal': { kz: 'Қазақстанның вакансиялар порталы', ru: 'Портал вакансий Казахстана', en: 'Kazakhstan Vacancies Portal' },
  'vacancies.portalDesc': { kz: 'Ресми порталдан көбірек вакансия табыңыз', ru: 'Найдите больше вакансий на официальном портале', en: 'Find more vacancies on the official portal' },
  
  // Contacts
  'contacts.title': { kz: 'Байланыс ақпараты', ru: 'Контактная информация', en: 'Contact Information' },
  'contacts.desc': { kz: 'Бізбен кез келген ыңғайлы тәсілмен байланысыңыз', ru: 'Свяжитесь с нами любым удобным способом', en: 'Contact us in any convenient way' },
  'contacts.address': { kz: 'Мекенжай', ru: 'Адрес', en: 'Address' },
  'contacts.phone': { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
  'contacts.email': { kz: 'Электрондық пошта', ru: 'Электронная почта', en: 'Email' },
  'contacts.schedule': { kz: 'Қабылдау кестесі', ru: 'График приёма', en: 'Reception Schedule' },
  'contacts.trustPhone': { kz: 'Сенім телефоны', ru: 'Телефон доверия', en: 'Trust Phone' },
  'contacts.social': { kz: 'Әлеуметтік желілер', ru: 'Социальные сети', en: 'Social Media' },
  'contacts.writeUs': { kz: 'Жазыңыз', ru: 'Напишите нам', en: 'Write to us' },
  'contacts.mapLocation': { kz: 'Картадағы орналасуы', ru: 'Расположение на карте', en: 'Location on map' },
  'contacts.open2gis': { kz: '2ГИС-те ашу', ru: 'Открыть в 2ГИС', en: 'Open in 2GIS' },
  'contacts.haveQuestions': { kz: 'Сұрақтарыңыз бар ма?', ru: 'Есть вопросы?', en: 'Have questions?' },
  'contacts.sendRequestDesc': { kz: 'Бізге өтініш жіберіңіз, біз тез арада жауап береміз', ru: 'Отправьте нам обращение, и мы ответим в кратчайшие сроки', en: 'Send us a request and we will respond as soon as possible' },
  'contacts.usefulLinks': { kz: 'Пайдалы сілтемелер', ru: 'Полезные ссылки', en: 'Useful links' },
  
  // Footer
  'footer.rights': { kz: 'Барлық құқықтар қорғалған', ru: 'Все права защищены', en: 'All rights reserved' },
  'footer.poweredBy': { kz: 'Жасаған', ru: 'Разработано', en: 'Powered by' },
  
  // News Detail
  'newsDetail.backToNews': { kz: 'Жаңалықтарға оралу', ru: 'Назад к новостям', en: 'Back to news' },
  'newsDetail.share': { kz: 'Бөлісу', ru: 'Поделиться', en: 'Share' },
  'newsDetail.linkCopied': { kz: 'Сілтеме көшірілді', ru: 'Ссылка скопирована', en: 'Link copied' },
  'newsDetail.notFound': { kz: 'Жарияланым табылмады', ru: 'Публикация не найдена', en: 'Publication not found' },
  'newsDetail.notFoundDesc': { kz: 'Мүмкін ол жойылған немесе жылжытылған', ru: 'Возможно, она была удалена или перемещена', en: 'It may have been deleted or moved' },
  'newsDetail.allNews': { kz: 'Барлық жаңалықтар', ru: 'Все новости', en: 'All news' },
  'newsDetail.published': { kz: 'Жарияланды', ru: 'Опубликовано', en: 'Published' },

  // Common
  'common.loading': { kz: 'Жүктелуде...', ru: 'Загрузка...', en: 'Loading...' },
  'common.error': { kz: 'Қате', ru: 'Ошибка', en: 'Error' },
  'common.noData': { kz: 'Деректер жоқ', ru: 'Нет данных', en: 'No data' },
  'common.city': { kz: 'Астана қаласы', ru: 'город Астана', en: 'Astana city' },
  'common.backToWebsite': { kz: 'Веб-сайтқа оралу', ru: 'Вернуться на сайт', en: 'Back to Website' },
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
