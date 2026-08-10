const store = `#graphql
    query {
        shop {
            name
            contactEmail
            id
            email 
            primaryDomain {
                url
                host
            }
            shopOwnerName
        }
    }
`;

const graphql = {
    store,
}

export default graphql;