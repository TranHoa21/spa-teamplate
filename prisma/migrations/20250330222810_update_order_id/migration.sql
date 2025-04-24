/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT (FLOOR(random() * 1000000000))::text;

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
