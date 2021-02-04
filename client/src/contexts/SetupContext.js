import React, { useState } from 'react';

const SetupContext = React.createContext();

// create a provider component
export const SetupProvider = (props) => {
    const [state, setState] = useState({
        isLoaded: false,
        initialized: false,
        loggedIn: false
    });

    return (
        <SetupContext.Provider value={
            {
                state: state,
                updateIsLoaded: () => {
                    !state.isLoaded ? setState({ ...state, isLoaded: true }) : setState({ ...state, isLoaded: false });
                },
                updateInitialized: () => {
                    !state.initialized ? setState({ ...state, initialized: true }) : setState({ ...state, initialized: false });
                },
                updateLoggedIn: () => {
                    !state.loggedIn ? setState({ loggedIn: true }) : setState({ loggedIn: false });
                }
            }
        }>
            {props.children}
        </SetupContext.Provider>
    )
}

export default SetupContext;