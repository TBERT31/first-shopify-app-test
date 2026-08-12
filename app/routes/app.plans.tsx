import { PricingCard } from "app/components";
import { useLoaderData } from "react-router";
import type { loader as plansLoaderType} from "../modules/plans";

export { loader } from "../modules/plans";

export default function PlansPage() {
  const { subscriptionStatus } = useLoaderData<typeof plansLoaderType>();

  return (
    <s-page heading="Plans">
        <s-stack gap="base large-300">
          <s-heading>Our Plans</s-heading>
          <PricingCard
            title="Unique Plan"
            description="The unique plan for now, other plans will be available soon."
            price="$3"
            features={["Many likes as possible", "Email support", "Analytics"]}
            featuredText="Popular"
            button={{ content: subscriptionStatus ? "Selected" : "Select Plan" }}
            frequency="month"
          />
        </s-stack>
    </s-page>
  );
}
