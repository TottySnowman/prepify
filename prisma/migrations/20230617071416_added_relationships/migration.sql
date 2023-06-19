-- AddForeignKey
ALTER TABLE `User_Allergies` ADD CONSTRAINT `User_Allergy_ibfk_1` FOREIGN KEY (`id_allergy`) REFERENCES `Allergens`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `User_Allergies` ADD CONSTRAINT `User_Allergy_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
