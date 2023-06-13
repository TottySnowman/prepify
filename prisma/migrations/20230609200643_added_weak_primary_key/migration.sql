/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Allergens` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `allergy` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuisine` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `cuisine_type` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `prep_time` TIME(0) NULL,
    `cook_time` TIME(0) NULL,
    `id_cuisine` INTEGER NULL,
    `id_type` INTEGER NULL,
    `id_category` INTEGER NULL,

    INDEX `id_cuisine`(`id_cuisine`),
    INDEX `id_type`(`id_type`),
    INDEX `id_category`(`id_category`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weekly_Recipe` (
    `week` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `id_recipe` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`week`, `year`, `id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `servings` INTEGER NULL,
    `notion_api_key` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe_Allergy` (
    `id_recipe` INTEGER NOT NULL,
    `id_allergy` INTEGER NOT NULL,

    INDEX `id_allergy`(`id_allergy`),
    INDEX `id_recipe`(`id_recipe`),
    PRIMARY KEY (`id_recipe`, `id_allergy`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_ibfk_1` FOREIGN KEY (`id_cuisine`) REFERENCES `Cuisine`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `Type`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `Category`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Weekly_Recipe` ADD CONSTRAINT `Weekly_Recipe_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Weekly_Recipe` ADD CONSTRAINT `Weekly_Recipe_ibfk_2` FOREIGN KEY (`id_recipe`) REFERENCES `Recipe`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Recipe_Allergy` ADD CONSTRAINT `Recipe_Allergy_ibfk_1` FOREIGN KEY (`id_allergy`) REFERENCES `Allergens`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Recipe_Allergy` ADD CONSTRAINT `Recipe_Allergy_ibfk_2` FOREIGN KEY (`id_recipe`) REFERENCES `Recipe`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
