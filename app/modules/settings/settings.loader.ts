import { storeGraphql, themeGraphql } from "app/graphql";
import { shopifyGraphqlService } from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const [storeData, themeData] = await Promise.all([
    shopifyGraphqlService.getData(admin, storeGraphql.store),
    shopifyGraphqlService.getData(admin, themeGraphql.theme),
  ]);

  const { shopOwnerName, primaryDomain } = storeData.shop;

  const mainTheme = themeData.themes.nodes[0];
  const storeHandle = primaryDomain.host.replace(".myshopify.com", "");
  const themeId = mainTheme.id.split("/").pop();

  return data({
    shopOwnerName,
    themeEditorUrl: `https://admin.shopify.com/store/${storeHandle}/themes/${themeId}/editor`,
  });
};