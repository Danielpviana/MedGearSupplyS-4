import './ProductCard.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import heart from "../../../assests/images/heart.png";
import eyeIcon from "../../../assests/images/views.png";
import addIcon from "../../../assests/images/add carts.png";

export function ProductCard({ id, name, imageUrl, price, amount, productList, addProduct }) {

    function addToCart(idProc) {
        const foundItem = productList.find(item => item._id === idProc);
        if (!foundItem) {
            console.log("Item not found");
        } else {
            addProduct(foundItem);
        };
    }

    return (
        <>
            <div className="col-md-3 py-3 py-md-0">
                <div className="card">
                    <img className="product-image" src={imageUrl} alt={name} />
                    <div className="overlay">
                        <button type="button" className="btn btn-secondary" title="Comprar">
                            <i><img src={eyeIcon} alt="" width="30px" /></i>
                        </button>
                        <button type="button" className="btn btn-secondary" title="Favorito">
                            <i><img src={heart} alt="" width="30px" /></i>
                        </button>
                        <button type="button" id={id} className="btn btn-secondary" title="Agregar al carrito" onClick={addToCart.bind(null, id)}>
                            <i><img data-id={id} src={addIcon} alt="" width="30px" /></i>
                        </button>
                    </div>
                    <div className='card-body'>
                        <h3 className='text-center'>{name}</h3>
                        <div className="star text-center">
                            <i className='bx bxs-star checked'></i>
                            <i className='bx bxs-star checked'></i>
                            <i className='bx bxs-star checked'></i>
                            <i className='bx bxs-star checked'></i>
                            <i className='bx bxs-star checked'></i>
                        </div>
                        <h5>$ {price}</h5>
                        <h5>Disponible: {amount} en stock</h5>
                    </div>
                </div>
            </div>
        </>
    );
};
