import React, { useState, useContext } from "react";
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import md5 from 'blueimp-md5';

import SetupContext from '../../contexts/SetupContext';

console.log('in LoginForm')

const LoginForm = () => {
    const setupCtx = useContext(SetupContext);
    const history = useHistory();
    const [state, setState] = useState({
        githubID: "",
        password: "",
        loggedIn: false
    });

    // console.log('in LoginForm, LSlogin: ', localStorage.getItem("jtsy-login"))
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Login handleSubmit', state.password, state.loggedIn);
        let hash = md5(state.password);
        if (hash === localStorage.getItem('jtsy-password')) {
            localStorage.setItem("jtsy-login", "true");
            setupCtx.updateLoggedIn();
            history.length > 0 ? history.goBack() : history.replace('/developer');
        } else {
            alert('Re-enter password')
        }

    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log('history', history)
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
                {/* {setupCtx.state.loggedIn && (
                    <Redirect to={'/developer'} />
                )} */}
            </div>
        </div>
    );
    return content;
}

export default LoginForm;
