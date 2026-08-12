import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { IProduct } from "../Table/Table.interface";
import type { UpdateProductResponse } from "app/types";

type ProductButtonProps = {
  product: IProduct;
  onUpdated: (product: UpdateProductResponse["product"]) => void;
};

const ProductButton = ({ product, onUpdated }: ProductButtonProps) => {
  const fetcher = useFetcher<UpdateProductResponse>();
  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data?.product) {
      onUpdated(fetcher.data.product);
    }
  }, [fetcher.data, onUpdated]);

  const updateProduct = () => {
    fetcher.submit(
      { productId: product.id, status: !product.disabled },
      { method: "post", action: "/api/product" }
    );
  };

  return (
    <s-button
      tone={product.disabled ? "neutral" : "critical"}
      onClick={updateProduct}
      {...(loading ? { loading: true } : {})}
    >
      <s-stack direction="inline" gap="small-400" alignItems="center">
        <s-icon
          tone={product.disabled ? "success" : "critical"}
          type={product.disabled ? "status-active" : "disabled"}
        />
        <s-paragraph tone={product.disabled ? "success" : "critical"}>
          {product.disabled ? "Enable" : "Disable"}
        </s-paragraph>
      </s-stack>
    </s-button>
  );
};

export default ProductButton;