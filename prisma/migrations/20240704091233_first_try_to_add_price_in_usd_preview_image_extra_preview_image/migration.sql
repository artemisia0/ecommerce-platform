-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "extraPreviewImage" TEXT DEFAULT 'https://',
ADD COLUMN     "previewImage" TEXT NOT NULL DEFAULT 'https://',
ADD COLUMN     "priceInUSD" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
