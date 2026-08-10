import { AdminApiContext } from "@shopify/shopify-app-react-router/server"
import { themeGraphql } from "app/graphql";

const getData = async (admin: AdminApiContext) =>{
    const response = await admin.graphql(themeGraphql.theme);
    const json = await response.json();

    console.log("Theme Data in Services:", json.data);
    return json.data;
}

const themeService = {
    getData,
}

export default themeService;