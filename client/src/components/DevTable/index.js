// import axios from "axios";
import _ from "lodash";
import { set } from "mongoose";
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

  let openModal = setupCtx.state.repoModalOpen;

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
        {openModal ? setupCtx.openRepoModal(true) : null}
      </div>
    </Fragment >
  );
  return content;
}

export default DevTable;