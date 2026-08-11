import { AdminApiContext } from "@shopify/shopify-app-react-router/server"

const getData = async (admin: AdminApiContext, graphql: string, variables?: any) =>{
    const response = await admin.graphql(graphql, variables ? { variables } : undefined);
    const json = await response.json();

    return json.data;
}

const shopifyGraphqlService = {
    getData,
}

export default shopifyGraphqlService;