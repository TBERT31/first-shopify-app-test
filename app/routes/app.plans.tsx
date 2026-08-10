import { PricingCard } from "app/components";

export default function PlansPage() {
  return (
    <s-page heading="Plans">
        <s-stack gap="base large-300">
          <s-heading>Our Plans</s-heading>
          <PricingCard
            title="Unique Plan"
            description="The unique plan for now, other plans will be available soon."
            price="$5"
            features={["Many likes as possible", "Email support", "Analytics"]}
            featuredText="Popular"
            button={{content: "Select Plan"}}
            frequency="month"
          />
        </s-stack>
    </s-page>
  );
}
