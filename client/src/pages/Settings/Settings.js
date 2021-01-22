import React from "react";
import SettingsComp from "../../components/Settings";
import DevNav from "../../components/DevNav";
import "./settings.css";

function Settings() {
    console.log('in /pages/Settings.js')

    return (
        <div>
            <DevNav />
            <SettingsComp />
        </div>
    );

}

export default Settings;
