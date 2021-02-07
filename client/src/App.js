import React, { useState, useMemo, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from './utils/API';
import Developer from "./pages/Developer";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Settings from "./pages/Settings/Settings";
import DevDataContext from "./contexts/DevDataContext";
import SetupContext from "./contexts/SetupContext";
import CreateAccountComp from "./components/CreateAccountcomp";

// devData - This is in the format of how we are reading the database.
// state is set after call to db for active developer info and repos to display
const App = () => {
  const setupCtx = useContext(SetupContext);
  console.log('APP init setupCtx', setupCtx)
  console.log('APP setup isLoaded', JSON.stringify(setupCtx.state.isLoaded))

  const devCtx = useContext(DevDataContext);
  console.log('APP devCtx', devCtx)

  // variable to control routing
  let initialized = false;
  if (localStorage.getItem("jtsy-signin") === "true") {
    initialized = true;
  }

  // If user is active, update devDataContext and set initialized = true
  useEffect(() => {
    if (initialized) {
      console.log('APP useEffect signin=true, redirect to Home page');
      if (localStorage.getItem('jtsy-login') === 'true') {
        setupCtx.updateLoggedIn();
      }
      API.getActiveDevData().then((activeDevData) => {
        console.log('APP activeDevData', activeDevData);

        const developerData = {
          developerLoginName: activeDevData.data.developerLoginName,
          developerGithubID: activeDevData.data.developerGithubID,
          repositories: activeDevData.data.repositories,
          displayRepos: activeDevData.data.displayRepos,
          fname: activeDevData.data.fname,
          lname: activeDevData.data.lname,
          email: activeDevData.data.email,
          linkedInLink: activeDevData.data.linkedInLink,
          resumeLink: activeDevData.data.resumeLink,
          active: true
        }
        console.log('APP after DB call', developerData)
        // update dev context with current user
        devCtx.updateDev(developerData)
        setupCtx.updateInitialized();

      })
    };
  }, [])

  console.log('APP initialized', initialized)
  // if (localStorage.getItem("jtsy-signin") === "true") {
  //   console.log('signin=true, redirect to Home page')
  //   return (
  //     <div>
  //       <Home />
  //     </div>)
  // } else {
  //   console.log('No dev/ to CAC')
  //   return (
  //     <div>
  //       <CreateAccountComp />
  //     </div>
  //   );
  // }


  // if (!setupCtx.isLoaded) {
  //   console.log('APP isloaded', JSON.stringify(setupCtx.state.isLoaded), 'to Signin/CAC')
  //   return (
  //     <CreateAccountComp />
  //   )
  // } else {
  //   console.log('APP isLoaded',)
  //   return (
  //     <Home />
  //   )
  // }

  return (
    <div>

      <React.Fragment>
        <Router>
          <Switch>
            {initialized ? (
              <Route exact path="/" component={Home} />
            ) : (
                <Route exact path="/" component={CreateAccountComp} />
              )}
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/developer" component={Developer} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signin" component={CreateAccountComp} />
            <Route exact path="/settings" component={Settings} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </React.Fragment>

    </div >
  );
};

export default App;
