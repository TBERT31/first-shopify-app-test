type ShopifyButtonProps = Omit<
  JSX.IntrinsicElements["s-button"],
  "children"
>;

export interface IPricingCardProps {
  title: string;
  description?: string;
  price: string;
  features?: string[];
  featuredText?: string;
  button?: {
    content: string;
    disabled: boolean;
    props?: ShopifyButtonProps;
  };
  frequency?: string;
}
