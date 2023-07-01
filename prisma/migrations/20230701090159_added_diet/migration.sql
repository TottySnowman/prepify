-- CreateTable
CREATE TABLE `Diet` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `allergy` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Diet` (
    `id_user` INTEGER NOT NULL,
    `id_diet` INTEGER NOT NULL,

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_user`, `id_diet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Diet` ADD CONSTRAINT `User_Diet_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `User_Diet` ADD CONSTRAINT `User_Diet_ibfk_2` FOREIGN KEY (`id_diet`) REFERENCES `Diet`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
