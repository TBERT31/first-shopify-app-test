type ShopifyButtonProps = Omit<
  JSX.IntrinsicElements["s-button"],
  "children"
>;

export interface PricingCardProps {
  title: string;
  description?: string;
  price: string;
  features?: string[];
  featuredText?: string;
  button?: {
    content: string;
    props?: ShopifyButtonProps;
  };
  frequency?: string;
}
