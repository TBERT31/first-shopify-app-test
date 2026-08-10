const theme = `#graphql
    query {
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
    theme,
}

export default graphql;