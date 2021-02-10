import React, { useState, useContext, useEffect } from "react";
import { Redirect } from 'react-router'
import API from "../../utils/API";
import LoginForm from '../LoginForm/LoginModal'
import DevDataContext from "../../contexts/DevDataContext";
import SetupContext from "../../contexts/SetupContext";

console.log('in Settings')

const SettingsComp = () => {
    const devCtx = useContext(DevDataContext);
    console.log("SETTINGS devCtx", devCtx.state, typeof devCtx.state)

    const setupCtx = useContext(SetupContext);
    console.log("SETTINGS setupCtx", setupCtx)

    // let testName = devCtx.state.fname
    // console.log('testName', testName, typeof testName)

    const [state, setState] = useState({})

    let settings = {
        developerLoginName: devCtx.state.developerLoginName,
        developerGithubID: devCtx.state.developerGithubID,
        firstName: devCtx.state.fname,
        lastName: devCtx.state.lname,
        email: devCtx.state.email,
        linkedInLink: devCtx.state.linkedInLink,
        resumeLink: devCtx.state.resumeLink,
        redirect: false
    }

    console.log('Settings settings', settings)

    useEffect(() => {
        setState(settings)
    }, [devCtx.state])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("in Settings handleSubmit", devCtx.state.fname);
        const revDevData = {
            developerLoginName: devCtx.state.developerLoginName,
            developerGithubID: devCtx.state.developerGithubID,
            fname: state.firstName,
            lname: state.lastName,
            email: state.email,
            linkedInLink: state.linkedInLink,
            resumeLink: state.resumeLink,
        }
        console.log('in Settings: call updateDeveloper', revDevData.developerGithubID)
        API.revDeveloper(revDevData)
        setupCtx.updateDevUpdated(true);
        setState({
            ...state,
            redirect: true,
        })

    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value)
        setState({ ...state, [name]: value });
    };

    let content = (
        <div className="wrapper">
            {!setupCtx.state.loggedIn && (
                <LoginForm />
            )}
            <div className="form-wrapper">
                <h1>Revise User Information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="firstName">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            placeholder={state.firstName}
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            placeholder={state.lastName}
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder={state.email}
                            type="email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    {/* LinkedIn */}
                    <div className="linkedInLink">
                        <label htmlFor="linkedInLink">LinkedIn link</label>
                        <input
                            placeholder={state.linkedInLink}
                            type="text"
                            name="linkedInLink"
                            onChange={handleChange}
                        />
                    </div>
                    {/* LinkedIn */}
                    {/* resume */}
                    <div className="resumeLink">
                        <label htmlFor="resumeLink">Resume Link</label>
                        <input
                            placeholder={state.resumeLink}
                            type="text"
                            name="resumeLink"
                            onChange={handleChange}
                        />
                    </div>
                    {console.log('SETTINGS state', state)}
                    <div className="createAccount">
                        <button type="submit">Change Settings</button>
                    </div>
                </form>
                {state.redirect && (
                    <Redirect to={'/developer'} />
                )}
            </div>
        </div>
    );
    return content;
}

export default SettingsComp;