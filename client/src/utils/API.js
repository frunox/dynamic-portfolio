import axios from "axios";

export default {
  //

  // Send in the github user name
  getActiveDevData: function () {
    console.log('2. in API.js getActiveDevData, to routes/index.js /api/devData/activeDevData/')
    return axios.get("/api/devData/activeDevData/");
  },

  // Saves the developer data.  You will need to send in the githubID in params and any fields you want to update in the developerData field.  It will update only those you send in.

  updateDeveloper: function (developerData) {
    console.log('8a. in API updateDeveloper', developerData)
    return axios.post("/api/developer/", developerData);
  },

  // Call this function to find the active Developer.  You do not need to pass anything in.  If none are active, it is not setup yet.

  getActiveDeveloper: function () {
    // console.log('/src/utils/API.js  getActiveDeveloper')
    return axios.get("/api/devData/active/");
  },

  // New function to revise developer data (name/links) via the Settings pags
  revDeveloper: function (revDevData) {
    console.log('8b. API.js  call revDeveloper', revDevData)
    return axios.post("/api/devData/revDeveloper/", revDevData);
  },

  // New function to delete developer data and all repositories documents
  deleteDeveloper: function () {
    console.log('8c. API.js  call deleteDeveloper')
    return axios.delete("/api/devData/deleteDeveloper/");
  },

  // Saves the developer data.  You will need to send in the githubID in params and any fields you want to update in the developerData field (This is one to many)

  updateRepositories: function (id, repositoriesData) {
    console.log('8d. API.js  call repositories', repositoriesData)
    return axios.post("/api/repositories/" + id, repositoriesData);
  },

  // Call this function to find the active Developer.  You do not need to pass anything in.  If none are active, it is not setup yet.

  getsync: function (githubID) {
    console.log('8. in API.js getsync (util route)', githubID)
    return axios.post("/util/sync/" + githubID);
  },
};
