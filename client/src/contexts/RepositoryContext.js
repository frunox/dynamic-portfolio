import React from "react";

const RepositoryContext = React.createContext({
  id: null,
  column: null,
  data: null,
  sort: null,
  direction: null,
  rowClick: -1,
  deploymentLink: "",
  repoName: "",
  filteredRepos: null,
  searched: -1,
  searchID: null
});

export default RepositoryContext;
