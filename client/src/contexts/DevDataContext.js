import React from "react";

//  This should be a complete record of everything to/from the database for the developer. 

const DevDataContext = React.createContext({
    devData: {},
    displayRepos: [],
    filteredRepos: [],
    setDevData: () => { }
});

// console.log('in DevDataContext ', DevDataContext._currentValue)

export default DevDataContext;
