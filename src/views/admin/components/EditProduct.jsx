import './CreateProduct.css';
import { useState, useEffect } from 'react';

export function EditProduct({ id, productList }) {
    let validatedToken = localStorage.getItem("token");
    const foundItem = productList.find(item => item._id === id);

    if (!foundItem) {
        console.log("Item not found");
        // Item found, access its properties safely

    } else {
        // Item not found, handle the error
        console.log("Item found:");
        console.log("Name:", foundItem.name);
        console.log("Image:", foundItem.image);
        console.log("Price:", foundItem.price);
        console.log("Amount:", foundItem.amount);

        // You can show an error message, throw an exception, or take other appropriate actions.
    };




    async function handleEdit(e) {
        e.preventDefault();
        const name = document.getElementById("nameToEdit").value;
        const imageUrl = document.getElementById("imageUrlToEdit").value;
        const price = document.getElementById("priceToEdit").value;
        const amount = document.getElementById("amountToEdit").value;

        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`, {       // Cambiar el puerto 
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, imageUrl, price, amount })
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    //console.log(productList);

    return (
        <>
            <div className="form">
                <div className="form-content">
                    <div id="login">
                        <h1>Editar {foundItem.name}</h1>
                        <form id="login-form" onSubmit={handleEdit}>
                            <div className="field-wrap">
                                <input type="text" placeholder="Nombre" id="nameToEdit" required />
                            </div>
                            <div className="field-wrap">
                                <input type="text" placeholder="Link de imagen" id="imageUrlToEdit" required />
                            </div>
                            <div className="field-wrap">
                                <input type="number" placeholder="Precio" id="priceToEdit" required />
                            </div>
                            <div className="field-wrap">
                                <input type="number" placeholder="Disponibles" id="amountToEdit" required />
                            </div>
                            <a href="#" className="button-link">
                                <button className="button button-block" type="submit" id="login-button">Editar</button>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}