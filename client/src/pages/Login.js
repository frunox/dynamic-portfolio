import React from "react";
import LoginForm from "../components/LoginForm";
import HomeNav from "../components/HomeNav";
// import "./settings.css";

function Login() {
    console.log('in /pages/Login.js')
    // const { devData, setDevData } = useContext(DevDataContext);

    // handleInputChange is passed to Settings component
    const handleInputChange = (e) => {
        console.log('Login handleInputChange')
    };

    return (
        <div>
            <HomeNav />
            <LoginForm handleInputChange={handleInputChange}></LoginForm>
        </div>
    );

}

export default Login;