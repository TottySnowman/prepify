/*
  Warnings:

  - Added the required column `recipe_name` to the `Weekly_Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Weekly_Recipe` DROP FOREIGN KEY `Weekly_Recipe_ibfk_2`;

-- AlterTable
ALTER TABLE `Weekly_Recipe` ADD COLUMN `recipeID` INTEGER NULL,
    ADD COLUMN `recipe_name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Weekly_Recipe` ADD CONSTRAINT `Weekly_Recipe_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
