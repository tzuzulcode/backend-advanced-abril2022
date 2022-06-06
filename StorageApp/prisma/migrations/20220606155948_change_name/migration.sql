/*
  Warnings:

  - You are about to drop the column `clientId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeCustomerId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Subscription_clientId_key` ON `Subscription`;

-- AlterTable
ALTER TABLE `Subscription` DROP COLUMN `clientId`,
    ADD COLUMN `stripeCustomerId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Subscription_stripeCustomerId_key` ON `Subscription`(`stripeCustomerId`);
