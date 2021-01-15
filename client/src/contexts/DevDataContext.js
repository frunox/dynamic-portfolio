import React from "react";

//  This should be a complete record of everything to/from the database for the developer. 

const DevDataContext = React.createContext({
    developerLoginName: "",
    developerGithubID: "",
    lname: "",
    fname: "",
    email: "",
    active: true,
    repositories: [],
    displayRepos: [],
    filteredRepos: [],
});

// console.log('in DevDataContext ', DevDataContext._currentValue)

export default DevDataContext;
