import React, { useState, useContext } from "react";
import Modal from 'react-modal';
import API from "../../utils/API";
import { useHistory } from 'react-router-dom';
// import './styles.css'

import DevDataContext from '../../contexts/DevDataContext';
import SetupContext from '../../contexts/SetupContext';

Modal.setAppElement(document.getElementById('root'))

// console.log('in LogoutModal')

var tableData = []
var filteredList = []

const RepoModal = () => {
  const devCtx = useContext(DevDataContext);
  const setupCtx = useContext(SetupContext);
  // console.log("LOGOUTMODAL setupCtx", setupCtx)
  const [state, setState] = useState({
    id: null,
    column: null,
    data: null,
    sort: null,
    direction: null,
    rowClick: -1,
    activeFlag: "false",
    deploymentLink: "",
    imageLink: "",
    repoName: "",
    filteredRepos: null,
    searched: -1,
    searchID: null,
    keywords: "",
    login: false
  })

  // const [modalIsOpen, setModalIsOpen] = useState(false)

  const history = useHistory();

  let openModal = setupCtx.state.repoModalOpen;
  // console.log('LOGINMODAL openModal', openModal)

  const updateFlag = (id) => {
    // console.log('change Flag clicked', id, tableData[id].activeFlag)
    if (tableData[id].activeFlag === 'false') {
      tableData[id].activeFlag = 'true';
    } else {
      tableData[id].activeFlag = 'false';
    }
    // console.log('in updateFlag ', tableData[id].activeFlag)
    setState({
      ...state,
      activeFlag: tableData[id].activeFlag,
    });
    // console.log(state.id, { activeFlag: state.activeFlag })
    updateDB(state.id, { activeFlag: tableData[id].activeFlag })

  };

  const updateDB = (id, property) => {
    console.log('in updateDB:  ', id, property)
    API.updateRepositories(id, property)
      .then(res => {
        console.log('7. success', state.imageLink);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleLinkChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // console.log('handleLinkChange: ', name, value)
    // Updating the input's state
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLinkUpdate = (event) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    setState({
      ...state,
      rowClick: -1,
    });
    // console.log('in handleLinkUpdate ', state.keywords)
    updateDB(state.id, { deploymentLink: state.deploymentLink, imageLink: state.imageLink, keywords: state.keywords })
  }

  let content = (
    <div className='App'>
      <Modal isOpen={openModal} onRequestClose={() => setupCtx.openRepoModal(false)}
        // shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(155, 155, 155, 0.5)'
          },
          content: {
            borderRadius: '10px',
            top: '90px',
            // bottom: '30%',
            height: '275px',
            border: '1px solid black',
            width: '400px',
            margin: 'auto'
          }
        }}
      >
        <h1>Update Repository:  <span>{state.repoName}</span></h1>
        <form>
          <label className="inputLabel">Current Display Status: {state.activeFlag}</label>
          <input type='checkbox'
            className="inputLabel"
            label='Display'
            checked={state.activeFlag === 'true'}
            onChange={() => updateFlag(state.rowClick)}
          />
        </form>
        <form onSubmit={(event) => handleLinkUpdate(event)}>
          <div>Current Deployment URL:</div>
          <label className="inputLabel">{state.deploymentLink}</label>
          <input className="urlBox" name="deploymentLink" label='Deployment URL: ' placeholder="new link" value={state.value} onChange={(event) => handleLinkChange(event)} />
        </form>
        <form>
          <div>Current Image Link:</div>
          <label className="inputLabel">{state.imageLink}</label>
          <input className="urlBox" name="imageLink" label='Image URL: ' placeholder="new link" value={state.value} onChange={(event) => handleLinkChange(event)} />
        </form>
        <form>
          <div>Add Keywords:</div>
          <label className="inputLabel">{state.keywords}</label>
          <input className="urlBox" name="keywords" label='Keywords: ' placeholder="keywords..." value={state.value} onChange={(event) => handleLinkChange(event)} />
        </form>
        <button color="teal" fluid active
          type="submit"
        >
          Update
        </button>
      </Modal >
    </div >
  );
  return content;
}

export default RepoModal;
