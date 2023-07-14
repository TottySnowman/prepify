/*
  Warnings:

  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe_Allergy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_ibfk_3`;

-- DropForeignKey
ALTER TABLE `Recipe_Allergy` DROP FOREIGN KEY `Recipe_Allergy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Recipe_Allergy` DROP FOREIGN KEY `Recipe_Allergy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Weekly_Recipe` DROP FOREIGN KEY `Weekly_Recipe_id_recipe_fkey`;

-- DropTable
DROP TABLE `Recipe`;

-- DropTable
DROP TABLE `Recipe_Allergy`;
