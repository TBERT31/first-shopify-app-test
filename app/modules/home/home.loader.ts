import storeService from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { admin } = await authenticate.admin(request);
    const storeData = await storeService.getData(admin);

    const { shopOwnerName, primaryDomain } = storeData.shop;

    const mainTheme = storeData.themes.nodes[0];
    const storeHandle = primaryDomain.host.replace(".myshopify.com", "");
    const themeId = mainTheme.id.split("/").pop();

    return data({
        shopOwnerName,
        themeEditorUrl: `https://admin.shopify.com/store/${storeHandle}/themes/${themeId}/editor`,
    });
};