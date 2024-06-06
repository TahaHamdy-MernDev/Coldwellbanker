const developerModel = require("../models/developerModel");
const launchModel = require("../models/launchModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { uploadImages } = require("../utils/upload");

exports.createLunch = asyncHandler(async (req, res) => {
  await uploadImages("video", req);
  await uploadImages("thumbnail", req);
  const developer = await dbService.findOne(developerModel, {
    _id: req.body.developer,
  });
  if (!developer) {
    return res.recordNotFound({ message: "developer not found..." });
  }
  const newLunch = await dbService.create(launchModel, req.body);
  return res.success({ data: newLunch });
});

exports.latestLunches = asyncHandler(async (req, res) => {
  const filter = {};
  const options = {};
  const limit = 6;
  const latestLunches = await dbService.findMany(
    launchModel,
    filter,
    options,
    limit
  );
  return res.success({ data: latestLunches });
});
exports.getLunch = asyncHandler(async (req, res) => {
  const lunch = await dbService.findOne(launchModel, {
    _id: req.params.lunchId,
  });
  if (!lunch) {
    return res.recordNotFound({ message: "lunch not found.." });
  }
  return res.success({ data: lunch });
});

exports.getDeveloperLaunches = asyncHandler(async (req, res) => {
  console.log("dddddddddddddddddddddd");
  const developer = await dbService.findOne(developerModel, {
    _id: req.params.developerId,
  });
  if (!developer) {
    return res.recordNotFound({ message: "developer not found..." });
  }
  const launch = await dbService.findMany(launchModel, {
    developer: developer._id,
  });
  return res.success({ data: launch });
});
