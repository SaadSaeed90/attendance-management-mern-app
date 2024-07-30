const mongoose = require("mongoose");

const gradingSchema = new mongoose.Schema({
  gradeA: {
    type: Number,
    default: 90,
  },
  gradeB: {
    type: Number,
    default: 80,
  },
  gradeC: {
    type: Number,
    default: 70,
  },
  gradeD: {
    type: Number,
    default: 60,
  },
  gradeF: {
    type: Number,
    default: 50,
  },
});
const Grading = mongoose.model("Grading", gradingSchema);

module.exports = Grading;
