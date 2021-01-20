import React from "react";

//  Track if the developer is loaded and set up initialized
const SetupContext = React.createContext({
    initialized: false,
    loggedIn: false
});

// console.log('in SetupContext ', SetupContext._currentValue)

export default SetupContext;
