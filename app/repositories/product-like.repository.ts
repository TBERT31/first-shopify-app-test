import prisma from "app/db.server";

type ProductLikeInput = {
  shop: string;
  productId: string;
  customerId: string;
};

const countByProduct = (shop: string, productId: string) => {
  return prisma.productLike.count({
    where: {
      shop,
      productId,
    },
  });
};

const findByCustomer = ({ shop, productId, customerId }: ProductLikeInput) => {
  return prisma.productLike.findUnique({
    where: {
      shop_productId_customerId: {
        shop,
        productId,
        customerId,
      },
    },
  });
};

const create = ({ shop, productId, customerId }: ProductLikeInput) => {
  return prisma.productLike.create({
    data: {
      shop,
      productId,
      customerId,
    },
  });
};

const remove = ({ shop, productId, customerId }: ProductLikeInput) => {
  return prisma.productLike.delete({
    where: {
      shop_productId_customerId: {
        shop,
        productId,
        customerId,
      },
    },
  });
};

const repository = {
  countByProduct,
  create,
  findByCustomer,
  remove,
};

export default repository;
