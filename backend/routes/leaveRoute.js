const express = require("express");
const leaveController = require("../controllers/leaveController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(leaveController.getAllLeaves)
  .post(leaveController.createLeave);

router
  .route("/:id")
  .get(leaveController.getLeave)
  .patch(leaveController.updateLeave)
  .delete(leaveController.deleteLeave);

module.exports = router;
