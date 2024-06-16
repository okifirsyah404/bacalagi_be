/*
  Warnings:

  - You are about to alter the column `status` on the `TransactionPost` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `TransactionPost` MODIFY `status` ENUM('OPEN', 'SOLD', 'DISCONTINUED') NOT NULL DEFAULT 'OPEN';
