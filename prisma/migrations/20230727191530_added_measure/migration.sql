-- DropIndex
DROP INDEX `Weekly_Recipe_id_recipe_fkey` ON `Weekly_Recipe`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `id_measure` INTEGER NULL;

-- CreateTable
CREATE TABLE `measure` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `measure` VARCHAR(6) NOT NULL,

    UNIQUE INDEX `measure_measure_key`(`measure`),
    INDEX `measure_ID_idx`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `User_Measures` FOREIGN KEY (`id_measure`) REFERENCES `measure`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
