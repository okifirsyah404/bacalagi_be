/*
  Warnings:

  - You are about to drop the column `firsName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `firsName`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL;
