const isTestEnvironnement = process.env.SHOPIFY_BILLING_TEST === "true";

const appSubscriptionCreate = `#graphql
    mutation AppSubscriptionCreate(
        $name: String!, 
        $lineItems: [AppSubscriptionLineItemInput!]!, 
        $returnUrl: URL!
        $test: Boolean,
        $trialDays: Int
    ) {
        appSubscriptionCreate(
            name: $name, 
            returnUrl: $returnUrl, 
            lineItems: $lineItems,
            test: $test,
            trialDays: $trialDays
        ) {
            userErrors {
                field
                message
            }
            appSubscription {
                id
            }
            confirmationUrl
        }
    }
`;

const appSubscriptionCreateVariables = (returnUrl: string) => {
    return {
        name: "Basic Plan",
        returnUrl,
        test: isTestEnvironnement,
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
                },
            }
        ],
    }
}

const graphql = {
    appSubscriptionCreate,
    appSubscriptionCreateVariables,
}

export default graphql;