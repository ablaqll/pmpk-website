import { db } from './db';
import { clients, news, users, staff, vacancies, feedback, documents } from './db/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { hashPassword } from './utils/password';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // 1. Create PMPK9 Client
    console.log('📝 Creating PMPK9 client...');
    const existingClient = await db.select().from(clients).where(eq(clients.slug, 'pmpk9')).limit(1);
    
    let pmpkId: string;
    
    if (existingClient.length > 0) {
      pmpkId = existingClient[0].id;
      console.log('✅ Client already exists, using existing ID');
    } else {
      pmpkId = uuidv4();
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
      });
      console.log('✅ PMPK9 client created');
    }

    // 2. Create News (if doesn't exist)
    console.log('📰 Creating news articles...');
    const existingNews = await db.select().from(news).limit(1);
    if (existingNews.length === 0) {
      await db.insert(news).values([
        {
          id: uuidv4(),
          clientId: pmpkId,
          title: 'Открытие нового филиала ПМПК №9',
          content: 'Уважаемые родители и педагоги!\n\nМы рады сообщить об открытии нового филиала нашей консультации. Теперь мы сможем принять больше детей и оказать квалифицированную помощь большему числу семей.\n\nНовый филиал оснащен современным оборудованием и располагает просторными кабинетами для комфортного проведения диагностики и консультаций.',
          imageUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&auto=format&fit=crop&q=60',
          category: 'news',
          published: true,
        },
        {
          id: uuidv4(),
          clientId: pmpkId,
          title: 'График работы в праздничные дни',
          content: 'Уважаемые родители!\n\nОбратите внимание на график работы ПМПК №9 в праздничные дни:\n\n- 1 января - выходной\n- 2-8 января - выходные\n- 9 января - рабочий день\n\nЗапись на консультации возобновится 9 января. Все ранее записанные приемы переносятся автоматически.',
          category: 'announcement',
          published: true,
        },
        {
          id: uuidv4(),
          clientId: pmpkId,
          title: 'Новые методические рекомендации Министерства образования',
          content: 'Министерство образования и науки Республики Казахстан опубликовало новые методические рекомендации по организации работы ПМПК.\n\nОсновные изменения касаются процедуры диагностики детей с особыми образовательными потребностями.',
          category: 'press_release',
          published: true,
        }
      ]);
      console.log('✅ News articles created');
    } else {
      console.log('ℹ️  News already exist, skipping');
    }

    // 3. Create Default Admin User
    console.log('👤 Creating admin user...');
    
    // Remove old admin users to ensure clean state
    try {
      await db.delete(users).where(eq(users.email, 'admin'));
      await db.delete(users).where(eq(users.email, 'admin@pmpk.kz'));
    } catch (e) {
      // Ignore errors if users don't exist
    }

    // Hash the default password for security
    const defaultPassword = 'Aa123456';
    const hashedPassword = await hashPassword(defaultPassword);
    
    await db.insert(users).values({
      id: uuidv4(),
      email: 'admin',
      name: 'Admin',
      role: 'admin',
      password: hashedPassword, // ✅ Now properly hashed with bcrypt
    });
    console.log('✅ Admin user created (email: admin, password: Aa123456)');
    console.log('   ⚠️  Password is securely hashed using bcrypt');
    console.log('   ✅ Role: admin (unified admin panel)');

    // 4. Create Sample Staff (Optional)
    console.log('👥 Creating sample staff...');
    const existingStaff = await db.select().from(staff).limit(1);
    if (existingStaff.length === 0) {
      await db.insert(staff).values([
        {
          id: uuidv4(),
          clientId: pmpkId,
          name: 'Иванова Мария Ивановна',
          position: 'Директор',
          department: 'Руководство',
          email: 'director@pmpk9.kz',
          phone: '+7 777 608 00 65',
          active: true,
        },
        {
          id: uuidv4(),
          clientId: pmpkId,
          name: 'Петрова Анна Сергеевна',
          position: 'Педагог-психолог высшей категории',
          department: 'Психологическая служба',
          active: true,
        },
        {
          id: uuidv4(),
          clientId: pmpkId,
          name: 'Сидоров Иван Петрович',
          position: 'Учитель-дефектолог',
          department: 'Коррекционная педагогика',
          active: true,
        }
      ]);
      console.log('✅ Sample staff created');
    }

    console.log('\n✨ Seeding complete!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Database is ready!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Admin Credentials:');
    console.log('   Email: admin');
    console.log('   Password: Aa123456');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Run seed
seed()
  .then(() => {
    console.log('🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
