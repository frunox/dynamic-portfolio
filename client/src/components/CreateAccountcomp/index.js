import React, { useState, useContext } from "react";
import md5 from 'blueimp-md5';
import API from "../../utils/API";
import DevDataContext from "../../contexts/DevDataContext"
import SetupContext from "../../contexts/SetupContext"

// console.log('in CreateAccountcomp')

const CreateAccountComp = (props) => {
  const setupCtx = useContext(SetupContext);
  const devDataCtx = useContext(DevDataContext);

  console.log('CAC setupCtx', setupCtx);
  console.log('CAC devDataCtx', devDataCtx);
  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    linkedInLink: null,
    resumeLink: null,
    portfolioLink: null,
    githubID: null,
    loaded: null,
  });

  console.log("1. CAC get dev");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CAC data entered");
    // props.handleInputChange();
    setupCtx.updateIsLoaded();
    let hash = md5(state.password);
    // console.log('CreateAccountcomp call getsync()', state.password, hash);
    localStorage.setItem('jtsy-password', hash);
    localStorage.setItem('jtsy-signin', "true");
    localStorage.setItem('jtsy-login', "false");
    // {developerLoginName: "frunox"}, {$set: {lname: "Black", fname: "Bob"}}
    console.log('CAC state.githubID', state.githubID)
    API.getsync(state.githubID);
    // API.getActiveDevData().then((activeDevData) => {
    //   console.log('CAC activeDevData.data', activeDevData.data)
    //   setDevData(activeDevData.data);
    //   setState(activeDevData);
    // });
    const developerData = {
      developerLoginName: state.githubID,
      developerGithubID: " ",
      repositories: [],
      fname: state.firstName,
      lname: state.lastName,
      email: state.email,
      linkedInLink: state.linkedInLink,
      resumeLink: state.resumeLink,
      active: true
    }
    console.log('in createAcctComp: call updateDeveloper', developerData);
    devDataCtx.updateDev(developerData);
    API.updateDeveloper(developerData);
    console.log('CAC devDataCtx', devDataCtx)
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  let content = (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <h4>* - Denotes Required Field</h4>
        <form onSubmit={handleSubmit}>
          <div className="firstName">
            <label htmlFor="firstName">First Name*</label>
            <input
              placeholder="First Name"
              type="text"
              name="firstName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name*</label>
            <input
              placeholder="Last Name"
              type="text"
              name="lastName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          {/* Git hub */}
          <div className="githubID">
            <label htmlFor="githubID">Github ID*</label>
            <input
              placeholder="Github ID"
              type="text"
              name="githubID"
              required
              onChange={handleChange}
            />
          </div>
          {/* Git hub */}
          {/* LinkedIn */}
          <div className="linkedInLink">
            <label htmlFor="linkedInLink">LinkedIn Link</label>
            <input
              placeholder="LinkedIn link"
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
              placeholder="Resume link"
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
              placeholder="portfolio link"
              type="text"
              name="portfolioLink"
              onChange={handleChange}
            />
          </div> */}
          {/* portfolio */}
          <div className="password">
            <label htmlFor="password">Password*</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
              onChange={handleChange}
            />
          </div>
          <div className="createAccount">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
  return content;
}

export default CreateAccountComp;
