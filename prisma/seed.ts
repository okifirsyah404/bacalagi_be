import { PrismaClient } from '@prisma/client';
import { clearData } from './clear-data';
import { seedTransactions } from './transaction-seeder';
import { seedUsers } from './user-seeder';

const prisma = new PrismaClient();

async function main() {
  await clearData(prisma);

  await seedUsers(prisma);

  await seedTransactions(prisma);

  console.log('Done seeding');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
