import React, { useState, useContext } from "react";
import { Jumbotron } from "../components/JumboTron";
import PortCards from "../components/PortCards/portCards";
import DevDataContext from "../contexts/DevDataContext";
import HomeNav from "../components/HomeNav";
import "./home.css";

function Home() {
  const devCtx = useContext(DevDataContext);
  console.log('HOME start devCtx', devCtx);
  const [displayRepos, setdisplayRepos] = useState({
    displayRepos: devCtx.repositories,
  });
  return (
    <div className='home'>
      <HomeNav />
      <Jumbotron />
      <PortCards className="cards"></PortCards>
    </div>
  );
}

export default Home;
