import { appGraphql } from "app/graphql";
import { shopifyGraphqlService } from "app/services";
import { authenticate } from "app/shopify.server";
import { data, type LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await shopifyGraphqlService.getData(admin, appGraphql.currentAppInstallation);
  const status = response?.currentAppInstallation?.activeSubscriptions[0]?.status;

  return data({
    subscriptionStatus: status === "ACTIVE" ? true : false,
  });
};