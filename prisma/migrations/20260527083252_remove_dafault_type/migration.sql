/*
  Warnings:

  - You are about to drop the column `defaultType` on the `Chart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chart" DROP COLUMN "defaultType";

-- DropEnum
DROP TYPE "ChartType";
