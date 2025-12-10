import { db } from './db';
import { users, clients, stateSymbols } from './db/schema';
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
        nameRu: 'ПМПК №9',
        nameKz: 'ПМПК №9',
        nameEn: 'PMPK №9',
        description: 'Психолого-медико-педагогическая консультация',
        phone: '+7 777 608 00 65',
        email: 'pmpk9_ast@mail.ru',
        address: 'Астана қ., Е-321 көшесі, 18 үй',
        hotline: '+7 777 608 00 65',
        socialLinks: {
          facebook: null,
          instagram: null,
          twitter: null,
          youtube: null,
        },
      });
      console.log('✅ PMPK9 client created');
    }

    // 2. Create Admin User
    console.log('👤 Creating admin user...');
    try {
      await db.delete(users).where(eq(users.email, 'admin'));
    } catch (e) {
      // Ignore errors if users don't exist
    }

    const defaultPassword = 'Aa123456';
    const hashedPassword = await hashPassword(defaultPassword);
    
    await db.insert(users).values({
      id: uuidv4(),
      email: 'admin',
      name: 'Admin',
      role: 'admin',
      password: hashedPassword,
    });
    console.log('✅ Admin user created (email: admin, password: Aa123456)');
    console.log('   ⚠️  Password is securely hashed using bcrypt');
    console.log('   ✅ Role: admin (unified admin panel)');

    // 3. Create State Symbols
    console.log('🏛️ Creating state symbols...');
    try {
      await db.delete(stateSymbols).where(eq(stateSymbols.clientId, pmpkId));
    } catch (e) {
      // Ignore
    }

    await db.insert(stateSymbols).values({
      id: uuidv4(),
      clientId: pmpkId,
      flagUrl: '/kz-flag.svg',
      emblemUrl: '/kz-emblem.png',
      anthemTextRu: 'Гимн Республики Казахстан',
      anthemTextKz: 'Қазақстан Республикасының Әнұраны',
      anthemTextEn: 'Anthem of the Republic of Kazakhstan',
    });
    console.log('✅ State symbols created');

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
