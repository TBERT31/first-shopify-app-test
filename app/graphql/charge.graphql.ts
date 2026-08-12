const appSubscriptionCreate = `#graphql
    mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!) {
        appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems) {
        userErrors {
            field
            message
        }
        appSubscription {
            id
        }
        confirmationUrl
    }
`;

const appSubscriptionCreateVariables = (returnUrl: string) => {
    return {
        name: "Basic Plan",
        returnUrl,
        lineItems: [
            {
                plan: {
                    appRecurringPricingDetails: {
                        price: {
                            amount: 3,
                            currencyCode: "USD"
                        },
                        interval: "EVERY_30_DAYS"
                    }
                }
            }
        ] 
    }
}

const graphql = {
    appSubscriptionCreate,
    appSubscriptionCreateVariables,
}

export default graphql;