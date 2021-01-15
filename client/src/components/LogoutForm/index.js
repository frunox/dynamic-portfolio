import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import { Redirect } from 'react-router'
import API from "../../utils/API";
import './style.css';

// console.log('in LoginForm')

// handleInputChange is a prop from page Signin.js
const LogoutForm = () => {
    // const { devData } = useContext(DevDataContext);
    // const { setup } = useContext(SetupContext);
    const [state, setState] = useState({
        loggedIn: null,
        clearUser: false
    });

    console.log('LogoutForm, LS/state=login: ', localStorage.getItem("jtsy-login"), state.loggedin)
    // handleInputChange is a prop from page Signin.js
    const logout = () => {
        // console.log('Logout logout');
        localStorage.setItem("jtsy-login", "false");
        setState({
            ...state,
            loggedIn: false
        })
    };

    const removeUser = () => {
        // console.log('LogoutForm removeUser');
        API.deleteDeveloper();
        localStorage.clear();
        setState({
            ...state,
            clearUser: true
        })
    };

    const developer = () => {
        // console.log('Logout developer');
        setState({
            ...state,
            loggedIn: true
        })
    };

    let content = (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1>Log Out</h1>
                <div
                    className="logoutButton"
                    onClick={logout}
                >
                    <button type="submit">Confirm</button>
                </div>
                <div
                    className="removeButton"
                    onClick={removeUser}
                >
                    <button type="submit">Remove All User Data</button>
                </div>
                <div
                    className="createAccount"
                    onClick={developer}
                >
                    <button type="submit">Return</button>
                </div>
                {state.loggedIn === false && (
                    <Redirect to={'/'} />
                )}
                {state.loggedIn && (
                    <Redirect to={'/developer'} />
                )}
                {state.clearUser && (
                    <Redirect to={'/signin'} />
                )}
            </div>
        </div>
    );
    return content;
}

export default LogoutForm;
