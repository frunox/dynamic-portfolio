import React, { useContext } from 'react';
import DevDataContext from "../../contexts/DevDataContext";
import { Menu } from 'semantic-ui-react';
import "./style.css";

let loggedIn = false;

const HomeNav = () => {
  const { devData } = useContext(DevDataContext);
  console.log('some devData: ', devData.fname)
  if (localStorage.getItem("jtsy-login") === "true") {
    loggedIn = true
  }
  let content = (
    <div>
      <Menu inverted stackable fixed="top" className="menu">
        <Menu.Item header className="logo">{devData.fname} {devData.lname}</Menu.Item>
        <Menu.Menu position="left">
          <Menu.Item as="a" href="/" name="home">
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item as="a" href="/about" name="about">
          </Menu.Item>

          <Menu.Item as="a" href="/contact" name="contact">
          </Menu.Item>

          {loggedIn ? (
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