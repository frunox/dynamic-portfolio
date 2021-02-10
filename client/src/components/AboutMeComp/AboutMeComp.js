import React from "react";
import "./style.css";


function AboutMeComp() {

  return (

    <div className="aboutContainer aboutWrapper">
      <div className="container">
        <p className="top"></p>
        <h3 className="title">About Dynamic Portfolio</h3>

        <p>
          My portfolio is built using <a href="https://github.com/frunox/dynamic-portfolio" rel="noopener noreferrer" target="_blank">Dynamic Portfolio</a> Dynamic Portfolio, an app that automatically creates a curated portfolio from a developer's GitHub projects. The portfolio is presented in a standardized format for potential employers, or others, to view.  Originally conceived as <a href="https://github.com/frunox/jtsy" rel="noopener noreferrer" target="_blank">jtsy Portfolio</a> by Shawn Hayes and co-developed with Tom van Deusen and Yeng Vang, I've taken the template, made it more performant, and customized it to show my projects with my styling. See more about the project in the  readme file.
      </p>


      </div>
    </div >
  );
}
export default AboutMeComp;
