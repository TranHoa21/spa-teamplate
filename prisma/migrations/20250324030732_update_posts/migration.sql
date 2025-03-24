-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "contentImages" TEXT[],
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
