import { useState } from "react";
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const { login, loginWithGoogle, loginWithGitHub } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) => {
        //Actualizando los estados
        setUser({ ...user, [name]: value });
    };

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };
    const handleGitHubSignin = async () => {
        try {
            await loginWithGitHub();
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/home");
        } catch (error) {
            if (error.code === "auth/user-not-found") setError("Usuario no encontrado");
            if (error.code === "auth/wrong-password") setError("Contraseña incorrecta");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Your email" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Your password" onChange={handleChange} />

                <button>Login</button>
            </form>
            {error && <p>{error}</p>}
            <button onClick={handleGoogleSignin}>Login With Google Account</button>
        </>
    );
};

export default Login;
