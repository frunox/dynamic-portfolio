import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import DevDataContext from '../../contexts/DevDataContext'
import SetupContext from '../../contexts/SetupContext';
import "./style.css";

const DevNav = () => {
  const devCtx = useContext(DevDataContext)
  const setupCtx = useContext(SetupContext)
  console.log('DEVNAV setupCtx', setupCtx)

  const openLoginModal = () => {
    console.log('DEVNAV in openLoginModal')
    setupCtx.updateLoggedIn()
    setupCtx.openLoginModal(true)
  }

  const openLogoutModal = () => {
    console.log('DEVNAV in openLogoutModal')
    setupCtx.updateLoggedIn()
    setupCtx.openLogoutModal(true)
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

          <Menu.Item as="a" icon="setting" href="/settings">
          </Menu.Item>

          {!setupCtx.state.loggedIn ? (
            <Menu.Item name="login" onClick={openLoginModal}>
            </Menu.Item>
          ) : (
              <Menu.Item name="logout" onClick={openLogoutModal}>
              </Menu.Item>
            )
          }

        </Menu.Menu>
      </Menu>

    </div >
  )
  return content
}

export default DevNav;