import { useEffect, useState } from "react";
import type { IProduct, ITableProps } from "./Table.interface";
import { useFetcher } from "react-router";

const Table = ({
    products,
    pageInfo,
}: ITableProps) => {
    const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);
    const [hasPreviousPage, setHasPreviousPage] = useState(pageInfo.hasPreviousPage);
    const [endCursor, setEndCursor] = useState(pageInfo.endCursor);
    const [startCursor, setStartCursor] = useState(pageInfo.startCursor);
    const [productList, setProductList] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');

    const fetcher = useFetcher();
    const updateProductFetcher = useFetcher({ key: 'update-product' });

    const loading = fetcher.state === 'loading' || fetcher.state === 'submitting';

    const handleNextPage = () => {
        fetcher.submit({ after: endCursor, query: searchTerm }, { method: "post"});
    }

    const handlePreviousPage = () => {
        fetcher.submit({ before: startCursor, query: searchTerm }, { method: "post"});
    }

    const handleSearch = (query: string) => {
        setSearchTerm(query);
        fetcher.submit({query}, {method: "post"});
    }

    const updateProduct = (product: IProduct) => {
        updateProductFetcher.submit(
            { productId: product.id, status: !product.disabled }, 
            { method: "post", action: '/api/product' }
        );
    }

    useEffect(() => {
        if(fetcher.data) {
            setProductList(fetcher.data.products);
            setHasNextPage(fetcher.data.pageInfo.hasNextPage);
            setHasPreviousPage(fetcher.data.pageInfo.hasPreviousPage);
            setEndCursor(fetcher.data.pageInfo.endCursor);
            setStartCursor(fetcher.data.pageInfo.startCursor);
        }
    }, [fetcher.data]);

    useEffect(() => {
        if(updateProductFetcher.data) {
            const updatedProduct = updateProductFetcher.data.products;
            setProductList(prevProducts => prevProducts.map(prod => prod.id === updatedProduct.shopifyId ? {...prod, disabled: updatedProduct.disabled } : prod));
        }
    }, [updateProductFetcher.data])

    const ButtonElement = (product: IProduct) => {
        return (
            <s-button tone={ product.disabled ? "neutral" : "critical"} >
                <s-stack direction="inline" gap="small-400" alignItems="center">
                    <s-icon 
                     tone={ product.disabled ? "success" : "critical"} 
                     type={ product.disabled ? "status-active" : "disabled"} 
                    />
                    <s-paragraph tone={ product.disabled ? "success" : "critical"}>
                        { product.disabled ? "Enable" : "Disable"}
                    </s-paragraph>
                </s-stack>
            </s-button>
        )
    }

    return (
        <s-section padding="base">
            <s-search-field
             label="Search"
             labelAccessibilityVisibility="exclusive"
             placeholder="Search items"
             onChange={e => handleSearch(e.currentTarget.value)}
            />
            <s-table 
             paginate 
             hasNextPage={hasNextPage} 
             hasPreviousPage={hasPreviousPage}
             onNextPage={handleNextPage}
             onPreviousPage={handlePreviousPage}
             loading={loading}
            >   
                <s-table-header-row>
                    <s-table-header></s-table-header>
                    <s-table-header>Name</s-table-header>
                    <s-table-header>Actions</s-table-header>
                </s-table-header-row>
                <s-table-body>
                    {
                        productList.map((product, id) => (
                            <s-table-row key={id}>
                                <s-table-cell>
                                    <s-thumbnail
                                        src={product?.image  ?? ""}
                                        alt={product?.alt ?? ""}
                                    />
                                </s-table-cell>
                                <s-table-cell>
                                    {product.title}
                                </s-table-cell>
                                <s-table-cell>
                                    <ButtonElement {...product} />
                                </s-table-cell>
                            </s-table-row>
                        ))
                    }
                </s-table-body>
            </s-table>
        </s-section>
    );
}

export default Table;