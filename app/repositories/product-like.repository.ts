import prisma from "app/db.server";

type ProductLikeInput = {
  shop: string;
  productId: string;
  visitorId: string;
};

const countByProduct = (shop: string, productId: string) => {
  return prisma.productLike.count({
    where: {
      shop,
      productId,
    },
  });
};

const findByVisitor = ({ shop, productId, visitorId }: ProductLikeInput) => {
  return prisma.productLike.findUnique({
    where: {
      shop_productId_visitorId: {
        shop,
        productId,
        visitorId,
      },
    },
  });
};

const create = ({ shop, productId, visitorId }: ProductLikeInput) => {
  return prisma.productLike.create({
    data: {
      shop,
      productId,
      visitorId,
    },
  });
};

const remove = ({ shop, productId, visitorId }: ProductLikeInput) => {
  return prisma.productLike.delete({
    where: {
      shop_productId_visitorId: {
        shop,
        productId,
        visitorId,
      },
    },
  });
};

const repository = {
  countByProduct,
  create,
  findByVisitor,
  remove,
};

export default repository;
