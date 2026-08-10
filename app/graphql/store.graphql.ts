export const store = `#graphql
    query {
        shop {
            name
            accountOwner {
                email
                firstName
                exists
            }
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