import { useEffect } from "react";
import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log("Second one called");
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  console.log("Action called with admin:", admin);
  return null;
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const submitHandler = () => {
    fetcher.submit(null, { method: "post" });
  }; 

  return (
    <s-page heading="LIKE PRODUCT">
      <s-stack gap="base large-300">

        <s-section heading="[[NAME]] Welcome to LIKE PRODUCTS app!">
          <s-paragraph>Here you can enable likes for your products.</s-paragraph>
        </s-section>

        <s-heading>Status</s-heading>

        <s-stack gap="base large-200" rowGap="large-200" direction="inline">
          <s-section heading="Total likes">
            <s-paragraph>140</s-paragraph>
          </s-section>
        </s-stack>

      </s-stack>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
