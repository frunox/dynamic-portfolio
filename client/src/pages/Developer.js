import React, { useState, useContext, useEffect } from "react";
import { Container } from 'semantic-ui-react';
import DevNav from "../components/DevNav";
import DevHeader from "../components/DevHeader";
import DevContainer from '../components/DevContainer'
import DevTable from '../components/DevTable';
import LoginModal from '../components/LoginForm/LoginModal'
import LogoutModal from '../components/LogoutForm/LogoutModal'
// import SettingsModal from '../components/Settings/SettingsModal'

import "./developer.css";

function Developer() {
  // let isLoggedIn = JSON.parse(localStorage.getItem('jtsy-login'))

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
    </div>
  );
}

export default Developer;