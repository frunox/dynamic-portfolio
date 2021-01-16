import React, { useState } from "react";
import { Redirect } from 'react-router';
import md5 from 'blueimp-md5';

console.log('in LoginForm')

// handleInputChange is a prop from page Signin.js
const LoginForm = () => {
    const [state, setState] = useState({
        githubID: "",
        password: "",
        loggedIn: false
    });

    // console.log('in LoginForm, LSlogin: ', localStorage.getItem("jtsy-login"))
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("HMMMM leaving CreateAccountcomp");
        // props.handleInputChange();
        // console.log('Login handleSubmit', state.password, state.loggedIn);
        let hash = md5(state.password);
        if (hash === localStorage.getItem('jtsy-password')) {
            localStorage.setItem("jtsy-login", "true");
            setState({
                ...state,
                loggedIn: true
            })
        } else {
            alert('Re-enter password')
        }

    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
        // console.log(name, value)
    };

    let content = (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1>Log In</h1>
                <h4>* - Denotes Required Field</h4>
                <form onSubmit={handleSubmit}>
                    {/* Git hub */}
                    <div className="githubID">
                        <label htmlFor="githubID">Github ID*</label>
                        <input
                            placeholder="Github ID"
                            type="text"
                            name="githubID"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {/* Git hub */}
                    <div className="password">
                        <label htmlFor="password">Password*</label>
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            required
                            pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="createAccount">
                        <button type="submit">Log In</button>
                    </div>
                </form>
                {state.loggedIn && (
                    <Redirect to={'/'} />
                )}
            </div>
        </div>
    );
    return content;
}

export default LoginForm;
