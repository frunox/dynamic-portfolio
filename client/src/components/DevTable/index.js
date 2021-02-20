// import axios from "axios";
import _ from "lodash";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { Table, Button, Container, Checkbox, List } from "semantic-ui-react";
import DevDataContext from '../../contexts/DevDataContext';
import SetupContext from '../../contexts/SetupContext';
import API from "../../utils/API";
import RepoSearchBox from "../RepoSearchBox";
import './style.css'

Modal.setAppElement(document.getElementById('root'))

// var tableData = []
// var filteredList = []

const DevTable = () => {
  const devCtx = useContext(DevDataContext)
  let tableData = devCtx.state.repositories;
  let filteredList = tableData;
  console.log('DEVTABLE devCtx', devCtx.state)
  let dLink;

  const setupCtx = useContext(SetupContext);
  // console.log('DEVTABLE setupCtx', setupCtx)

  const history = useHistory();

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
    login: false,
    resync: 0,
  })

  // setState({
  //   ...state,
  //   data: tableData,
  //   filteredRepos: tableData
  // })
  let openModal = setupCtx.state.repoModalOpen;
  let isLoggedIn = JSON.parse(localStorage.getItem('jtsy-login'))
  let loading = JSON.parse(localStorage.getItem('dynamic-sync'))
  // devDataContext variable for re-loading
  let sync = JSON.parse(localStorage.getItem('dynamic-sync'))
  console.log('sync in DEVTABLE', sync)

  // useEffect(() => {
  //   console.log('DEVTABLE useEffect call getActiveDevData')
  //   API.getActiveDevData().then((activeDevData) => {
  //     console.log('%%%%% DevTable activeDevData', activeDevData.data);

  //     const developerData = {
  //       developerLoginName: activeDevData.data.developerLoginName,
  //       developerGithubID: activeDevData.data.developerGithubID,
  //       repositories: activeDevData.data.repositories,
  //       fname: activeDevData.data.fname,
  //       lname: activeDevData.data.lname,
  //       email: activeDevData.data.email,
  //       linkedInLink: activeDevData.data.linkedInLink,
  //       resumeLink: activeDevData.data.resumeLink,
  //       active: true
  //     }
  //     devCtx.updateDev(developerData)
  //     tableData = developerData.repositories;
  //     filteredList = developerData.repositories;
  //     // setState({
  //     //   ...state,
  //     //   data: tableData,
  //     //   filteredRepos: tableData
  //     // })
  //   })
  // }, [sync])

  console.log('tableData', tableData)
  console.log('filteredList', filteredList)

  // if (sync) {
  //   setState({
  //     ...state,
  //     resync: sync
  //   })
  //   localStorage.setItem('dynamic-sync', 'false')
  //   console.log("KFDLF DEVTable setState sync=true")
  // }

  // useEffect(() => {
  //   console.log('devTable useEffect for SYNC', sync)
  //   setState({
  //     ...state,
  //     resync: state.resync + 1
  //   })
  //   setupCtx.updateSync(false)
  // }, [sync])


  console.log('DEVTABLE openModal', openModal, 'resync', state.resync)

  useEffect(() => {
    console.log('DEVTABLE useEffect tableData')

    setState({
      ...state,
      data: tableData,
      filteredRepos: tableData
    })
  }, [tableData])


  const handleSort = (clickedColumn) => () => {
    const { column, filteredRepos, direction } = state;
    // console.log('in handleSort', clickedColumn)
    if (column !== clickedColumn) {
      setState({
        ...state,
        column: clickedColumn,
        filteredRepos: _.sortBy(filteredRepos, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }
    setState({
      filteredRepos: filteredRepos.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

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
    setupCtx.openRepoModal(false)
  }

  const handleSearchChange = event => {
    let filter = ""
    filter = event.target.value;
    // console.log('filter: ', filter);
    filteredList = state.data.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    setState({
      ...state,
      filteredRepos: filteredList,
    })
    // console.log('filteredRepos: ', filteredList)
  }

  const resetRepoSearch = (e) => {
    console.log('in resetRepoSearch')
    filteredList = []
    handleSearchChange(e)
  };

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

  const showDevRepo = (repo) => {
    // console.log('clicked', repo)
    let id = tableData.findIndex(e => e.repoID === repo)
    dLink = tableData[id].deploymentLink
    console.log('showDevRepo id: ', id, 'deployLink: ', tableData[id].deploymentLink, 'dLink', dLink, 'desc', tableData[id].repoDesc)
    // console.log(tableData[id]._id, 'imageLink: ', tableData[id].imageLink)
    if (state.deploymentLink !== "") {
      tableData[id].deploymentLink = state.deploymentLink;
    }
    if (state.imageLink !== "") {
      tableData[id].imageLink = state.imageLink;
    }
    setState({
      ...state,
      id: tableData[id]._id,
      rowClick: id,
      deploymentLink: tableData[id].deploymentLink,
      imageLink: tableData[id].imageLink,
      repoName: tableData[id].repoName,
      activeFlag: tableData[id].activeFlag,
      keywords: tableData[id].keywords
    });
    setupCtx.openRepoModal(true);
  };

  const logInHandler = () => {
    setupCtx.openRepoModal(false);
    console.log('DEVTABLE logInHandler')
    setState({
      ...state,
      login: true
    })
    setupCtx.openLoginModal(true)
  }

  const { column, direction, rowClick, filteredRepos } = state;

  let content = (
    <Fragment>
      <Container>
        <span className="searchLine">
          <RepoSearchBox handleSearchChange={handleSearchChange} resetRepoSearch={resetRepoSearch} />
        </span>
      </Container>
      <div className="devTable">
        <Table sortable celled fixed inverted singleLine>
          <Table.Header inverted>
            <Table.Row className="sticky">
              <Table.HeaderCell
                width={3}
                sorted={column === "name" ? direction : null}
                onClick={handleSort("name")}
              >
                Project Name
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "description" ? direction : null}
                onClick={handleSort("description")}
              >
                Description
            </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                textAlign="center"
                sorted={column === "activeFlag" ? direction : null}
                onClick={handleSort("activeFlag")}
              >
                Display
            </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {console.log('in Table filteredRepos', filteredRepos)}
            {_.map(
              filteredRepos,
              ({ repoDesc, activeFlag, repoName, repoID }, index) => (
                <Table.Row className="devRow" id={index} key={repoID} value={index} active onClick={e => showDevRepo(repoID)}>
                  <Table.Cell>{repoName}</Table.Cell>
                  <Table.Cell>{repoDesc}</Table.Cell>
                  <Table.Cell textAlign="center">{activeFlag}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table >
      </div >
      <div>
        <Container>
          <Modal isOpen={openModal} onRequestClose={() => setupCtx.openRepoModal(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(155, 155, 155, 0.5)'
              },
              content: {
                borderRadius: '10px',
                top: '90px',
                border: '1px solid black',
                width: '500px',
                margin: '0 auto',
                height: '387px'
              }
            }}
          >
            <h1 className="modalHeader">Update Repository: <span>{state.repoName}</span></h1>
            <List as="ul" bulleted inverted className="bList">
              <List.Item as="li">Enter the project description and website in GitHub.</List.Item>
              <List.Item as="li">Image width/height ratio should be 3:2.</List.Item>
            </List>
            <form>
              <label className="inputLabel">Current Display Status: {state.activeFlag}</label>
              <Checkbox
                className="inputLabel"
                label='Display'
                checked={state.activeFlag === 'true'}
                onChange={!isLoggedIn ? null : () => updateFlag(state.rowClick)}
              />
              <hr />
            </form>
            <form onSubmit={(event) => handleLinkUpdate(event)}>
              <div>
                <label className="inputLabel">Current Image Link</label>
                <input className="urlBox" name="imageLink" placeholder={state.imageLink} value={state.value} onChange={!isLoggedIn ? null : (event) => handleLinkChange(event)} />
              </div>
              <div>
                <label className="inputLabel">Search Keywords</label>
                <input className="urlBox" name="keywords" label='Keywords: ' placeholder={state.keywords} value={state.value} onChange={!isLoggedIn ? null : (event) => handleLinkChange(event)} />
              </div>
              {isLoggedIn && (
                <Button color="teal" fluid active
                  type="submit"
                >
                  Update
                </Button>
              )}
            </form>
            {!isLoggedIn &&
              (
                <div className="createAccount">
                  <Button color="red" type="submit" onClick={logInHandler}>Log In to Change Settings</Button>
                </div>
              )}
          </Modal>
        </Container>
      </div>
    </Fragment >
  );
  return content;
}

export default DevTable;