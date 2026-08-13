-- CreateTable
CREATE TABLE "product_likes" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_likes_shop_productId_idx" ON "product_likes"("shop", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_likes_shop_productId_visitorId_key" ON "product_likes"("shop", "productId", "visitorId");
