import React, { useState, useMemo, useContext } from "react";
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
import DevDataContext from "./contexts/DevDataContext";
import SetupContext from "./contexts/SetupContext";

// devData - This is in the format of how we are reading the database.
// state is set after call to db for active developer info and repos to display
const App = () => {

  const { devData, setDevData } = useContext(DevDataContext);
  console.log('devData check', devData, typeof devData)
  const devDataProvider = useMemo(() => ({ devData, setDevData }), [
    devData,
    setDevData,
  ]);

  // setup - This tracks our initialization process.
  const [setup, setSetup] = useState({
    isLoaded: false,
    initialized: false,
    loggedIn: false
  });
  const setupProvider = useMemo(() => ({ setup, setSetup }), [setup, setSetup]);
  // console.log('App.js setup.initialized ', setup.initialized, setup.isLoaded)
  // console.log("App.js setup.loggedIn: ", setup.loggedIn)
  console.log('APP setup values', setup.isLoaded, setup.initialized, setup.loggedIn)
  // On load find active user
  if (!setup.isLoaded) {
    setSetup({
      ...setup,
      isLoaded: true,
    })
    console.log('APP isloaded', setup.isLoaded, 'to Signin/CAC')
    return (
      <Signin />
    )
  } else {
    // setSetup({
    //   ...setup,
    //   initialized: true
    // })
  }
  return (
    <div>
      (
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
      )
    </div>
  );
};

export default App;
