import { productsGraphql } from "app/graphql";
import { shopifyGraphqlService } from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type LoaderFunctionArgs } from "react-router";
import productsHandler from "./products.handler";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const { products } = await shopifyGraphqlService.getData(admin, productsGraphql.products);
  const formattedProducts = productsHandler.format(products?.nodes ?? []);

  return data({
    products: formattedProducts,
    pageInfo: products.pageInfo,
  });
};