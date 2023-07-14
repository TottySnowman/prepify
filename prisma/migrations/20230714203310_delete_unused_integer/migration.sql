/*
  Warnings:

  - You are about to drop the column `recipeID` on the `Weekly_Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Weekly_Recipe` DROP FOREIGN KEY `Weekly_Recipe_recipeID_fkey`;

-- DropIndex
DROP INDEX `Weekly_Recipe_ibfk_2` ON `Weekly_Recipe`;

-- AlterTable
ALTER TABLE `Weekly_Recipe` DROP COLUMN `recipeID`;

-- AddForeignKey
ALTER TABLE `Weekly_Recipe` ADD CONSTRAINT `Weekly_Recipe_id_recipe_fkey` FOREIGN KEY (`id_recipe`) REFERENCES `Recipe`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
