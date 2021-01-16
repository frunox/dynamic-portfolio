import React from "react";
import LogoutForm from "../components/LogoutForm";
import DevNav from "../components/DevNav";
// import "./settings.css";

function Logout() {
    console.log('in /pages/Logout.js')

    return (
        <div>
            <DevNav />
            <LogoutForm></LogoutForm>
        </div>
    );

}

export default Logout;