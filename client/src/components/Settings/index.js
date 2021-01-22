import React, { useState, useContext } from "react";
import { Redirect } from 'react-router'
import API from "../../utils/API";
import DevDataContext from "../../contexts/DevDataContext";

console.log('in Settings')

const SettingsComp = () => {
    console.log('in SettingsComp')
    const { devData } = useContext(DevDataContext);
    const [state, setState] = useState({
        developerLoginName: devData.developerLoginName,
        developerGithubID: devData.developerGithubID,
        firstName: devData.fname,
        lastName: devData.lname,
        email: devData.email,
        linkedInLink: devData.linkedInLink,
        resumeLink: devData.resumeLink,
        redirect: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("in Settings handleSubmit", devData.developerGithubID);
        const revDevData = {
            developerLoginName: devData.developerLoginName,
            developerGithubID: devData.developerGithubID,
            fname: state.firstName,
            lname: state.lastName,
            email: state.email,
            linkedInLink: state.linkedInLink,
            resumeLink: state.resumeLink,
        }
        console.log('in Settings: call updateDeveloper', revDevData.developerGithubID)
        API.revDeveloper(revDevData)
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
                    {/* resume */}
                    {/* portfolio */}
                    {/* <div className="portfolioLink">
                        <label htmlFor="portfolioLink">Portfolio Link</label>
                        <input
                            placeholder={state.portfolioLink}
                            type="text"
                            name="portfolioLink"
                            onChange={handleChange}
                        />
                    </div> */}
                    {/* portfolio */}
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
