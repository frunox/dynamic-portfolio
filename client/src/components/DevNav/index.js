import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { Menu, Button } from 'semantic-ui-react';
import API from "../../utils/API";
import DevDataContext from '../../contexts/DevDataContext'
import SetupContext from '../../contexts/SetupContext';
import "./style.css";

Modal.setAppElement(document.getElementById('root'))

const DevNav = () => {
  let [state, setState] = useState({})
  const devCtx = useContext(DevDataContext)
  const setupCtx = useContext(SetupContext)

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

  let openModal = setupCtx.state.settingsModalOpen;
  const isLoggedIn = JSON.parse(localStorage.getItem("jtsy-login"));
  console.log('DEVNAV isloggedIn', isLoggedIn)
  useEffect(() => {
    console.log('DEVNAV useEffect isLoggedIn', isLoggedIn)
    setState(settings)
  }, [devCtx.state])

  // console.log("DEVNAV state", state)

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
    setupCtx.openSettingsModal(false)
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value)
    setState({ ...state, [name]: value });
  };

  const logInHandler = () => {
    // setupCtx.openSettingsModal(false);
    console.log('SETTINGSModal loginHandler')
    setupCtx.openLoginModal(true)
  }

  const openLoginModal = () => {
    // console.log('DEVNAV in openLoginModal')
    // setupCtx.updateLoggedIn()
    setupCtx.openLoginModal(true)
  }

  const openLogoutModal = () => {
    // console.log('DEVNAV in openLogoutModal')
    // setupCtx.updateLoggedIn()
    setupCtx.openLogoutModal(true)
  }

  const openSettingsModal = () => {
    // console.log('DEVNAV in openSettingsModal')
    // setupCtx.updateLoggedIn()
    setupCtx.openSettingsModal(true)
  }

  let content = (
    <div>
      <Menu inverted stackable fixed="top" className="menu">
        <Menu.Item header className="logo">{devCtx.state.fname} {devCtx.state.lname}</Menu.Item>
        <Menu.Menu position="left">
          <Menu.Item as="a" href="/" name="home">
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item as="a" href="/about" name="about">
          </Menu.Item>

          <Menu.Item as="a" href="/contact" name="contact">
          </Menu.Item>

          <Menu.Item as="a" icon="setting" onClick={openSettingsModal}>
          </Menu.Item>

          {!isLoggedIn ? (
            <Menu.Item name="login" onClick={openLoginModal}>
            </Menu.Item>
          ) : (
              <Menu.Item name="logout" onClick={openLogoutModal}>
              </Menu.Item>
            )
          }

        </Menu.Menu>
      </Menu>

      <Modal isOpen={openModal} onRequestClose={() => setupCtx.openSettingsModal(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(155, 155, 155, 0.5)'
          },
          content: {
            borderRadius: '10px',
            top: '90px',
            border: '1px solid black',
            width: '500px',
            margin: '0 auto',
            height: '440px'
          }
        }}
      >
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
          {console.log('DEVNAV Button', isLoggedIn)}
          {isLoggedIn && (
            <div className="createAccount">
              <Button color='teal' type="submit">Change Settings</Button>
            </div>)
          }
        </form>
        {console.log('DEVNAV isLoggedIn', isLoggedIn)}
        {!isLoggedIn &&
          (
            <div className="createAccount">
              <Button color="red" type="submit" onClick={logInHandler}>Log In to Change Settings</Button>
            </div>
          )}
      </Modal>
    </div >
  )
  return content
}

export default DevNav;