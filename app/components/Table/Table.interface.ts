export interface ITableProps {
    products: {
        id: string;
        title: string;
        image: string;
        alt: string;
    }[],
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        endCursor: string;
        startCursor: string;
    };
}