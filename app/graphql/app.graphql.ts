const currentAppInstallation = `#graphql
    query {
        currentAppInstallation {
            activeSubscriptions {
                status
            }
            launchUrl
        }
    }
`;

const graphql = {
    currentAppInstallation,
}

export default graphql;