const Leave = require("../models/leaveModel");

const factory = require("./handlerFactory");

exports.getLeave = factory.getOne(Leave);
exports.createLeave = factory.createOne(Leave);
exports.getAllLeaves = factory.getAll(Leave);
exports.updateLeave = factory.updateOne(Leave);
exports.deleteLeave = factory.deleteOne(Leave);
