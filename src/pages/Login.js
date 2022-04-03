import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { signin } from '../helpers/auth';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.googleSignIn = this.googleSignIn.bind(this);
        // this.githubSignIn = this.githubSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });
        try {
            // TODO: aca da error la funcion y entra al catch
            await signin(this.state.email, this.state.password);
        } catch (error) {
            console.error(error.message);
            this.setState({ error: error.message });
        }
    }

    // async googleSignIn() {
    //     try {
    //         await signInWithGoogle();
    //     } catch (error) {
    //         this.setState({ error: error.message });
    //     }
    // }

    // async githubSignIn() {
    //     try {
    //         await signInWithGitHub();
    //     } catch (error) {
    //         this.setState({ error: error.message });
    //     }
    // }

    render() {
        return (
            <div className="container">
                <form
                    className="mt-5 py-5 px-5"
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                >
                    <h1>
                        Login to
                        <Link className="title m-2" to="/">
                            Chatty
                        </Link>
                    </h1>
                    <p className="lead">
                        Fill in the form below to login to your account.
                    </p>
                    <div className="form-group">
                        <input
                            className="form-control m-2"
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control m-2"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            type="password"
                        />
                    </div>
                    <div className="form-group m-2">
                        {this.state.error ? (
                            <p className="text-danger">{this.state.error}</p>
                        ) : null}
                        <button className="btn btn-primary px-5" type="submit">Login</button>
                    </div>
                    <br />
                    <p className='m-2'>You can also log in with any of these services</p>
                    {/* <button className="btn btn-secondary m-2" type="button" onClick={this.googleSignIn}>
                        Sign in with Google
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={this.githubSignIn}>
                        Sign in with GitHub
                    </button>
                    <hr /> */}
                    <p>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>

            </div>
        );
    }
}
