/*
  Warnings:

  - Added the required column `adminAreaLocality` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityLocality` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `adminAreaLocality` VARCHAR(191) NOT NULL,
    ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `cityLocality` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(15) NOT NULL;
