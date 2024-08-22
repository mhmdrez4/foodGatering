/*
  Warnings:

  - You are about to drop the column `stock` on the `foods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `foods` DROP COLUMN `stock`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;
