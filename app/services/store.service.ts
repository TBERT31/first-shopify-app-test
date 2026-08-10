import { AdminApiContext } from "@shopify/shopify-app-react-router/server"
import { storeGraphql } from "app/graphql";

const getData = async (admin: AdminApiContext) =>{
    const response = await admin.graphql(storeGraphql.store);
    const responseJson =  await response.json(); 

    console.log('Store Service', responseJson);
    return responseJson.data.store;
}

const storeService = {
    getData,
}

export default storeService;