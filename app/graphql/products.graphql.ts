const products = `#graphql
    query GetProducts {
        products(first:10, after: ) {
            nodes {
                id
                title
                featuredMedia {
                    preview {
                        image {
                            altText
                            url
                            thumbhash
                        }
                    }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCusor
                startCursor
            }
        }
    }
`;

const paginatedProducts = (after: string) => {`#graphql
    query GetPaginatedProducts($after: String) {
        products(first:10, after: $after) {
            nodes {
                id
                title
                featuredMedia {
                    preview {
                        image {
                            altText
                            url
                            thumbhash
                        }
                    }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCusor
                startCursor
            }
        }
    }
`}

const graphql = {
    products,
    paginatedProducts,
}

export default graphql;