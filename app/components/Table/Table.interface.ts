export interface ITableProps {
    products: IProduct[],
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        endCursor: string;
        startCursor: string;
    };
}

export interface IProduct {
        id: string;
        title: string;
        image: string;
        alt: string;
        disabled: boolean;
}