import React from "react";
import { Container } from 'semantic-ui-react';
import DevNav from "../components/DevNav";
import DevHeader from "../components/DevHeader";
import DevContainer from '../components/DevContainer'
import DevTable from '../components/DevTable'
import "./developer.css";

function Developer() {

  return (
    <div className="devPage">
      <DevNav />
      <Container>
        <DevHeader className="welcome" />
      </Container>
      <DevContainer />
      <DevTable />

    </div>
  );
}

export default Developer;