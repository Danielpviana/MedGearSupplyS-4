import './Logup.css'
import { Navbar } from "../../components/navbar/Navbar";
import { useNavigate } from 'react-router-dom';

export function Logup() {

    const navigate = useNavigate();

    async function handleLogup(e) {
        e.preventDefault();
        const name = document.getElementById("firstName").value;
        const lastname = document.getElementById("lastName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const adress = document.getElementById("address").value;

        const response = await fetch("/api/logup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, lastname, email, password, confirmPassword, adress })
        });

        if (response.ok) {
            console.log("Logged up successfully");
            navigate("/home");
        } else {
            console.error("Log up failed");
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="form">
                <div className="form-content">
                    <div id="signup">
                        <h1>Regístrese gratis</h1>
                        <form id="signup-form" onSubmit={handleLogup}>
                            <div className="top-row">
                                <div className="field-wrap">
                                    <input type="text" placeholder="Nombre" id="firstName" required />
                                </div>
                                <div className="field-wrap">
                                    <input type="text" placeholder="Apellido" id="lastName" required />
                                </div>
                            </div>
                            <div className="field-wrap">
                                <input type="email" placeholder="Ingrese su email" id="signupEmail" required />
                            </div>
                            <div className="field-wrap">
                                <input type="password" placeholder="Cree su contraseña" id="signupPassword" required />
                            </div>
                            <div className="field-wrap">
                                <input type="password" placeholder="Confirme su contraseña" id="confirmPassword" required />
                            </div>
                            <div className="field-wrap">
                                <input type="text" placeholder="Ingrese su dirección" id="address" required />
                            </div>
                            <p className="forgot"><a href="login">¿Ya tiene una cuenta?</a></p>

                            <a href="#" className="button-link">
                                <button className="button button-block" id="signup-button" type="submit">Crear cuenta</button>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}