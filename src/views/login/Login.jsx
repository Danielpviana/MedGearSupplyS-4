import './Login.css'
import { Navbar } from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/footer/Footer';

export function Login() {
    const navigate = useNavigate();
    let userName = "";
    let userToken = "";
    let userRole = "";

    async function handleLoggin(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3001/api/login", {       // Cambiar el puerto 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                userName = data.user;
                userToken = data.token;
                userRole = data.role;
                localStorage.setItem('token', userToken);
                localStorage.setItem('name', userName);
                console.log("Logged in successfully");
                if (userRole === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/home");
                }
            } else if (response.status === 401) {
                const errorData = await response.json();
                console.log("Unauthorized");
                alert("Try again");
            } else {
                console.error("Unexpected error:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="form">
                <div className="form-content">
                    <div id="login">
                        <h1>Bienvenido de vuelta</h1>
                        <form id="login-form" onSubmit={handleLoggin}>
                            <div className="field-wrap">
                                <input type="email" placeholder="Email" id="email" required />
                            </div>
                            <div className="field-wrap">
                                <input type="password" placeholder="Contraseña" id="password" required />
                            </div>
                            <p className="forgot"><a href="#">¿Olvidó su contraseña?</a><br /><a href="logup">Cree su cuenta</a></p>
                            <a href="#" className="button-link">
                                <button className="button button-block" type="submit" id="login-button">Iniciar sesión</button>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}