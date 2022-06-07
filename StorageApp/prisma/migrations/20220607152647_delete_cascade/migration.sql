-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_folderId_fkey`;

-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Folder` DROP FOREIGN KEY `Folder_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Folder` DROP FOREIGN KEY `Folder_parentFolderId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_userID_fkey`;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_parentFolderId_fkey` FOREIGN KEY (`parentFolderId`) REFERENCES `Folder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
