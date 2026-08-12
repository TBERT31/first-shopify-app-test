import { Prisma } from "@prisma/client"
import prisma from "app/db.server"

const findManyByShopifyId = (shopfyIds: string[]) => {
    return prisma.product.findMany({
        where: { shopifyId: { in: shopfyIds } },
    })
}

const upsertByShopifyId = ({ shopifyId, shop, disabled }: Prisma.ProductCreateInput) => {
    return prisma.product.upsert({
        where: {
            shopifyId,
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