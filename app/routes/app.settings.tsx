import { Table } from "app/components";
import { loader as settingsLoaderType } from "../modules/settings";
import { useLoaderData } from "react-router";

export { loader } from "../modules/settings";

export default function SettingsPage() {
  const loaderData = useLoaderData<typeof settingsLoaderType>();
  const { products } = loaderData;

  return (
    <s-page heading="Settings">
      <s-stack gap="base large-300">
        <s-section heading="You can disable the like button from specific products here">
          <s-paragraph>
            You need to select the products below to disable the like button on its product page.
          </s-paragraph>
        </s-section>
        <Table  products={ products }/>
      </s-stack>
    </s-page>
  );
}
