import React, { useState, useContext, useEffect } from 'react'
import DevDataContext from '../../contexts/DevDataContext'

function SettingsJSX() {
  const devCtx = useContext(DevDataContext);
  console.log("SETTINGSModal devCtx", devCtx)

  const [state, setState] = useState({})

  let settings = {
    developerLoginName: devCtx.state.developerLoginName,
    developerGithubID: devCtx.state.developerGithubID,
    firstName: devCtx.state.fname,
    lastName: devCtx.state.lname,
    email: devCtx.state.email,
    linkedInLink: devCtx.state.linkedInLink,
    resumeLink: devCtx.state.resumeLink,
    redirect: false,
    login: false
  }

  useEffect(() => {
    console.log('SETTINGS useEffect')
    setState(settings)
  }, [setupCtx.state.settingsModalOpen])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value)
    setState({ ...state, [name]: value });
  };


  return (
    <div>
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
    </div>
  )
}

export default SettingsJSX
