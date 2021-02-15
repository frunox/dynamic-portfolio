import React, { useState, useContext, useEffect } from "react";
import { Container } from 'semantic-ui-react';
import DevNav from "../components/DevNav";
import DevHeader from "../components/DevHeader";
import DevContainer from '../components/DevContainer'
import DevTable from '../components/DevTable';
import LoginModal from '../components/LoginForm/LoginModal'
import LogoutModal from '../components/LogoutForm/LogoutModal'
import RepoModal from '../components/RepoModal/RepoModal'
import SetupContext from '../contexts/SetupContext';
import "./developer.css";

function Developer() {
  // const setupCtx = useContext(SetupContext)
  const [, setState] = useState()

  let login = localStorage.getItem("jtsy-login");

  useEffect(() => {
    // console.log("DEVELOPER useEffect", login)
    setState({})
  }, [login])


  return (
    <div className="devPage">
      <DevNav />
      <Container>
        <DevHeader className="welcome" />
      </Container>
      <DevContainer />
      <DevTable />
      <LoginModal />
      <LogoutModal />
      <RepoModal />
    </div>
  );
}

export default Developer;