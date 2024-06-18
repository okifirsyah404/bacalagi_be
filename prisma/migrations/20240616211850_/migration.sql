/*
  Warnings:

  - You are about to drop the column `ratio` on the `PredictionResult` table. All the data in the column will be lost.
  - Added the required column `overallRatio` to the `PredictionResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rippedRatio` to the `PredictionResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wornOutRatio` to the `PredictionResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PredictionResult` DROP COLUMN `ratio`,
    ADD COLUMN `overallRatio` DOUBLE NOT NULL,
    ADD COLUMN `rippedRatio` DOUBLE NOT NULL,
    ADD COLUMN `wornOutRatio` DOUBLE NOT NULL;
