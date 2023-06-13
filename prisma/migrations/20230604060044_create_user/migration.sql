-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
