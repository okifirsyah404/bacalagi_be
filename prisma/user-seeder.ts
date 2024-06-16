import { Prisma, PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  const account: Prisma.AccountCreateInput[] = [
    {
      email: 'johndoe@example.com',
      googleId: 'bbg96iwkKFiM5W86fW8jciBsaITfIwIY',
    },
    {
      email: 'johndoe2@example.com',
      googleId: '2LrcFYEKNA5ljYiDbkCvlBUeMBelexop',
    },
    {
      email: 'johndoe3@example.com',
      googleId: 'lsXjGQcXUqa0h3CjKIyDRTgKeE0uHBId',
    },
  ];

  const profile: Prisma.ProfileCreateInput = {
    name: 'John Doe',
    phoneNumber: '+6281234567890',
    cityLocality: 'Surabaya',
    adminAreaLocality: 'Jawa Timur',
    avatarUrl: 'https://picsum.photos/200',
    address: 'Jl. Raya Darmo Permai III',
    about: 'I am a software engineer',
  };

  for await (const acc of account) {
    const user = await prisma.user.create({
      data: {
        account: {
          create: acc,
        },
        profile: {
          create: profile,
        },
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log('Users seeded');
}
