/*
  Warnings:

  - You are about to drop the column `allergy` on the `Diet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Diet` DROP COLUMN `allergy`,
    ADD COLUMN `diet` VARCHAR(255) NULL;
