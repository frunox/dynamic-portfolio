import React from "react";
import { Jumbotron } from "../components/JumboTron";
import PortCards from "../components/PortCards/portCards";
import HomeNav from "../components/HomeNav";
import "./home.css";

function Home() {
  console.log('HOME start');

  return (
    <div className='home'>
      <HomeNav />
      <Jumbotron />
      <PortCards className="cards"></PortCards>
    </div>
  );
}

export default Home;
