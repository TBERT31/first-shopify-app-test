const theme = `#graphql
    query {
        themes(first: 100, roles: [MAIN]) {
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