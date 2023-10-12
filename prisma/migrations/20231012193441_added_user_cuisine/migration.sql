-- CreateTable
CREATE TABLE `user_cuisine_type` (
    `id_user` INTEGER NOT NULL,
    `id_cuisine` INTEGER NOT NULL,

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_user`, `id_cuisine`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_cuisine_type` ADD CONSTRAINT `User_Cuisine_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_cuisine_type` ADD CONSTRAINT `User_Cuisine_ibfk_2` FOREIGN KEY (`id_cuisine`) REFERENCES `Cuisine`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
