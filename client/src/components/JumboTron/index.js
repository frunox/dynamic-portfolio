import React, { useContext } from "react";
import { Segment, Container } from "semantic-ui-react";
import DevDataContext from "../../contexts/DevDataContext";
import './style.css'

export const Jumbotron = () => {
  const devCtx = useContext(DevDataContext);
  console.log('jumbotron: ', devCtx.state.fname, devCtx.state.lname)
  return (
    <Segment className="jumbo text-center">
      <div className="overlay"></div>
      <Container>
        <br />
        <h1 className="greeting">Welcome to the portfolio page for</h1>
        <h1 className="greeting">{devCtx.state.fname} {devCtx.state.lname}</h1>
        <br />
        <h2>
          A web developer. Design, management and planning experience.  Bringing projects to life!
        </h2>
      </Container>
    </Segment>
  );
}