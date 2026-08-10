import storeService from "app/services";
import { authenticate } from "app/shopify.server";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { admin } = await authenticate.admin(request);
    const storeData = await storeService.getData(admin);

    console.log("Store Data in Loader:", storeData);
    return null;
};