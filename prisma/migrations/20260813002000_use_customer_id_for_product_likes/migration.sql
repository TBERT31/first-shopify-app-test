DELETE FROM "product_likes";

DROP INDEX IF EXISTS "product_likes_shop_productId_visitorId_key";

ALTER TABLE "product_likes" RENAME COLUMN "visitorId" TO "customerId";

CREATE UNIQUE INDEX IF NOT EXISTS "product_likes_shop_productId_customerId_key"
ON "product_likes"("shop", "productId", "customerId");
