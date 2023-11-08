import './ShoppingCart.css';
import { CartProductCard } from './CartProductCard';
import { useEffect, useState } from 'react';

export function ShoppingCart({ cartList, remove, add, clean }) {
    let validatedToken = localStorage.getItem('token');
    const [totalPrice, setTotalPrice] = useState(0);
    const [auxCartList, setAuxCartList] = useState([]);

    const confirmBuy = async () => {
        console.log(auxCartList);
        auxCartList.map(async (product) => {
            try {
                const response = await fetch(`http://localhost:3001/api/products/${product._id}`, {       // Cambiar el puerto
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: product.name, imageUrl: product.image, price: product.price, amount: (product.amount - product.count) })
                });
            } catch (error) {
                console.error("An error occurred:", error);
            }
        });

        try {
            const response = await fetch(`http://localhost:3001/api/products/sale`, {       // Cambiar el puerto
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: validatedToken,
                },
                body: JSON.stringify(auxCartList)
            });
        } catch (error) {
            console.error("An error occurred:", error);
        };

        alert("Compra realizada.\nOrden registrada en la base de datos.");
        clean();
    }

    useEffect(() => {
        const reducedProducts = cartList.reduce((accumulator, currentProduct) => {
            const existingProduct = accumulator.find((p) => p._id === currentProduct._id);
            if (existingProduct) {
                existingProduct.count++;
            } else {
                accumulator.push({ ...currentProduct, count: 1 });
            }
            return accumulator;
        }, []);
        console.log(reducedProducts);

        let counter = 0;
        cartList.map((product) => {
            counter = counter + product?.price;
            // filterCartList(product._id);
        });
        setTotalPrice(counter);
        setAuxCartList(reducedProducts);
    }, [cartList]);

    return (
        <>
            <div className="carrito-compras">
                <div className="carrito-compras-titulo">
                    <h2>Carrito de compras</h2>
                </div>
                <div className="carrito-compras-items">
                    <ul className="list-group list-group-flush" id="carrito-compras-lista">
                        {/* carrito de compras */}
                        {auxCartList.map((product) => (
                            <CartProductCard key={product
                                ._id} productInfo={product} remove={remove} add={add} />
                        ))}
                    </ul>
                </div>
                <div className="carrito-compras-footer">
                    <div className="carrito-compras-total">
                        <h4 id="total-price">Total: {totalPrice}</h4>
                    </div>
                    <div className="carrito-compras-comprar">
                        <button onClick={confirmBuy}>Comprar</button>
                    </div>
                </div>
            </div>
        </>
    );
};