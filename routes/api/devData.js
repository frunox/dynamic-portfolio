const router = require("express").Router();
const devDataController = require("../../controllers/devDataController");
// const { Router } = require("express");

console.log('5. in /routes/api/devData.js')
router.route("/").get(devDataController.updateDevData);

// eliminated findActiveDeveloper route - now useing getActiveDevData
// router.route("/active").get(devDataController.findActiveDeveloper);

console.log('5a. to /activeDevData')
router.route("/activeDevData").get(devDataController.getActiveDevData);

// new route to revise developer data (name/links)
console.log('5b. to /revDeveloper')
router.route("/revDeveloper").post(devDataController.revDeveloper);

// route to delete developer and repositories documents
console.log('5c. to /deleteDeveloper')
router.route("/deleteDeveloper").delete(devDataController.deleteDeveloper);

module.exports = router;
