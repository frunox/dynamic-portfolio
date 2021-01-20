const db = require("../models");
// const mongoose = require("mongoose");

module.exports = {
  // Update the Developer
  updateDeveloper: async function (req, res) {
    console.log('in devController updateDeveloper, req.body ', req.body)
    await db.Developer.insertMany(req.body).then((err, dbDevUpdate) => {
      console.log('after updateDeveloper call')
      return res.json(dbDevUpdate);
    })
      .catch((err) => console.log(err));
  }
};
