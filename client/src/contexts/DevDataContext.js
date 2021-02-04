import React, { useState } from "react";

//  This should be a complete record of everything to/from the database for the developer. 

const DevDataContext = React.createContext();

// create a provider component
// respositories = all repos
// displayRepos = repos displayed on Home page
// filteredRepos > for sorting
export const DevDataProvider = props => {
    const [state, setState] = useState({
        developerLoginName: "",
        developerGithubID: "",
        lname: "",
        fname: "",
        email: "",
        linkedInLink: "",
        resumeLink: "",
        active: true,
        repositories: [],
        displayRepos: [],
        filteredRepos: [],
    });

    return (
        <DevDataContext.Provider value={
            {
                state: state,
                updateDev: (devData) => {
                    setState({
                        ...state,
                        developerLoginName: devData.developerLoginName,
                        developerGithubID: devData.developerGithubID,
                        fname: devData.fname,
                        lname: devData.lname,
                        email: devData.email,
                        linkedInLink: devData.linkedInLink,
                        resumeLink: devData.resumeLink,
                        repositories: devData.repositories
                    })
                }
            }
        } >
            { props.children}
        </DevDataContext.Provider>
    )
}

console.log('in DevDataContext ', DevDataContext._currentValue)

export default DevDataContext;
