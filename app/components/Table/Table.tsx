import type { ITableProps } from "./Table.interface";

const Table = ({
    products
}: ITableProps) => {
    return (
        <s-section padding="none">
            <s-table>
                <s-table-header-row>
                    <s-table-header></s-table-header>
                    <s-table-header>Name</s-table-header>
                    <s-table-header>Actions</s-table-header>
                </s-table-header-row>
                <s-table-body>
                    {
                        products.map((product, id) => (
                            <s-table-row key={id}>
                                <s-table-cell>
                                    <s-thumbnail
                                        src={product.productThumbnail}
                                        alt={product.productName}
                                    />
                                </s-table-cell>
                                <s-table-cell>
                                    {product.productName}
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