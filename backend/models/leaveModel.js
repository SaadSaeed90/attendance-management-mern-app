const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  fromDate: {
    type: Date,
    required: [true, "Please provide from date"],
  },
  toDate: {
    type: Date,
    required: [true, "Please provide to date"],
  },
  reason: {
    type: String,
    required: [true, "Please provide reason"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user"],
  },
});

leaveSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name _id",
  });
  next();
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
