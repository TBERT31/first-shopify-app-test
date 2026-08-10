import { AdminApiContext } from "@shopify/shopify-app-react-router/server"
import { storeGraphql } from "app/graphql";

const getData = async (admin: AdminApiContext) =>{
    const response = await admin.graphql(storeGraphql.store);
    const json = await response.json();

    console.log("Store Data in Services:", json.data);
    return json.data;
}

const storeService = {
    getData,
}

export default storeService;