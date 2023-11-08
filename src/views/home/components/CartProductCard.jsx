import './CartProductCard.css';

export function CartProductCard({ productInfo, remove, add }) {

    function addToCart(info) {
        add(info);
    };

    function eliminarClick(info) {
        remove(info);
    };

    return (
        <>
            <li className="list-group-item d-flex flex-row justify-content-evenly">
                <img
                    src={productInfo?.image}
                    className="item-img"
                    alt="..."
                />
                <p style={{ marginBottom: "0px" }}>{productInfo?.name}</p>
                <p style={{ marginBottom: "0px" }}><i>Precio: ${productInfo?.price}</i></p>
                <p style={{ marginBottom: "0px" }}>#: {productInfo?.count}</p>
                <button type="button" className="btn btn-success btn-sm" onClick={addToCart.bind(null, productInfo)}>+</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={eliminarClick.bind(null, productInfo)}>-</button>
            </li>
        </>
    )
}