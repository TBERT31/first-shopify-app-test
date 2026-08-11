import { productsGraphql } from "app/graphql";
import { shopifyGraphqlService } from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type ActionFunctionArgs } from "react-router";
import productsHandler from "./products.handler";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const body = await request.formData();
  const after = body.get("after") as string || '';
  const before = body.get("before") as string || '';

  let products;

  if(after) {
    const data = await shopifyGraphqlService.getData(admin, productsGraphql.paginatedProductsAfter(after));
    products = data.products;
  } else {
    const data = await shopifyGraphqlService.getData(admin, productsGraphql.paginatedProductsBefore(before));
    products = data.products;
  }

  const formattedProducts = productsHandler.format(products?.nodes ?? []);

  return data({
    products: formattedProducts,
    pageInfo: products.pageInfo,
  });
};