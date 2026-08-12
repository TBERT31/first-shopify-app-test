import { AdminApiContext } from "@shopify/shopify-app-react-router/server";
import { appGraphql, chargeGraphql } from "app/graphql";
import { shopifyGraphqlService } from "app/services";
import { RedirectFunction } from "node_modules/@shopify/shopify-app-react-router/dist/ts/server/authenticate/admin/helpers/redirect";

const getSubscriptionStatus = async (admin: AdminApiContext) => {
    const appData = await shopifyGraphqlService.getData(admin, appGraphql.currentAppInstallation);
    const status = appData?.currentAppInstallation?.activeSubscriptions[0]?.status;

    if(status === "ACTIVE") {
        return {
            valid: true,
            launchUrl: null,
        };
    }

    return {
        valid: false,
        launchUrl: appData.currentAppInstallation.launchUrl,
    };
}

const createSubscription = async (admin: AdminApiContext, launchUrl: string) => {
    const response = await shopifyGraphqlService.getData(
        admin,
        chargeGraphql.appSubscriptionCreate,
        chargeGraphql.appSubscriptionCreateVariables(launchUrl),
    );

    return response.appSubscriptionCreate.confirmationUrl;
}

const validateSubscriptionUseCase = async (admin: AdminApiContext, redirect: RedirectFunction) => {
    const { valid, launchUrl } = await getSubscriptionStatus(admin);

    if(!valid) {
        const confirmationUrl = await createSubscription(admin, launchUrl);
        console.log("Redirection to subscription confirmation URL:", confirmationUrl);
        return redirect(confirmationUrl, { target:  "_parent"});
    }

    return;
}

export default validateSubscriptionUseCase;