import { productLikeRepository, productRepository } from "app/repositories";
import { authenticate } from "app/shopify.server";
import { data, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";

const getVisitorId = (url: URL) => {
  const visitorId = url.searchParams.get("visitorId");

  if (!visitorId) {
    throw data({ error: "Missing visitor id" }, { status: 400 });
  }

  return visitorId;
};

const getProductId = (url: URL) => {
  const productId = url.searchParams.get("productId");

  if (!productId) {
    throw data({ error: "Missing product id" }, { status: 400 });
  }

  return productId;
};

const getState = async (shop: string, productId: string, visitorId: string) => {
  const disabledProduct = await productRepository.findManyByShopifyId(shop, [productId]);

  if (disabledProduct[0]?.disabled) {
    return {
      disabled: true,
      liked: false,
      count: 0,
    };
  }

  const [count, like] = await Promise.all([
    productLikeRepository.countByProduct(shop, productId),
    productLikeRepository.findByVisitor({ shop, productId, visitorId }),
  ]);

  return {
    disabled: false,
    liked: Boolean(like),
    count,
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.public.appProxy(request);

  if (!session) {
    throw data({ error: "Missing app proxy session" }, { status: 401 });
  }

  const url = new URL(request.url);
  const productId = getProductId(url);
  const visitorId = getVisitorId(url);

  return data(await getState(session.shop, productId, visitorId));
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.public.appProxy(request);

  if (!session) {
    throw data({ error: "Missing app proxy session" }, { status: 401 });
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  const url = new URL(request.url);
  const productId = getProductId(url);
  const visitorId = getVisitorId(url);
  const disabledProduct = await productRepository.findManyByShopifyId(session.shop, [productId]);

  if (disabledProduct[0]?.disabled) {
    return data(
      {
        disabled: true,
        liked: false,
        count: 0,
      },
      {
        status: 403,
      },
    );
  }

  const existingLike = await productLikeRepository.findByVisitor({
    shop: session.shop,
    productId,
    visitorId,
  });

  if (existingLike) {
    await productLikeRepository.remove({ shop: session.shop, productId, visitorId });
  } else {
    await productLikeRepository.create({ shop: session.shop, productId, visitorId });
  }

  return data(await getState(session.shop, productId, visitorId));
};
