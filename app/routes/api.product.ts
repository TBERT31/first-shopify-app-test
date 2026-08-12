import { authenticate } from "app/shopify.server";
import { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
    const { session } = await authenticate.admin(request);

    const body = await request.formData();
    const productId = body.get("productId") as string;
    const status = body.get("status") === 'false';

    console.log(`Updating product ${productId} to status ${status}. Shop ${session.shop}`);
    return null;
}