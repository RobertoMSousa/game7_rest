/*
  Warnings:

  - You are about to drop the column `count` on the `InventoryItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "count",
ADD COLUMN     "equipped" BOOLEAN NOT NULL DEFAULT false;
