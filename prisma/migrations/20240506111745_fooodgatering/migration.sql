/*
  Warnings:

  - You are about to drop the column `quantity` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `name_cus` on the `orders_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `foods` DROP COLUMN `quantity`,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orders_list` DROP COLUMN `name_cus`,
    ADD COLUMN `customer_name` VARCHAR(191) NOT NULL DEFAULT '';
