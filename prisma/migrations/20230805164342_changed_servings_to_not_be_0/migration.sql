/*
  Warnings:

  - Made the column `servings` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `servings` INTEGER NOT NULL;
