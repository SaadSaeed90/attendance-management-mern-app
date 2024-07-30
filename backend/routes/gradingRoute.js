const express = require("express");
const gradingController = require("../controllers/gradingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(gradingController.getAllGradings)
  .post(gradingController.createGrading);

router
  .route("/:id")
  .get(gradingController.getGrading)
  .patch(gradingController.updateGrading)
  .delete(gradingController.deleteGrading);

module.exports = router;
