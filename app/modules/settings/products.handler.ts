interface IProductsNode {
    id: string;
    title: string;
    featuredMedia?: {
        preview?: {
            image?: {
                url?: string;
                alt?: string;
                thumbhash?: string;
            };
        };
    };
    disabled: boolean;
}

const format = (nodes: IProductsNode[]) => {
    if (!Array.isArray(nodes)) {
        return [];
    }

    return nodes.map((node) => ({
        id: node.id,
        title: node.title,
        image: node.featuredMedia?.preview?.image?.url ?? "",
        alt: node.featuredMedia?.preview?.image?.alt ?? "Product image",
        disabled: node.disabled,
    }));
}

const handler = {
    format
}

export default handler;