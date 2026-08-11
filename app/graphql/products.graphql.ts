const products = `#graphql
    query GetProducts {
        products(first:10) {
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
        }
    }
`;

const graphql = {
    products,
}

export default graphql;