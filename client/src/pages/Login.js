import React, { useContext } from "react";
import LoginForm from "../components/LoginForm/index.js";
import HomeNav from "../components/HomeNav";
// import SetupContext from '../contexts/SetupContext';
// import "./settings.css";

function Login() {
    console.log('in /pages/Login.js')
    // const setupCtx = useContext(SetupContext);
    // setupCtx.openLoginModal(true);

    return (
        <div>
            <HomeNav />
            <LoginForm></LoginForm>
        </div>
    );

}

export default Login;