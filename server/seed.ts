import { db } from './db';
import { clients, news, users } from './db/schema';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  console.log('Seeding database...');

  // 1. Create PMPK9 Client
  const pmpkId = uuidv4();
  await db.insert(clients).values({
    id: pmpkId,
    slug: 'pmpk9',
    name: 'ПМПК №9',
    description: 'Психолого-медико-педагогическая консультация',
    logo: '/pmpk9-logo.png',
    phone: '+7 777 608 00 65',
    email: 'pmpk9_ast@mail.ru',
    address: 'Астана қ., Е-321 көшесі, 18 үй',
    directorName: 'Иванова Мария Ивановна',
    directorBio: 'Педагог-психолог высшей категории, стаж работы 20 лет.',
    theme: 'light',
  }).onConflictDoNothing();

  // 2. Create News for PMPK9
  await db.insert(news).values([
    {
      id: uuidv4(),
      clientId: pmpkId,
      title: 'Открытие нового филиала',
      content: 'Мы рады сообщить об открытии нового филиала...',
      imageUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&auto=format&fit=crop&q=60',
      published: true,
    },
    {
      id: uuidv4(),
      clientId: pmpkId,
      title: 'График работы в праздничные дни',
      content: 'Уважаемые родители! Обратите внимание на график работы...',
      published: true,
    }
  ]);

  // 3. Create Default User (Super Admin)
  await db.insert(users).values({
    id: uuidv4(),
    email: 'admin@aqll.net',
    name: 'Super Admin',
    role: 'super_admin',
    password: 'admin', // Plain text for demo
  }).onConflictDoNothing();

  console.log('Seeding complete!');
}

seed().catch(console.error);

