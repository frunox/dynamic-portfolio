import React, { useContext } from "react";
import { Jumbotron } from "../components/JumboTron";
import PortCards from "../components/PortCards/portCards";
import DevDataContext from "../contexts/DevDataContext";
import HomeNav from "../components/HomeNav";
import "./home.css";

function Home() {
  const { devData } = useContext(DevDataContext);

  return (
    <div className='home'>
      <HomeNav />
      <Jumbotron />
      <PortCards className="cards" repositories={devData.repositories}></PortCards>
    </div>
  );
}

export default Home;
