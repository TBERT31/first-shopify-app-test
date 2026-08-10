import { authenticate } from "app/shopify.server";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log("Second one called, from home loader.ts");
  await authenticate.admin(request);

  return null;
};