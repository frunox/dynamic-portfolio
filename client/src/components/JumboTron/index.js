import React, { useContext } from "react";
import { Segment, Container } from "semantic-ui-react";
import DevDataContext from "../../contexts/DevDataContext";
import './style.css'

export const Jumbotron = (props) => {
  const { devData } = useContext(DevDataContext);
  console.log('jumbotron: ', devData.fname, devData.lname)
  return (
    <Segment className="jumbo text-center">
      <div className="overlay"></div>
      <Container>
        <br />
        <h1 className="greeting">Welcome to the portfolio page for</h1>
        <h1 className="greeting">{devData.fname} {devData.lname}</h1>
        <br />
        <h2>
          A web developer. Design, management and planning experience.  Bringing projects to life!
        </h2>
      </Container>
    </Segment>
  );
}