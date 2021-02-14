// import axios from "axios";
import _ from "lodash";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Table, Form, Button, Modal, Container, Segment, Checkbox } from "semantic-ui-react";
import DevDataContext from '../../contexts/DevDataContext';
import SetupContext from '../../contexts/SetupContext';
import API from "../../utils/API";
import RepoSearchBox from "../RepoSearchBox";
import './style.css'

var tableData = []
var filteredList = []

const DevTable = () => {
  const devCtx = useContext(DevDataContext)
  const repos = devCtx.state.repositories;
  // console.log('DEVTABLE devCtx', devCtx, 'repos', repos)

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
    login: false
  })

  tableData = devCtx.state.repositories;

  useEffect(() => {
    // console.log('DEVTABLE devCtx', devCtx)

    setState({
      ...state,
      data: tableData,
      filteredRepos: tableData
    })
  }, [tableData])


  // useEffect(() => {
  //   console.log('DevTable 1.  in useEffect updateDev', setupCtx.state.updateDev)
  //   if (false) {
  //     API.getActiveDevData()
  //       .then(res => {
  //         // console.log('DevTable 2. ')
  //         setState({
  //           ...state,
  //           data: res.data.repositories,
  //           filteredRepos: res.data.repositories,
  //         });
  //         tableData = res.data.repositories
  //         console.log('DEVTABLE useEffect tableData', tableData)
  //         const developerData = {
  //           repositories: tableData,
  //         }
  //         devCtx.updateDev(developerData);
  //       });
  //   } else {
  //     console.log('DEVTABLE else devCtx', devCtx)
  //     const repos = devCtx.state.repositories;
  //     setState({
  //       ...state,
  //       data: repos,
  //       filteredRepos: repos
  //     })
  //   }
  // }, []);

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
    // console.log('id: ', id, 'deployLink: ', tableData[id].deploymentLink)
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
  };

  const logInHandler = () => {
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
          <Modal
            closeIcon='true'
            className="repoModal"
            open={rowClick >= 0}
            size="tiny"
          >
            {!setupCtx.state.loggedIn && (
              <Modal.Content>
                <div>
                  <h1>You must be logged in to change settings</h1>
                  <form onSubmit={logInHandler}>
                    <div className="createAccount">
                      <button type="submit" onClick={logInHandler}>Log In</button>
                    </div>
                  </form>
                </div>
              </Modal.Content>
            )
            }
            {
              state.login && (
                <Redirect to={'/login'} />
              )
            }
            <Modal.Header className="modalHeader">Update Repository:  <span>{state.repoName}</span></Modal.Header>
            <Modal.Content>
              <Segment>
                <Form>
                  <Form.Field>
                    <label className="inputLabel">Current Display Status: {state.activeFlag}</label>
                    <Checkbox
                      className="inputLabel"
                      label='Display'
                      checked={state.activeFlag === 'true'}
                      onChange={() => updateFlag(state.rowClick)}
                    />
                  </Form.Field>
                </Form>
              </Segment>
              <Segment>
                <Form onSubmit={(event) => handleLinkUpdate(event)}>
                  <Form.Group>
                    <Form.Field inline>
                      <div>Current Deployment URL:</div>
                      <label className="inputLabel">{state.deploymentLink}</label>
                      <input className="urlBox" name="deploymentLink" label='Deployment URL: ' placeholder="new link" value={state.value} onChange={(event) => handleLinkChange(event)} />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field inline>
                      <div>Current Image Link:</div>
                      <label className="inputLabel">{state.imageLink}</label>
                      <input className="urlBox" name="imageLink" label='Image URL: ' placeholder="new link" value={state.value} onChange={(event) => handleLinkChange(event)} />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field inline>
                      <div>Add Keywords:</div>
                      <label className="inputLabel">{state.keywords}</label>
                      <input className="urlBox" name="keywords" label='Keywords: ' placeholder="keywords..." value={state.value} onChange={(event) => handleLinkChange(event)} />
                    </Form.Field>
                  </Form.Group>
                  {setupCtx.state.loggedIn && (
                    <Button color="teal" fluid active
                      type="submit"
                    >
                      Update
                    </Button>
                  )}
                </Form>
              </Segment>

            </Modal.Content>
          </Modal>
        </Container>
      </div>
    </Fragment >
  );
  return content;
}

export default DevTable;