-- DropIndex
DROP INDEX IF EXISTS "products_shopifyId_key";

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "products_shop_shopifyId_key" ON "products"("shop", "shopifyId");
