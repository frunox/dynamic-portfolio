import React from "react";
import AboutMeComp from "../components/AboutMeComp/AboutMeComp";
import AboutUser from "../components/AboutUser";
import HomeNav from "../components/HomeNav";
import './about.css'

function About() {
  return (
    <div className="about">
      <HomeNav />
      <AboutMeComp></AboutMeComp>
      <AboutUser className="aboutUser"></AboutUser>
    </div>
  );
}
export default About;
