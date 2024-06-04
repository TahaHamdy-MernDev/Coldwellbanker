const areaModel = require("../models/areaModel");
const compoundModel = require("../models/compoundModel");
const developerModel = require("../models/developerModel");
const propertyModel = require("../models/propertyModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { uploadImages } = require("../utils/upload");

exports.createProperty = asyncHandler(async (req, res) => {
  await uploadImages("thumbnail", req);
  await uploadImages("images", req);
  const area = await dbService.findOne(areaModel, { _id: req.body.area[0] });
  if (!area) {
    return res.recordNotFound({ message: "area not found..." });
  }
  const compound = await dbService.findOne(compoundModel, {
    _id: req.body.compound[0],
  });
  if (!compound) {
    return res.recordNotFound({ message: "compound not found..." });
  }
  const developer = await dbService.findOne(developerModel, {
    _id: req.body.developer[0],
  });
  if (!developer) {
    return res.recordNotFound({ message: "developer not found..." });
  }
  const newProperty = await dbService.create(propertyModel, req.body);
  const updateData = { $push: { properties: newProperty._id } };
  await dbService.updateOne(
    areaModel,
    { _id: req.body.area[0] },
    { ...updateData, $inc: { propertiesAvailable: 1 } }
  );
  await dbService.updateOne(
    compoundModel,
    { _id: req.body.compound[0] },
    updateData
  );
  await dbService.updateOne(
    developerModel,
    { _id: req.body.developer[0] },
    updateData
  );
  return res.success({ data: newProperty });
});
exports.updateProperty = asyncHandler(async (req, res) => {
  const query = { _id: req.params.propertyId };
  const property = await dbService.findOne(propertyModel, query);
  if (!property) {
    return res.recordNotFound({ message: "Property not found." });
  }
  const updatedProperty = await dbService.updateOne(
    propertyModel,
    { _id: id },
    req.body
  );
  return res.success({ data: updatedProperty });
});

exports.latestProperties= asyncHandler(async(req,res)=>{
  const filter = {};
  const options = {};
  const limit = 6;
  const latestProperties = await dbService.findMany(
    propertyModel,
    filter,
    options,
    limit
  );
 return res.success({ data: latestProperties });
})

exports.getLatestPropertiesForRent = asyncHandler(async (req, res) => {
  const latestPropertiesForRent = await dbService.findMany(
    propertyModel,
    { forRent: true },
    {},
    6
  );
  
  return res.success({ data: latestPropertiesForRent });
});

exports.getProperty= asyncHandler(async(req,res)=>{
  const query = { _id: req.params.propertyId };
  const property = await dbService.findOne(propertyModel, query);
  if (!property) {
    return res.recordNotFound({ message: "Property not found." });
  }
  return  res.success({data: property }) 
})