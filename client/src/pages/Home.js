import React, { useState, useContext } from "react";
import { Jumbotron } from "../components/JumboTron";
import PortCards from "../components/PortCards/portCards";
import DevDataContext from "../contexts/DevDataContext";
import HomeNav from "../components/HomeNav";
import "./home.css";

function Home() {
  const { devData } = useContext(DevDataContext);
  console.log('HOME start devData', devData);
  const [displayRepos, setdisplayRepos] = useState({
    displayRepos: devData.repositories,
  });
  return (
    <div className='home'>
      <HomeNav />
      <Jumbotron />
      <PortCards className="cards" repositories={displayRepos.displayRepos}></PortCards>
    </div>
  );
}

export default Home;
