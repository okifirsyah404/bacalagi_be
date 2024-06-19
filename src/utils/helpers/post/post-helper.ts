import { BookCondition } from '@prisma/client';

export class PostHelper {
  static roundRatioToInteger(ratio: number) {
    return Math.round(ratio);
  }

  static checkProductCondition(overallRatio: number): BookCondition {
    const normalizedRatio = this.roundRatioToInteger(overallRatio);

    if (normalizedRatio >= 98) {
      return BookCondition.LIKE_NEW;
    }

    if (normalizedRatio >= 92) {
      return BookCondition.GOOD;
    }

    if (normalizedRatio >= 85) {
      return BookCondition.QUITE_GOOD;
    }

    if (normalizedRatio >= 70) {
      return BookCondition.FAIR;
    }

    return BookCondition.POOR;
  }
}
