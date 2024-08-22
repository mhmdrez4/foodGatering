/*
  Warnings:

  - You are about to alter the column `spicy_level` on the `foods` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `foods` MODIFY `spicy_level` INTEGER NOT NULL DEFAULT 0;
