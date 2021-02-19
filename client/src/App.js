import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from './utils/API';
import Developer from "./pages/Developer";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginModal from './components/LoginForm/LoginModal';
import LogoutModal from "./components/LogoutForm/LogoutModal";
import Settings from "./pages/Settings/Settings";
import DevDataContext from "./contexts/DevDataContext";
import SetupContext from "./contexts/SetupContext";
import CreateAccountComp from "./components/CreateAccountcomp";

// devData - This is in the format of how we are reading the database.
// state is set after call to db for active developer info and repos to display
const App = () => {
  const [state, setState] = useState(
    {
      loggedIn: null,
      sync: false
    }
  )

  const setupCtx = useContext(SetupContext);
  // console.log('APP init setupCtx', setupCtx)
  // console.log('APP setup devUpdated', JSON.stringify(setupCtx.state.devUpdated))

  const devCtx = useContext(DevDataContext);
  // console.log('APP devCtx', devCtx)

  let login = setupCtx.state.loggedIn;
  let sync = setupCtx.state.sync;
  // console.log('APP login', login, 'state.loggedIn', state.loggedIn)

  useEffect(() => {
    // console.log("APP useEffect login", login, state.loggedIn)
    setState(
      {
        loggedIn: login,
        sync: sync
      })
  }, [login, sync])


  // variable to control routing
  let initialized = false;
  if (localStorage.getItem("jtsy-signin") === "true") {
    initialized = true;
  }

  // If user is active, update devDataContext and set initialized = true
  useEffect(() => {
    if (initialized) {
      // console.log('APP useEffect signin=true, redirect to Home page');
      if (localStorage.getItem('jtsy-login') === 'true') {
        setupCtx.updateLoggedIn();
      }
      // console.log('APP devUpdated', setupCtx.state.devUpdated)
      if (setupCtx.state.devUpdated) {
        API.getActiveDevData().then((activeDevData) => {
          // console.log('APP activeDevData', activeDevData.data);

          const developerData = {
            developerLoginName: activeDevData.data.developerLoginName,
            developerGithubID: activeDevData.data.developerGithubID,
            repositories: activeDevData.data.repositories,
            fname: activeDevData.data.fname,
            lname: activeDevData.data.lname,
            email: activeDevData.data.email,
            linkedInLink: activeDevData.data.linkedInLink,
            resumeLink: activeDevData.data.resumeLink,
            active: true
          }
          // console.log('APP after DB call', developerData)
          // update dev context with current user
          devCtx.updateDev(developerData)
          setupCtx.updateInitialized();
          setupCtx.updateDevUpdated(false)
        })
      }
    };
  }, [setupCtx.state.devUpdated])

  // console.log('APP initialized', initialized)

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
            <Route exact path="/login" component={LoginModal} />
            <Route exact path="/logout" component={LogoutModal} />
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
