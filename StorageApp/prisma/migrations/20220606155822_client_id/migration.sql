/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subscription` ADD COLUMN `clientId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Subscription_clientId_key` ON `Subscription`(`clientId`);
