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
  const query = body.get("query") as string || '';

  let products;

  if(after) {
    const data = await shopifyGraphqlService.getData(admin, productsGraphql.products, { 
        first:5, 
        after, 
        query: query ? `title: ${query}*` : undefined
    });
    products = data.products;
  } else if(before) {
    const data = await shopifyGraphqlService.getData(admin, productsGraphql.products, { 
        last:5, 
        before, 
        query: `title: ${query}*`  
    });
    products = data.products;
  } else {
    const data = await shopifyGraphqlService.getData(admin, productsGraphql.products, { 
        first:5, 
        query: query ? `title: ${query}*` : undefined
    });
    products = data.products;
  }

  const formattedProducts = productsHandler.format(products?.nodes ?? []);

  return data({
    products: formattedProducts,
    pageInfo: products.pageInfo,
  });
};