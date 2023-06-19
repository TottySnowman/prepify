-- CreateTable
CREATE TABLE `User_Allergies` (
    `id_user` INTEGER NOT NULL,
    `id_allergy` INTEGER NOT NULL,

    INDEX `id_user`(`id_user`),
    INDEX `id_allergy`(`id_allergy`),
    PRIMARY KEY (`id_user`, `id_allergy`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
