const Grading = require("../models/gradingModel");

const factory = require("./handlerFactory");

exports.getGrading = factory.getOne(Grading);
exports.createGrading = factory.createOne(Grading);
exports.getAllGradings = factory.getAll(Grading);
exports.updateGrading = factory.updateOne(Grading);
exports.deleteGrading = factory.deleteOne(Grading);
