import { productRepository } from "app/repositories";
import { authenticate } from "app/shopify.server";
import { ActionFunctionArgs, data } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
    const { session } = await authenticate.admin(request);

    const body = await request.formData();
    const productId = body.get("productId") as string;
    const status = body.get("status") || 'false';

    const statusBoolean = status === 'true';

    console.log(`Updating product ${productId} to status ${status}. Shop ${session.shop}`);
    const product = await productRepository.upsertByShopifyId({
        shopifyId: productId,
        shop: session.shop,
        disabled: statusBoolean
    })

    return data(
        { product },
        { status: 200 },
    );
}