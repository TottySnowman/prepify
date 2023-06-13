/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
