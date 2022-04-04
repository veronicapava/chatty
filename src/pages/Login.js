import { useState } from "react";
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const { login, loginWithGmail, loginWithGitHub } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) => {
        //Actualizando los estados
        setUser({ ...user, [name]: value });
    };

    const handleGoogleSignin = async () => {
        try {
            await loginWithGmail();
            navigate("/chat");
        } catch (err) {
            console.log(err);
        }
    };
    const handleGitHubSignin = async () => {
        try {
            await loginWithGitHub();
            navigate("/chat");
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/chat");
        } catch (error) {
            if (error.code === "auth/user-not-found") setError("Usuario no encontrado");
            if (error.code === "auth/wrong-password") setError("Contraseña incorrecta");
        }
    };

    return (
        <div className="container">
            <form className="mt-5 py-5 px-5" onSubmit={handleSubmit}>
                <h1 className="title ml-2">Bienvenidos a Chatty</h1>
                <p className="lead">¡El mejor chat de la historia!😊</p>
                <label className="lead" htmlFor="email">Email</label>
                <input className="form-control" type="email" name="email" placeholder="Your email" onChange={handleChange} />

                <label className="lead" htmlFor="password">Password</label>
                <input className="form-control" type="password" name="password" placeholder="Your password" onChange={handleChange} />

                <button className="btn btn-primary px-5">Login</button>
            </form>
            {error && <p>{error}</p>}
            <button className="btn btn-primary px-5" onClick={handleGoogleSignin}>Login With Google Account</button>
            <button className="btn btn-primary px-5" onClick={handleGitHubSignin}>Login With GitHub Account</button>
        </div>
    );
};

export default Login;
