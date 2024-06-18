import { PrismaClient } from '@prisma/client';

export async function seedCommon(prisma: PrismaClient) {
  const frequentlyAskedQuestion = [
    {
      question: 'What is the purpose of this application?',
      answer:
        'This application is a platform for people to share their thoughts and experiences about the environment around them.',
    },
    {
      question: 'How do I report a post?',
      answer:
        'You can report a post by clicking the three dots on the top right of the post and selecting the report option.',
    },
    {
      question: 'How do I block a user?',
      answer:
        'You can block a user by clicking the three dots on the top right of the user profile and selecting the block option.',
    },
    {
      question: 'How do I change my password?',
      answer:
        'You can change your password by going to the settings page and selecting the change password option.',
    },
  ];

  const privacyPolicy = [
    {
      title: 'Privacy Policy',
      content:
        'This privacy policy is a statement that discloses the ways in which our application gathers, uses, discloses, and manages a user’s data.',
    },
    {
      title: 'Information Collection and Use',
      content:
        'Our application collects personal information such as name, email, and phone number to provide a personalized experience for the user.',
    },
  ];

  for await (const faq of frequentlyAskedQuestion) {
    const data = await prisma.frequentlyAskedQuestion.create({
      data: faq,
    });
    console.log(`Created FAQ with id: ${data.id}`);
  }

  for await (const policy of privacyPolicy) {
    const data = await prisma.privacyPolicy.create({
      data: policy,
    });
    console.log(`Created Privacy Policy with id: ${data.id}`);
  }

  console.log('Common seeded');
}
