import "./Home.css";
import { UserNavbar } from "../../components/userNavbar/UserNavbar";
import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { ProductCard } from "./components/ProductCard";
import { ProductTypes } from "../../components/productTypes/ProductTypes";
import { ShoppingCart } from "./components/ShoppingCart";
import banner from '../../assests/images/banner.jpg';

export function Home() {
    const [productList, setProductList] = useState([]);
    const [cartList, setCartList] = useState([]);
    let validatedToken = localStorage.getItem("token");
    let validatedUser = localStorage.getItem("name");

    if(!validatedToken){
        return <Navigate to="/login" replace />;
    };

    const addProductToCart = (newProduct) => {
        setCartList([...cartList, newProduct]);
    };

    const removeFromCart = (product) => {
        let cartListAux = [...cartList];
        const indexToDelete = cartListAux.findIndex(item => item._id === product._id);

        if (indexToDelete !== -1) {
            cartListAux.splice(indexToDelete, 1);
        }
        setCartList(cartListAux);
    };

    const cleanCart = () => {
        setCartList([]);
        getProducts();
    };

    const getProducts = () => {
        fetch('http://localhost:3001/api/home', {
            headers: {
                "Content-Type": "application/json",
                authorization: validatedToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setProductList(data))
            .catch((error) => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (

        <>
            <UserNavbar></UserNavbar>
            {
                cartList.length !== 0 &&
                <ShoppingCart key={cartList._id} cartList={cartList} remove={removeFromCart} add={addProductToCart} clean={cleanCart}></ShoppingCart>
            }
            <div className="container--fluid" id="bg-image">
                <img className="banner-photo" src={banner} alt="banner" />
                <div className="top-left">
                    <h3>Bienvenido, {validatedUser}</h3>
                    <h2>Categorías <span className="changecontent"></span></h2>
                    <p>Revisa aquí las mejores ofertas basadas en tus búsqueda.
                        <br />Productos de calidad a buen precio.
                    </p>
                    <h5>Descuentos especiales por ser cliente.</h5>
                </div>
            </div>
            <ProductTypes></ProductTypes>
            <div className="container" id="product-cards">
                <h1 className="text-center">PRODUCTOS</h1>
                <div className="row" id="product-row" style={{ marginTop: "50px" }}>

                    {productList.map((product) => (

                        <ProductCard key={product._id} id={product._id} name={product.name} imageUrl={product.image} price={product.price} amount={product.amount} productList={productList} addProduct={addProductToCart} />

                    ))}
                </div>
            </div>
        </>
    );
}