import { productsGraphql } from "app/graphql";
import { productRepository } from "app/repositories";
import { shopifyGraphqlService } from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type ActionFunctionArgs } from "react-router";
import productsHandler from "./products.handler";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const body = await request.formData();

  const after = (body.get("after") as string) || "";
  const before = (body.get("before") as string) || "";
  const query = (body.get("query") as string) || "";

  const variables = {
    first: before ? undefined : 5,
    last: before ? 5 : undefined,
    after: after || undefined,
    before: before || undefined,
    query: query ? `title:${query}*` : undefined,
  };

  const response = await shopifyGraphqlService.getData(
    admin,
    productsGraphql.products,
    variables
  );

  const products = response.products;
  const productIds = products?.nodes?.map((product: any) => product.id) ?? [];
  const productsDb = await productRepository.findManyByShopifyId(session.shop, productIds);

  const mergedProducts =
    products?.nodes?.map((product: any) => {
      const productDb = productsDb.find((p) => p.shopifyId === product.id);

      return {
        ...product,
        disabled: productDb ? productDb.disabled : false,
      };
    }) ?? [];

  const formattedProducts = productsHandler.format(mergedProducts);

  return data({
    products: formattedProducts,
    pageInfo: products.pageInfo,
  });
};
