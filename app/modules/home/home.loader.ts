import { storeService, themeService } from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const [storeData, themeData] = await Promise.all([
    storeService.getData(admin),
    themeService.getData(admin),
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