-- AlterTable
ALTER TABLE `users` ADD COLUMN `id_meal_type` INTEGER NULL;

-- CreateTable
CREATE TABLE `meal_type` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    INDEX `meal_type_ID_idx`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `User_Meal_Type` FOREIGN KEY (`id_meal_type`) REFERENCES `meal_type`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
