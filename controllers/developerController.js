const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
  //
  // Find the Developer by github login ID.

  findDeveloper: function (req, res) {
    db.Developer.findOne({ developerLoginName: req.params.id })
      .populate("repositories")
      .exec((err, dbDeveloper) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(dbDeveloper);
        }
      });
  },

  // Update the Developer
  updateDeveloper: function (req, res) {
    console.log('in devController updateDeveloper ')
    db.Developer.insertMany(req.body).then((err, dbDevUpdate) => {
      if (err) {
        console.log('error: ', err)
        return res.json(err);
      } else {
        console.log('after updateDeveloper call')
        return res.json(dbDevUpdate);
      }
    });
  }
};
