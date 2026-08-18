import { productLikeRepository, productRepository } from "app/repositories";
import { authenticate } from "app/shopify.server";
import { data, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";

const getLoggedInCustomerId = (url: URL) => {
  const customerId =
    url.searchParams.get("logged_in_customer_id")?.trim() ||
    url.searchParams.get("customerId")?.trim() ||
    "";

  if (!customerId) {
    return null;
  }

  if (!/^\d+$/.test(customerId)) {
    throw data({ error: "Invalid customer id" }, { status: 400 });
  }

  return customerId;
};

const getProductId = (url: URL) => {
  const productId = url.searchParams.get("productId");

  if (!productId) {
    throw data({ error: "Missing product id" }, { status: 400 });
  }

  if (!/^gid:\/\/shopify\/Product\/\d+$/.test(productId)) {
    throw data({ error: "Invalid product id" }, { status: 400 });
  }

  return productId;
};

const getState = async (shop: string, productId: string, customerId: string | null) => {
  const [disabledProducts, count] = await Promise.all([
    productRepository.findManyByShopifyId(shop, [productId]),
    productLikeRepository.countByProduct(shop, productId),
  ]);

  if (disabledProducts[0]?.disabled) {
    return {
      disabled: true,
      liked: false,
      count,
      requiresLogin: false,
    };
  }

  if (!customerId) {
    return {
      disabled: false,
      liked: false,
      count,
      requiresLogin: true,
    };
  }

  const like = await productLikeRepository.findByCustomer({ shop, productId, customerId });

  return {
    disabled: false,
    liked: Boolean(like),
    count,
    requiresLogin: false,
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.public.appProxy(request);

  if (!session) {
    throw data({ error: "Missing app proxy session" }, { status: 401 });
  }

  const url = new URL(request.url);
  const proxyShop = url.searchParams.get("shop");

  if (proxyShop && proxyShop !== session.shop) {
    throw data({ error: "Shop mismatch" }, { status: 403 });
  }

  const productId = getProductId(url);
  const customerId = getLoggedInCustomerId(url);

  return data(await getState(session.shop, productId, customerId));
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
  const proxyShop = url.searchParams.get("shop");

  if (proxyShop && proxyShop !== session.shop) {
    throw data({ error: "Shop mismatch" }, { status: 403 });
  }

  const productId = getProductId(url);
  const customerId = getLoggedInCustomerId(url);

  if (!customerId) {
    return data(
      {
        disabled: false,
        liked: false,
        count: await productLikeRepository.countByProduct(session.shop, productId),
        requiresLogin: true,
      },
      {
        status: 401,
      },
    );
  }

  const disabledProduct = await productRepository.findManyByShopifyId(session.shop, [productId]);

  if (disabledProduct[0]?.disabled) {
    return data(
      {
        disabled: true,
        liked: false,
        count: await productLikeRepository.countByProduct(session.shop, productId),
        requiresLogin: false,
      },
      {
        status: 403,
      },
    );
  }

  const existingLike = await productLikeRepository.findByCustomer({
    shop: session.shop,
    productId,
    customerId,
  });

  if (existingLike) {
    await productLikeRepository.remove({ shop: session.shop, productId, customerId });
  } else {
    await productLikeRepository.create({ shop: session.shop, productId, customerId });
  }

  return data(await getState(session.shop, productId, customerId));
};
