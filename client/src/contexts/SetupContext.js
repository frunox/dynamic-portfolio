import React, { useState } from 'react';

const SetupContext = React.createContext();

// create a provider component
export const SetupProvider = (props) => {
    const [state, setState] = useState({
        isLoaded: false,
        initialized: false,
        loggedIn: false,
        devUpdated: true,
        loginModalOpen: false,
        logoutModalOpen: false,
        lastPage: ""
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
                    // console.log('setupCtx updateLoggedIn')
                    !state.loggedIn ? setState({ ...state, loggedIn: true }) : setState({ ...state, loggedIn: false });
                },
                updateDevUpdated: (value) => {
                    // console.log('setupCtx updateDevUpdated', value)
                    setState({
                        ...state,
                        devUpdated: value
                    })
                }, openLoginModal: (value) => {
                    // console.log('setupCtx openLoginModal', value)
                    setState({
                        ...state,
                        openLoginModal: value
                    })
                },
                openLogoutModal: (value) => {
                    // console.log('setupCtx openLogoutModal', value)
                    setState({
                        ...state,
                        openLogoutModal: value
                    })
                },
                setLastPage: (value) => {
                    // console.log('setupCtx setLastPage', value, typeof value)
                    setState({
                        ...state,
                        lastPage: value
                    })
                },

                resetSetup: () => {
                    // console.log('setupCtx resetSetup')
                    setState({
                        isLoaded: false,
                        initialized: false,
                        loggedIn: false,
                        devUpdated: true,
                        loginModalOpen: false,
                        lastPage: ""
                    });
                }
            }
        }>
            {props.children}
        </SetupContext.Provider>
    )
}

export default SetupContext;