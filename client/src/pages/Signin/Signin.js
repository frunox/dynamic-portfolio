import React, { useContext } from "react";
import CreateAccountComp from "../../components/CreateAccountcomp";
import Home from "../Home";
import "./Signin.css";

function SignIn() {
  // console.log('in /pages/Signin.js')
  // const { devData, setDevData } = useContext(DevDataContext);
  // console.log('loggedIn: ', setup.loggedIn)
  // console.log('in Signin.js setup.initialized: ', setup.initialized)


  console.log(localStorage.getItem("jtsy-signin"))

  if (localStorage.getItem("jtsy-signin") === "true") {
    console.log('in Signin.js, redirect to Home page')
    return (
      <div>
        <Home />
      </div>)
  } else {
    console.log('Signin no dev/ to CAC')
    return (
      <div>
        <CreateAccountComp />
      </div>
    );
  }


}

export default SignIn;
