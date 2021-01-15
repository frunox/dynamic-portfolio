const db = require("../models");
const mongoose = require("mongoose");
const axios = require("axios");

console.log('10. in utilController')
module.exports = {
  // Synch the databases -Notes are in the function.
  syncDatabase: function (req, res) {
    console.log('10a. in utilController/syncDatabase', req.params.id)
    // const { developerLoginName, fname, lname, email } = req.params.id;

    const developerLoginName = req.params.id

    // updateDevDB(developerLoginName);
    updateDevDB(developerLoginName);
    return true;
  },
};
//
// This is the function that will take in a github user name and synch the local database.
//
// NOTE: This will only update new repositories (and initialize the developer).  It will not overwrite the database values (except when deleted from github).  This function will initialize the "developer" collection (if there is a valid github id) and add only NEW repositories to the local database.

// If a user deletes a repository on github.  Currently, this will make the repository attribute "archive" to true and "active" for false.  TODO: It would be nice if we could have a form that shows all archived items.

async function updateDevDB(developerLoginName) {
  console.log('11. in updateDevDB ', developerLoginName)
  var gitHubData;
  var devData;
  // console.log('top of updateDevDB')
  // Get the github user and repository data.
  await axios
    .get(
      "https://api.github.com/users/" + developerLoginName + "/repos?type=all"
    )
    // "https://api.github.com/search/repositories?q=user:" + developerLoginName
    // Set gitHubData to the returned data.  TODO: I thought this line of code would work?
    // .then((gitHubData) => {})
    // gitHubData is all of the github info
    .then((data) => {
      gitHubData = data;
    })
    // Find the developers github login in our database.
    .then(() => {
      return db.Developer.findOne({ developerLoginName: developerLoginName });
    })
    // Take the devData (the existing data in db.developers) and gitHubData and call loadDB to synch Databases.
    .then((devData) => {
      console.log('calling loadDB devData: ', devData.developerGithubID)
      loadDB(developerLoginName, devData, gitHubData.data);
    })
    .catch((err) => console.log(err));
}

function loadDB(developerLoginName, devData, gitHubData) {
  //  If there is no github data then return (TODO: Ask about sending errors.  This will be needed for initialization)
  console.log('13. in loadDB, successfully calls updateRepo')
  if (!gitHubData) {
    return res.json("Github user not found");
  } else {
    // If there is no devData (the user was not found in our database), set them up and insert the data.
    //  Here is where we will add new data needed from the github repository.
    // if (!devData) {
    //NOTE: I had the line " let devData = {..." before initializing devData with a "let" statement. HOWEVER, I only had access to this this variable inside the scope of he function...  I learned this the hard way!
    let userId = gitHubData.findIndex(e => e.owner.login === developerLoginName)
    console.log('13a. id: ', userId)
    const developerGithubID = gitHubData[userId].owner.id

    console.log('13b. in loadDB: ', developerLoginName, developerGithubID)
    // db.Developer.updateOne({ developerLoginName: developerLoginName }, { $set: { developerGithubID: "60527588" } });
    // }
    var githubRepoArray = [];
    console.log('utilC, gitHubData: ', gitHubData.length)
    // Loop through each github repository item and load all new records.
    gitHubData.forEach((repo) => {
      // console.log('at push: ', repo.id)
      // const devID = developerGithubID
      // console.log('devID:  ', devData.developerGithubID)
      githubRepoArray.push(repo.id);
      // console.log('13c. call updateRepo')
      updateRepo(repo, developerGithubID);
    });
    // console.log('githubRepoArray: ', githubRepoArray)
    // console.log(devData._id)
    db.Developer.findOneAndUpdate(
      { developerLoginName: developerLoginName },
      {
        $set: {
          developerGithubID: developerGithubID,
        }
      }
    ).catch((err) => {
      return console.log('error adding github id number', err);
    });
    archiveRepositories(devData, githubRepoArray);
    // loop through our database repository items.
  }
}

//  This will loop through our local database and update any repositories that were delete on github.  We will make these inactive and archived (activeFlag: false, archiveFlag: true)
function archiveRepositories(devData, githubRepoArray) {
  // console.log('in archiveRepositories', githubRepoArray.length)
  devData.repositories.forEach((repositiesID) => {
    db.Repositories.findById(repositiesID).exec((err, repositiesData) => {
      // If the repoID is not null, find it in the github array of repos.
      if (err) {
        return res.json(err);
      }
      if (repositiesData.repoID) {
        indexNum = githubRepoArray.indexOf(repositiesData.repoID);
        // console.log('indexNum ', indexNum + " " + repositiesData.repoID)
        // If you do not find it, delete it.
        // TODO: This needs to be tested!  To test this, add a repository to github.  Make sure the mongodb is up to date.  Delete the github repository.  Sign back into your account (to run this code).  And make sure the mongodb has marked in inactive and the active flag is false.
        if (indexNum < 0) {
          db.Repositories.findOneAndUpdate(
            { repoID: repositiesData.repoID },
            {
              $set: {
                archiveFlag: true,
                activeFlag: false,
              },
            }
          ).catch((err) => {
            return console.log('error archiving');
          });
          console.log('archived repo ', repositiesData.repoID)
        }
      }
    });
  });
}
//  This will synch the two databases.
async function updateRepo(repo, devID) {
  // console.log('14. in updateRepo: ', devID)
  // repo is each repo, devID is the user's github id
  // Set the repo.description to the repo name if it is null (This is a required field)
  if (!repo.description) {
    repo.description = repo.name;
  }
  // Here is where we set up our database's Repository information.
  // If you need to add more to the repository from github, start here.
  var repoDevData = {
    repoName: repo.name,
    repoDesc: repo.description,
    activeFlag: false,
    archiveFlag: false,
    deploymentLink: repo.homepage,
    imageLink: "",
    html_url: repo.html_url,
    keywords: "",
    repoID: repo.id,
  };
  // Check to see if there is a record in our database with the github repo id.
  await db.Repositories.findOne({ repoID: repo.id }).exec((err, repoData) => {
    // If there is not a record in our database then add it to the repository collection.

    // repo.id is the github id for each repo.  repoData is always null
    // console.log('repo.id, repoData', repo.id, repoData)

    if (!repoData) {
      // console.log('repoDevData', repoDevData)
      db.Repositories.insertMany(repoDevData).then((repoArray) => {
        // We also need to add the repository id to the developer .

        // repoDevData is defined above, repoArray is = repoDevData.  devID is the user's github id.
        // Push the repo _id from the repositories collection
        // console.log('updateRepo, devID, repoArray: ', devID, repoArray)

        db.Developer.findOneAndUpdate(
          { developerGithubID: devID },
          {
            $push: {
              repositories: repoArray.map((element, key) => element._id),
            },
          },
          { new: true }
        ).catch((err) => {
          res.json(err);
        });
      });
    }
  });
}
