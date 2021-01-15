import React from "react";
import SettingsComp from "../../components/Settings";
import DevNav from "../../components/DevNav";
import "./settings.css";

function Settings() {
    console.log('in /pages/Settings.js')
    // const { devData, setDevData } = useContext(DevDataContext);

    // handleInputChange is passed to Settings component
    const handleInputChange = (e) => {
        console.log('Signin handleInputChange')
    };

    return (
        <div>
            <DevNav />
            <SettingsComp handleInputChange={handleInputChange}></SettingsComp>
        </div>
    );

}

export default Settings;
