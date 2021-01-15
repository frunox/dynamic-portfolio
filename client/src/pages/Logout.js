import React from "react";
import LogoutForm from "../components/LogoutForm";
import DevNav from "../components/DevNav";
// import "./settings.css";

function Logout() {
    console.log('in /pages/Logout.js')
    // const { devData, setDevData } = useContext(DevDataContext);

    // handleInputChange is passed to Settings component
    // const handleInputChange = (e) => {
    //     console.log('Logout handleInputChange')
    // };

    return (
        <div>
            <DevNav />
            <LogoutForm></LogoutForm>
        </div>
    );

}

export default Logout;