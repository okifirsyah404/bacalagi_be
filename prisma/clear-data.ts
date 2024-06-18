import { PrismaClient } from '@prisma/client';

export async function clearData(prisma: PrismaClient) {
  await prisma.transactionPost.deleteMany();
  await prisma.predictionResult.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.account.deleteMany();
  await prisma.frequentlyAskedQuestion.deleteMany();
  await prisma.privacyPolicy.deleteMany();

  console.log('Data cleared');
}
