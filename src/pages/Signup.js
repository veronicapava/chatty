import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { useAuth } from "../context/authContext"

export default function Signup() {
    const [user, setUser] = useState({ email: "", password: "" });
    const { signup, GoogleAuthProvider, GithubAuthProvider, signupWithGmail, signupWithGitHub } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        //Actualizando los estados
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signup(user.email, user.password);
            navigate("/chat");
        } catch (error) {
            if (error.code === "auth/user-not-found") setError("Usuario no encontrado");
            if (error.code === "auth/wrong-password") setError("Contraseña incorrecta");
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await signupWithGmail();
            const credential = GoogleAuthProvider.credentialFromResult(signupWithGmail())
            navigate("/chat");
        } catch (err) {
            console.log(err);
        }
    };
    const handleGitHubSignin = async () => {
        try {
            await signupWithGitHub();
            const credential = GithubAuthProvider.credentialFromResult(signupWithGitHub())

            navigate("/chat");
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="container">
            <form className="mt-5 py-5 px-5" onSubmit={handleSubmit}>
                <h1>
                    Sign Up to
                    <Link className="title ml-2" to="/">Chatty</Link>
                </h1>
                <p className="lead">Fill in the form below to create an account.</p>
                <div className="form-group">
                    <input className="form-control" placeholder="Email" name="email" type="email" onChange={handleChange} value={email}></input>
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password" onChange={handleChange} value={password} type="password"></input>
                </div>
                <div className="form-group">
                    {error ? <p className="text-danger">{error}</p> : null}
                    <button className="btn btn-primary px-5" type="submit">Sign up</button>
                </div>
                <p>You can also sign up with any of these services</p>
                <button className="btn btn-danger mr-2" type="button" onClick={handleGoogleSignin}>
                    Sign up with Google
                </button>
                <button className="btn btn-secondary" type="button" onClick={handleGitHubSignin}>
                    Sign up with GitHub
                </button>
                <hr></hr>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )

}       