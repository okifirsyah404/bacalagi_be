/*
  Warnings:

  - You are about to drop the column `age` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `age`,
    DROP COLUMN `dateOfBirth`,
    ADD COLUMN `about` TEXT NULL;

-- AlterTable
ALTER TABLE `TransactionPost` ADD COLUMN `description` TEXT NULL;
