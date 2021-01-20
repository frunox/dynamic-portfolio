const router = require("express").Router();
const developerController = require("../../controllers/developerController");

// Find the Developer passing in the github username.
// console.log('***********developer.js, get findDev');
// router.route("/:githubID").get(developerController.findDeveloper);

// Update the Developer passing in the github username.
console.log('***********developer.js, post updateDev');
router.route("/").post(developerController.updateDeveloper);

module.exports = router;
