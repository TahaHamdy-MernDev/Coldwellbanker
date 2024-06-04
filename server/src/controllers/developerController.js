const areaModel = require("../models/areaModel");
const compoundModel = require("../models/compoundModel");
const developerModel = require("../models/developerModel");
const propertyModel = require("../models/propertyModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { deleteImages, updateAndSet, uploadImages } = require("../utils/upload");

exports.createDeveloper = asyncHandler(async (req, res) => {
  await uploadImages("images", req);
  const data = { ...req.body };
  const newDeveloper = await dbService.create(developerModel, data);

  const areaId= req.body.areas[0]
  const updateData = { $push: { developers: newDeveloper._id } };
  const getArea = await dbService.findOne(areaModel,{_id: areaId})
 await dbService.updateOne(areaModel,{_id:getArea._id},updateData)
  return res.success({data:newDeveloper});
});
exports.updateDeveloper = asyncHandler(async (req, res) => {
  const developer = await dbService.findOne(developerModel, {
    _id: req.params.developerId,
  });
  if (!developer) {
    return res.recordNotFound({ message: " this developer not founded..." });
  }
  await updateAndSet(developer, "images", req);
  const updatedDeveloper = await dbService.updateOne(
    developerModel,
    { _id: req.params.developerId },
    req.body
  );
  return res.success({ data: updatedDeveloper });
});

exports.getDeveloper = asyncHandler(async (req, res) => {
  const developer = await dbService.findOne(developerModel, {
    _id: req.params.developerId,
  });
  if (!developer) {
    return res.recordNotFound({ message: " this developer not founded..." });
  }
  const properties= await dbService.findMany(propertyModel,{developer:developer._id})
  const compounds= await dbService.findMany(compoundModel,{developer:developer._id})
  // const properties= await dbService.findMany(lunch,{developer:developer._id})
  return res.success({ data: {developer,properties,compounds} });
});
exports.getAllDevelopers = asyncHandler(async (req, res) => {
  const developers = await dbService.findMany(developerModel);
  return res.success({ data: developers });
});
exports.deleteDeveloper = asyncHandler(async (req, res) => {
  const developer = await dbService.findOne(developerModel, {
    _id: req.params.developerId,
  });
  if (!developer) {
    return res.recordNotFound({ message: " this developer not founded..." });
  }
  await deleteImages(developer);
  const deletedDeveloper = await dbService.deleteOne(developerModel, {
    _id: req.params.developerId,
  });
  return res.success({ data: deletedDeveloper });
});
