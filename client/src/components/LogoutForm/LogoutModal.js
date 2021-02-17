import React, { useState, useContext } from "react";
import Modal from 'react-modal';
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import { useHistory } from 'react-router-dom';
import './styles.css'

import DevDataContext from '../../contexts/DevDataContext';
import SetupContext from '../../contexts/SetupContext';

Modal.setAppElement(document.getElementById('root'))

// console.log('in LogoutModal')

const LogoutModal = () => {
  const devCtx = useContext(DevDataContext);
  const setupCtx = useContext(SetupContext);
  // console.log("LOGOUTMODAL setupCtx", setupCtx)
  const [state, setState] = useState({
    loggedIn: null,
    clearUser: false
  });

  // const [modalIsOpen, setModalIsOpen] = useState(false)

  const history = useHistory();

  let openModal = setupCtx.state.logoutModalOpen;
  console.log('LOGOUTMODAL openModal', openModal)

  const logout = () => {
    // console.log('Logout logout');
    localStorage.setItem("jtsy-login", "false");
    setState({
      ...state,
      loggedIn: false
    })
    // history.push("/home")
    setupCtx.updateLoggedIn();
    setupCtx.openLogoutModal(false);
  };

  const developer = () => {
    // console.log('Logout developer');
    setState({
      ...state,
      loggedIn: false
    })
    setupCtx.updateLoggedIn();
    setupCtx.openLogoutModal(false);
  };

  const removeUser = () => {
    // console.log('LogoutForm removeUser');
    API.deleteDeveloper();
    localStorage.clear();
    setState({
      ...state,
      clearUser: true
    });
    setupCtx.resetSetup();
    devCtx.resetDev();
    setupCtx.openLogoutModal(false);
  };

  let content = (
    <div className='App'>
      <Modal isOpen={openModal} onRequestClose={() => setupCtx.openLogoutModal(false)}
        // shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(155, 155, 155, 0.5)'
          },
          content: {
            borderRadius: '10px',
            top: '90px',
            border: '1px solid black',
            width: '400px',
            margin: '0 auto',
            height: '275px',
          }
        }}
      >
        <h1>Log Out</h1>
        <div
          className="createAccount"
          onClick={logout}>
          <button type="submit">Confirm</button>
        </div>
        <div
          className="removeButton"
          onClick={removeUser}>
          <button type="submit">Remove All User Data</button>
        </div>
        <div
          className="returnButton"
          onClick={developer}>
          <button type="submit">Return</button>
        </div>
        {!state.loggedIn && (
          <Redirect to={'/developer'} />
        )}
        {state.loggedIn && (
          <Redirect to={'/developer'} />
        )}
        {state.clearUser && (
          <Redirect to={'/'} />
        )}
      </Modal >
    </div >
  );
  return content;
}

export default LogoutModal;
