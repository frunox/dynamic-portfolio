import React, { useState, useContext } from "react";
import { Redirect } from 'react-router';
import { Form, Button, Modal, Input } from "semantic-ui-react";
import Developer from '../../pages/Developer'
import md5 from 'blueimp-md5';
import './style.css'

import SetupContext from '../../contexts/SetupContext';

console.log('in LoginForm')

const LoginForm = () => {
  const setupCtx = useContext(SetupContext);
  const [state, setState] = useState({
    githubID: "",
    password: "",
    loggedIn: false
  });

  // console.log('in LoginForm, LSlogin: ', localStorage.getItem("jtsy-login"))
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login handleSubmit', state.password, state.loggedIn);
    let hash = md5(state.password);
    if (hash === localStorage.getItem('jtsy-password')) {
      localStorage.setItem("jtsy-login", "true");

      setupCtx.updateLoggedIn();
    } else {
      alert('Re-enter password')
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log('handleChange', name, value)
    setState({ ...state, [name]: value });
    // console.log(name, value)
  };

  let content = (
    <Modal
      closeIcon
      closeOnDimmerClick="true"
      className='repoModal'
      dimmer='inverted'
      open={!setupCtx.state.loggedIn}
      size='mini'
    >
      <Modal.Header className="modalHeader">Log In</Modal.Header>
      <Modal.Content>
        <h4>* - Denotes Required Field</h4>
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            label='GitHub ID'
            placeholder="github id"
            name="githubID"
            required
            onChange={handleChange}
          />
          <Input
            type='password'
            label='Password'
            placeholder="password"
            name="password"
            required
            pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
            onChange={handleChange}
          />
          <div className="createAccount">
            <Button color='green' type="submit">Log In</Button>
          </div>
        </Form>
        <div className="createAccount">
          <Button color='grey'>Return</Button>
        </div>
        {setupCtx.state.loggedIn && (
          <Redirect to={'/developer'} />
        )}

      </Modal.Content>
      {
        setupCtx.state.loggedIn && (
          <Redirect to={'/developer'} />
        )
      }
    </Modal >
  );
  return content;
}

export default LoginForm;
