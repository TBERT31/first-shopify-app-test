const products = `#graphql
  query GetProducts(
            $first: Int, 
            $after: String, 
            $before: String, 
            $last: Int, 
            $query: String
   ) {
    products(
        first: $first, 
        after: $after, 
        before: $before, 
        last: $last, 
        query: $query
    ) {
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
        endCursor
        startCursor
      }
    }
  }
`;

const graphql = {
  products,
};

export default graphql;