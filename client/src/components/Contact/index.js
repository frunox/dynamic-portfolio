import React, { useContext } from "react";
import EmailForm from "../EmailForm"
import DevDataContext from "../../contexts/DevDataContext";
import "./contactStyle.css"


function ContactComp() {
  const { devData } = useContext(DevDataContext);
  const githubLink = `https://github.com/${devData.developerLoginName}/`
  return (
    <div className="contactContainer">
      <div className="container">
        <h2>Thank you for visiting!</h2>
        <h3>Connect with me via:</h3>
        <p>
          <a className="links" href={githubLink} rel="noopener noreferrer" target="_blank" alt="GitHub link">
            GitHub
          </a>
        </p>
        <p>
          <a className="links" href={devData.linkedInLink} rel="noopener noreferrer" target="_blank" alt="LinkedIn link">
            LinkedIn
          </a>
        </p>
        <p>
          <h3 classname="email">And Via Email at jrcannon@msn.com</h3>
          <EmailForm />
        </p>
      </div>
    </div>

  )
}
export default ContactComp;