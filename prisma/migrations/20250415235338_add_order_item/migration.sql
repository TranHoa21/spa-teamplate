/*
  Warnings:

  - You are about to drop the column `customText` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `designType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `drawStyle` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `font` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `selectedOption` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropIndex
DROP INDEX "Order_id_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customText",
DROP COLUMN "designType",
DROP COLUMN "drawStyle",
DROP COLUMN "font",
DROP COLUMN "imageUrl",
DROP COLUMN "productId",
DROP COLUMN "productName",
DROP COLUMN "quantity",
DROP COLUMN "selectedOption";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "productName" TEXT,
    "designType" TEXT NOT NULL,
    "drawStyle" TEXT,
    "font" TEXT,
    "customText" TEXT,
    "imageUrl" TEXT NOT NULL,
    "selectedOption" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
