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

        themes(first: 10, roles: [MAIN]) {
            nodes {
                id
                name
                role
            }
        }
    }
`;

const graphql = {
    store,
}

export default graphql;