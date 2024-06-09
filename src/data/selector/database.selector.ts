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
}
