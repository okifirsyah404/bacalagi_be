import { Prisma } from '@prisma/client';

export default abstract class DatabaseSelector {
  static account = {
    id: true,
    email: true,
    googleId: true,
  } satisfies Prisma.AccountSelect;

  static profile = {
    id: true,
    name: true,
    avatarUrl: true,
    phoneNumber: true,
    adminAreaLocality: true,
    cityLocality: true,
    address: true,
  } satisfies Prisma.ProfileSelect;

  static user = {
    id: true,
    profile: {
      select: DatabaseSelector.profile,
    },
  } satisfies Prisma.UserSelect;

  static book = {
    id: true,
    title: true,
    author: true,
    ISBN: true,
    publisher: true,
    publishYear: true,
    language: true,
    imageUrl: true,
    buyPrice: true,
  } satisfies Prisma.BookSelect;

  static transactionPost = {
    id: true,
    status: true,
    finalPrice: true,
    recommendedPrice: true,
    description: true,
    seenCount: true,
    createdAt: true,
  } satisfies Prisma.TransactionPostSelect;

  static predictionResult = {
    id: true,
    bookCondition: true,
    buyPrice: true,
    outputPrice: true,
    percentage: true,
    rippedRatio: true,
    wornOutRatio: true,
    overallRatio: true,
  } satisfies Prisma.PredictionResultSelect;
}
