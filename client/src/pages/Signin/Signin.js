import React, { useContext } from "react";
import CreateAccountComp from "../../components/CreateAccountcomp";
import SetupContext from "../../contexts/SetupContext";
import Home from "../Home";
import "./Signin.css";

function SignIn() {
  // console.log('in /pages/Signin.js')
  // const { devData, setDevData } = useContext(DevDataContext);
  const { setup, setSetup } = useContext(SetupContext);
  // console.log('loggedIn: ', setup.loggedIn)
  // console.log('in Signin.js setup.initialized: ', setup.initialized)

  console.log('Signin SetupContext ', SetupContext._currentValue.setup)

  // handleInputChange is passed to createAccountComp, where input into the form sets loggedIn: true
  const handleInputChange = (e) => {
    console.log('Signin handleInputChange, set loggedIn: true')
    // setLoggedIn({ loggedIn: true });
    setSetup({ ...setup, isLoaded: true });
  };

  console.log(localStorage.getItem("jtsy-signin"))

  if (localStorage.getItem("jtsy-signin") === "true") {
    console.log('in Signin.js, redirect to Home page')
    return (
      <div>
        <Home />
      </div>)
  } else {
    console.log('Signin else')
  }

  return (
    <div>
      <CreateAccountComp
        handleInputChange={handleInputChange}
      ></CreateAccountComp>
    </div>
  );
}

export default SignIn;
