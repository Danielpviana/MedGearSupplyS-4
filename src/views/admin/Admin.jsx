import './Admin.css';
import { UserNavbar } from '../../components/userNavbar/UserNavbar';
import { useState, useEffect } from 'react';
import { CreateProduct } from './components/CreateProduct';
import { EditProduct } from './components/EditProduct';
import { useNavigate } from 'react-router';
import editIcon from '../../assests/images/editIcon.png';
import deleteIcon from '../../assests/images/deleteIcon.png';
import 'bootstrap/dist/css/bootstrap.css';

export function Admin() {
    const navigate = useNavigate();
    let validatedToken = localStorage.getItem("token");
    let validatedUser = localStorage.getItem("name");
    const [productList, setProductList] = useState([]);
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const [componentId, setComponentId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/api/products', {
                headers: {
                    "Content-Type": "application/json",
                    authorization: validatedToken,
                },
            });
            if (response.ok) {
                setProductList(await response.json());
            } else {
                navigate('../home');
            }
        };
        fetchData().catch(console.error);
    }, []);

    // Table toggler
    const [toggle, setToggle] = useState(1);

    function updateToggle(id) {
        setToggle(id);
    };

    function editProd(id) {
        setComponentId(id);
        setIsComponentVisible(true);
    };

    async function deleteProd(id) {
        await fetch(`http://localhost:3001/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: validatedToken,
            }
        });
        console.log(`Trying to delete product ${id}`);
        alert("Producto eliminado.");
        location.reload();
    };

    return (
        <>
            <UserNavbar></UserNavbar>
            <div className="switchable-table">
                <h1>Bienvenido, {validatedUser}</h1>
                <ul>
                    <li className={toggle === 1 ? "tab-item active" : "tab-item"} target-wrapper="first-dynamic-table" target-tab="inventario" onClick={() => updateToggle(1)}>Inventario</li>
                    <li className={toggle === 2 ? "tab-item active" : "tab-item"} target-wrapper="first-dynamic-table" target-tab="historial-compras" onClick={() => updateToggle(2)}>Historial de compras</li>
                    <li className={toggle === 3 ? "tab-item active" : "tab-item"} target-wrapper="first-dynamic-table" target-tab="registro-ventas" onClick={() => updateToggle(3)}>Registro de ventas</li>
                </ul>
                <div id="first-dynamic-table">
                    <div className={toggle === 1 ? "tab-content active" : "tab-content"} id="inventario">
                        <h2>Inventario</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope="col">Equipo</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Disponibles</th>
                                    <th scope='col'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">

                                {productList.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.amount}</td>
                                        <td><button className='edit-button' onClick={editProd.bind(null, product._id)}><img src={editIcon}></img></button><button className='delete-button' onClick={deleteProd.bind(null, product._id)}><img src={deleteIcon}></img></button></td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    <div className={toggle === 2 ? "tab-content active" : "tab-content"} id="historial-compras">
                        <h2>Historial de compras</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID de compra</th>
                                    <th scope="col">Equipo</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Fecha compra</th>
                                    <th scope="col">Forma de pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Monitor 1</td>
                                    <td>100</td>
                                    <td>10/10/23</td>
                                    <td>Tarjeta crédito</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Monitor 2</td>
                                    <td>150</td>
                                    <td>15/10/23</td>
                                    <td>Transferencia</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Monitor 3</td>
                                    <td>500</td>
                                    <td>08/10/23</td>
                                    <td>Efectivo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={toggle === 3 ? "tab-content active" : "tab-content"} id="registro-ventas">
                        <h2>Registro de ventas</h2>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <CreateProduct></CreateProduct>
                {isComponentVisible && <EditProduct id={componentId} productList={productList}/>}
                {/* <EditProduct></EditProduct> */}
            </div>
        </>
    );
}