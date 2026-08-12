import { productsGraphql } from "app/graphql";
import { shopifyGraphqlService } from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type LoaderFunctionArgs } from "react-router";
import productsHandler from "./products.handler";
import { productRepository } from "app/repositories";
import { IProduct } from "app/components/Table/Table.interface";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const { products } = await shopifyGraphqlService.getData(admin, productsGraphql.products, { first: 5 });
  const productIds = products?.nodes?.map((product: any) => product.id || []);
  const productsDb = await productRepository.findManyByShopifyId(productIds)

  const formattedProducts = productsHandler.format(products?.nodes ?? []);

  return data({
    products: formattedProducts,
    pageInfo: products.pageInfo,
  });
};