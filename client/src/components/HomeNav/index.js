import React, { useContext } from 'react';
import DevDataContext from "../../contexts/DevDataContext";
import SetupContext from "../../contexts/SetupContext";
import { Menu } from 'semantic-ui-react';
import "./style.css";

let loggedIn = false;

const HomeNav = () => {
  const devCtx = useContext(DevDataContext);
  const setupCtx = useContext(SetupContext);
  console.log('HOMENAV some devData: ', devCtx.state.fname)
  console.log('HOMENAV setupCtx', setupCtx)
  if (localStorage.getItem("jtsy-login") === "true") {
    loggedIn = true
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

          {setupCtx.state.loggedIn ? (
            <Menu.Item as="a" href="/developer" name="developer">
            </Menu.Item>
          ) : (
              <Menu.Item href="/login" name="login">
              </Menu.Item>
            )}
        </Menu.Menu>
      </Menu>

    </div >
  )
  return content
}

export default HomeNav;