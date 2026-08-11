import type {
  ActionFunctionArgs,
  HeadersFunction,
} from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { loader as loaderHomeType } from "../modules/home";
export { loader } from "../modules/home";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  return null;
};

export default function Index() {
  const loaderData = useLoaderData<typeof loaderHomeType>();
  const { shopOwnerName, themeEditorUrl } = loaderData;

  const title = `Welcome to LIKE PRODUCTS, ${shopOwnerName}!`;

  return (
    <s-page heading="LIKE PRODUCT">
      <s-stack gap="base large-300">

        <s-section heading={title}>
          <s-paragraph>Here you can enable likes for your products.</s-paragraph>
        </s-section>

        <s-heading>Status</s-heading>

        <s-stack gap="base large-200" rowGap="large-200" direction="inline">
          <s-section heading="Total likes">
            <s-stack direction="inline">
              <s-icon type="heart"></s-icon>
              <s-paragraph>140</s-paragraph>
            </s-stack>
          </s-section>
        </s-stack>

        <s-section heading="Tutorial">
            <s-ordered-list>
              <s-list-item>Go to your product <s-link href={themeEditorUrl} target="_blank">theme editor</s-link></s-list-item>
              <s-list-item>Select the default Product page</s-list-item>
              <s-list-item>Add a new section</s-list-item>
              <s-list-item>Click on app</s-list-item>
              <s-list-item>Click on LIKE PRODUCTS</s-list-item>
            </s-ordered-list>
        </s-section>

      </s-stack>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
