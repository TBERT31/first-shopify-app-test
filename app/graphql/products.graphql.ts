const products = `#graphql
  query GetProducts {
    products(first: 10) {
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

const paginatedProductsAfter = (after: string) => `#graphql
  query GetPaginatedProductsAfter {
    products(first: 10, after: "${after}") {
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

const paginatedProductsBefore = (before: string) => `#graphql
  query GetPaginatedProductsBefore {
    products(last: 10, before: "${before}") {
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
  paginatedProductsAfter,
  paginatedProductsBefore,
};

export default graphql;