const db = require("../models");
const mongoose = require("mongoose");
console.log('6. in devDataController')
module.exports = {
  // Get the active developer
  // findActiveDeveloper: function (req, res) {
  //   console.log('6a. in findActiveDeveloper')
  //   db.Developer.findOne({
  //     active: true,
  //   })
  //     .populate("repositories")
  //     .exec((err, dbDeveloper) => {
  //       if (err) {
  //         return res.json(err);
  //       } else {
  //         console.log('6b. dbDeveloper (w/ all repos) in devDataController ')
  //         return res.json(dbDeveloper);
  //       }
  //     });
  // },
  // retrieve developer information from the DB, populate 'repositories' array, return the info
  getActiveDevData: function (req, res) {
    console.log('6c. in getActiveDevData')
    db.Developer.findOne({
      active: true,
    })
      .populate("repositories")
      .exec((err, dbDeveloper) => {
        if (err) {
          return res.json(err);
        } else {
          // console.log('dbDeveloper in devDataController ', dbDeveloper.developerGithubID)
          console.log('devDataController repositories', dbDeveloper.repositories.length)
          return res.json(dbDeveloper);
        }
      });
  },

  //  When calling for "devData", we will alway need the github user id.
  updateDevData: function (req, res) {
    console.log('6e. in updateDevData')
    updateDeveloper(req.body);
    updateRepository(req.body);
  },

  updateDeveloper: function (req, res) {
    console.log('6f. in updateDeveloper', devData)
    if (devData) {
      db.Repositories.updateOne(
        { developerLoginName: devData.developerLoginName },
        {
          $set: { lname: devData.lname, fname: devData.fname, email: devData.email },
        }
      )
    }
  },

  // add/update optional developer information (links)
  revDeveloper: function (req, res) {
    console.log('6g. in revDeveloper', req.body.fname)
    // destructure to assign developerLoginName, other data.
    db.Developer.updateOne(
      { developerLoginName: req.body.developerLoginName },
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          linkedInLink: req.body.linkedInLink,
          resumeLink: req.body.resumeLink,
        },
      }
    ).then((err, dbDevRev) => {
      console.log('dev revised');
      return res.json(dbDevRev)
    }
    )
      .catch(err => console.log(err));
  },

  // delete all documents in developer and repositories collections
  deleteDeveloper: function (req, res) {
    console.log('6h. in deleteDeveloper')
    db.Developer.deleteMany({})
      .then(() => {
        res.json(true);
      })
      .catch(err => {
        res.json('deleteDeveloper error', err);
      });
    // deleteRepositories();
    db.Repositories.deleteMany({})
      .then(() => {
        console.log('repos deleted');
      })
      .catch(err => console.log('deleteRepositories error', err));
  },
};





// TODO: Does not work.  Do not need this yet but I may need to loop through the devData.repositories and write out each individually?
function updateRepository(devData) {
  console.log('6g. in updateRespository')
  if (devData) {
    let repoDevData = {
      repoName: devData.name,
      repoDesc: devData.description,
      activeFlag: false,
      archiveFlag: false,
      deploymentLink: "",
      imageLink: "",
      html_url: devData.html_url,
      repoID: devData.id,
    };
    db.Repository.insertMany(repoDevData);
  }
}
