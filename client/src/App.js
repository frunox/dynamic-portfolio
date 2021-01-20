import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Developer from "./pages/Developer";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signin from "./pages/Signin/Signin";
import Settings from "./pages/Settings/Settings";
import API from "./utils/API";
import DevDataContext from "./contexts/DevDataContext";
import SetupContext from "./contexts/SetupContext";

// devData - This is in the format of how we are reading the database.
// state is set after call to db for active developer info and repos to display
const App = () => {
  const [devData, setDevData] = useState({
    repositories: [],
    developerLoginName: "",
    developerGithubID: "",
    fname: "",
    lname: "",
    email: "",
  });
  const devDataProvider = useMemo(() => ({ devData, setDevData }), [
    devData,
    setDevData,
  ]);

  // setup - This tracks our initialization process.
  const [setup, setSetup] = useState({
    isLoaded: false,
    initialized: false,
    loggedIn: false,
  });
  const setupProvider = useMemo(() => ({ setup, setSetup }), [setup, setSetup]);
  // console.log('App.js setup.initialized ', setup.initialized, setup.isLoaded)
  // console.log("App.js setup.loggedIn: ", setup.loggedIn)

  // On load find active user
  useEffect(() => {
    // console.log("1. App.js useEffect");
    // activeDevData is current user info + repos w/activeFlag = true
    // go to utils/API to call
    API.getActiveDevData().then((activeDevData) => {

      if (activeDevData.data) {
        console.log('7. in App.js from controller', activeDevData.data.fname)
        setDevData(activeDevData.data);
        setSetup({
          isLoaded: true,
          initialized: true,
          loggedIn: false
        });
        console.log('loggedIn: ', setup.loggedIn)
        // console.log('after setting state and rendering, call getsync', activeDevData.data.developerLoginName)
        // API.getsync();
        let github = activeDevData.data.developerLoginName;
        // console.log('7a. after setting state and rendering, call getsync', github)
        API.getsync(github);
      } else {
        // console.log('in App.js useEffect, no existing dev')
        setSetup({
          isLoaded: true,
          initialized: false,
          loggedIn: false
        });
        // console.log('loggedIn: ', setup.loggedIn)
      }
    });
    // console.log('App.js SetupContext ', SetupContext._currentValue)
    // console.log("App.js end initial load", setup.initialized);
  }, []);
  // console.log('SetupContext: ', SetupContext._currentValue);
  // console.log("setup.initialized", setup.initialized);
  // console.log("setup.isLoaded", setup.isLoaded);
  // console.log("setup.loggedIn", setup.loggedIn);
  // console.log('devDataProvider: ', devDataProvider);
  // console.log('setupProvider: ', setupProvider);
  return (
    <div>
      {setup.isLoaded ? (
        <React.Fragment>
          <Router>
            <Switch>
              <DevDataContext.Provider value={devDataProvider}>
                <SetupContext.Provider value={setupProvider}>
                  {setup.initialized ? (
                    <Route exact path="/" component={Home} />
                  ) : (
                      <Route exact path="/" component={Signin} />
                    )}
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/developer" component={Developer} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/signin" component={Signin} />
                  <Route exact path="/settings" component={Settings} />
                </SetupContext.Provider>
              </DevDataContext.Provider>
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default App;
