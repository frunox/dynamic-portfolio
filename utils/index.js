const router = require("express").Router();
const utilController = require("../controllers/utilController");

// (With the github user ID), call to synch github with the local database.
console.log("9. utils/index.js following route/sync/:id");
router.route("/sync/:id").post(utilController.syncDatabase);

//   router.route("/sync/:id").post((req, res) => {
//     console.log("Route Hitdddd");
//     utilController.syncDatabase;
//     res.send(true);
//   });

module.exports = router;
