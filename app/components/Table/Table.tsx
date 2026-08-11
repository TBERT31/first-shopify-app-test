import { useEffect, useState } from "react";
import type { ITableProps } from "./Table.interface";
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
    const fetcher = useFetcher();
    const loading = fetcher.state === 'loading' || fetcher.state === 'submitting';

    const handleNextPage = () => {
        fetcher.submit({ after: endCursor }, { method: "post"});
    }

    const handlePreviousPage = () => {
        fetcher.submit({ before: startCursor }, { method: "post"});
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

    return (
        <s-section padding="none">
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
                                    <s-button tone="critical">
                                        <s-stack direction="inline" gap="small-400" alignItems="center">
                                            <s-icon tone="critical" type="disabled"/>
                                            <s-paragraph tone="critical">Disable</s-paragraph>
                                        </s-stack>
                                    </s-button>
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