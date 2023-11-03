-- AlterTable
ALTER TABLE `users` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `id_meal_type` INTEGER NULL DEFAULT 3;
