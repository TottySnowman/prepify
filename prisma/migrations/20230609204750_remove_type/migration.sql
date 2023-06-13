/*
  Warnings:

  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_ibfk_2`;

-- DropTable
DROP TABLE `Type`;
