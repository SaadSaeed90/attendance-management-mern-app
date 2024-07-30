const Attendance = require("../models/attendanceModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.createAttendance = catchAsync(async (req, res, next) => {
  const { user, attendanceDate } = req.body;

  if (!user) return next(new AppError("Please provide a user.", 400));

  let dateToCheck = attendanceDate ? new Date(attendanceDate) : new Date();
  dateToCheck = dateToCheck.setUTCHours(0, 0, 0, 0);

  const existingAttendance = await Attendance.findOne({
    user,
    attendanceDate: dateToCheck,
  });

  if (existingAttendance) {
    return next(new AppError("Duplicate entry", 400));
  }

  // Set attendanceDate to now if not provided
  req.body.attendanceDate = attendanceDate
    ? new Date(attendanceDate)
    : new Date();

  const newAttendance = await Attendance.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      attendance: newAttendance,
    },
  });
});

exports.getAttendance = factory.getOne(Attendance);
exports.getAllAttendances = factory.getAll(Attendance);
exports.updateAttendance = factory.updateOne(Attendance);
exports.deleteAttendance = factory.deleteOne(Attendance);
