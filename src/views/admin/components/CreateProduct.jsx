import './CreateProduct.css';

export function CreateProduct() {

    async function handleCreate(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const imageUrl = document.getElementById("imageUrl").value;
        const price = document.getElementById("price").value;
        const amount = document.getElementById("amount").value;

        try {
            const response = await fetch("http://localhost:3001/api/products", {       // Cambiar el puerto 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, imageUrl, price, amount })
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <>
            <div className="form">
                <div className="form-content">
                    <div id="login">
                        <h1>Agregar productos al inventario</h1>
                        <form id="login-form" onSubmit={handleCreate}>
                            <div className="field-wrap">
                                <input type="text" placeholder="Nombre" id="name" required />
                            </div>
                            <div className="field-wrap">
                                <input type="text" placeholder="Link de imagen" id="imageUrl" required />
                            </div>
                            <div className="field-wrap">
                                <input type="number" placeholder="Precio" id="price" required />
                            </div>
                            <div className="field-wrap">
                                <input type="number" placeholder="Disponibles" id="amount" required />
                            </div>
                            <a href="#" className="button-link">
                                <button className="button button-block" type="submit" id="login-button">Agregar</button>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

