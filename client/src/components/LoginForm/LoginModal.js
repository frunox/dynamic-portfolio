import React, { useState, useContext } from "react";
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import md5 from 'blueimp-md5';
import './style.css'

import SetupContext from '../../contexts/SetupContext';

Modal.setAppElement(document.getElementById('root'))

// console.log('in LoginForm')

const LoginModal = () => {
  const setupCtx = useContext(SetupContext);
  // console.log("LOGINMODAL setupCtx", setupCtx)
  const [state, setState] = useState({
    githubID: "",
    password: "",
    loggedIn: false
  });

  // const [modalIsOpen, setModalIsOpen] = useState(false)

  const history = useHistory();

  let openModal = setupCtx.state.openLoginModal;
  // console.log('LOGINMODAL openModal', openModal)

  // console.log('in LoginModal, LSlogin: ', localStorage.getItem("jtsy-login"))
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Login handleSubmit', state.password, state.loggedIn);
    let hash = md5(state.password);
    if (hash === localStorage.getItem('jtsy-password')) {
      localStorage.setItem("jtsy-login", "true");

    } else {
      alert('Re-enter password')
    }
    setState({
      ...state,
      loggedIn: true
    })
    // history.length > 0 ? history.replace('/developer') : history.replace('/developer');
    // history.goBack();
    // history.replace('/developer')
    history.push("/developer")
    setupCtx.updateLoggedIn();
    setupCtx.openLoginModal(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log('handleChange', name, value)
    setState({ ...state, [name]: value });
    // console.log(name, value)
  };

  const goBack = () => {
    setupCtx.openLoginModal(false);
    history.replace('/developer')
  }

  let content = (
    <div className='App'>
      <Modal isOpen={openModal} onRequestClose={() => setupCtx.openLoginModal(false)}
        // shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(155, 155, 155, 0.5)'
          },
          content: {
            borderRadius: '10px',
            top: '90px',
            left: '25%',
            right: '25%',
            bottom: '30%',
            border: '1px solid black',
            width: '400px',
            margin: 'auto'
          }
        }}
      >
        <h1>Log In</h1>
        <h4>* - Denotes Required Field</h4>
        <form onSubmit={handleSubmit}>
          {/* Git hub */}
          <div className="githubID">
            <label htmlFor="githubID">Github ID*</label>
            <input
              placeholder="Github ID"
              type="text"
              name="githubID"
              required
              onChange={handleChange}
            />
          </div>
          {/* Git hub */}
          <div className="password">
            <label htmlFor="password">Password*</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
              onChange={handleChange}
            />
          </div>
          <div className="createAccount">
            <button type="submit">Log In</button>
          </div>
        </form>
        <div className="goBack">
          <button onClick={goBack}>Go Back</button>
        </div>
      </Modal>
    </div >
  );
  return content;
}

export default LoginModal;
