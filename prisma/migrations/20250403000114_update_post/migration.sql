/*
  Warnings:

  - You are about to drop the column `height` on the `PostImage` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `PostImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostImage" DROP COLUMN "height",
DROP COLUMN "width";
