import { Prisma } from "@prisma/client"
import prisma from "app/db.server"

const findManyByShopifyId = (shop: string, shopfyIds: string[]) => {
    return prisma.product.findMany({
        where: {
            shop,
            shopifyId: { in: shopfyIds },
        },
    })
}

const upsertByShopifyId = ({ shopifyId, shop, disabled }: Prisma.ProductCreateInput) => {
    return prisma.product.upsert({
        where: {
            shop_shopifyId: {
                shop,
                shopifyId,
            },
        },
        create: {
            shopifyId,
            shop,
            disabled,
        },
        update: {
            shopifyId,
            shop,
            disabled,
        },
    })
}

const repository = {
    findManyByShopifyId,
    upsertByShopifyId,
}

export default repository
