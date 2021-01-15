import React from "react";
import "./style.css";


function AboutMeComp() {

  return (

    <div className="aboutContainer aboutWrapper">
      <div className="container">
        <p className="top"></p>
        <h3 className="title">About jtsy Portfolio</h3>

        <p>
          My portfolio is built using jtsy Portfolio, an app that automatically creates a curated
          portfolio from a developer's GitHub projects. The portfolio is presented
          in a standardized format for potential employers, or others, to view.  Originally conceived by Shawn Hayes and co-developed with Tom van Deusen and Yeng Vang, I've taken the template and customized it to show my projects with my styling. See more about the project in the <a href="https://github.com/frunox/jtsy" rel="noopener noreferrer" target="_blank">GitHub</a> readme file.
      </p>


      </div>
    </div >
  );
}
export default AboutMeComp;
