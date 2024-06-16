import {
  BookCondition,
  Prisma,
  PrismaClient,
  TransactionStatus,
} from '@prisma/client';

export async function seedTransactions(prisma: PrismaClient) {
  const users = await prisma.user.findMany({
    take: 3,
    orderBy: {
      createdAt: 'asc',
    },
  });

  const predictionResult: Prisma.PredictionResultCreateInput = {
    buyPrice: 100000,
    outputPrice: 80000,
    percentage: 80,
    ratio: 0.8,
    bookCondition: BookCondition.QUITE_GOOD,
  };

  const book: Prisma.BookCreateInput = {
    title: 'The Lean Startup',
    author: 'Eric Ries',
    ISBN: '9780307887894',
    language: 'English',
    buyPrice: 100000,
    publisher: 'Crown Business',
    publishYear: 2011,
    predictionResults: {
      create: predictionResult,
    },
  };

  for await (const user of users) {
    for (let i = 0; i < 10; i++) {
      await prisma.transactionPost.create({
        data: {
          finalPrice: 80000,
          status: TransactionStatus.OPEN,
          recommendedPrice: 80000,
          description:
            'The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched.',
          user: {
            connect: {
              id: user.id,
            },
          },
          book: {
            create: book,
          },
        },
      });
    }

    console.log(`Created post transactions for user with id: ${user.id}`);
  }

  console.log('Transactions seeded');
}
