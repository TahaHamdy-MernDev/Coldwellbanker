const compoundModel = require("../models/compoundModel");
const developerModel = require("../models/developerModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");
const { deleteImages, uploadImages } = require("../utils/upload");

exports.createCompound = asyncHandler(async (req, res) => {
  await uploadImages("images", req);
  await uploadImages("thumbnail", req);

  const data = { ...req.body };
  const newCompound = await dbService.create(compoundModel, data);

  const developer = await dbService.findOne(developerModel, { _id: req.body.developer });


  const updateData = { $push: { compounds: newCompound._id } };
  await dbService.updateOne(
    developerModel,
    { _id: req.body.developer },
    updateData
  );

  return res.success({ data: newCompound });
});

exports.updateCompound = asyncHandler(async (req, res) => {
  const query = { _id: req.params.compoundId };
  const compound = await dbService.findOne(compoundModel, query);
  if (!compound) {
    return res.recordNotFound({ message: "compound not founded..." });
  }
  await updateAndSet(compound, "images", req);
  await updateAndSet(compound, "thumbnail", req);
  const updatedCompound = await dbService.updateOne(
    compoundModel,
    query,
    req.body
  );
  return res.success({ data: updatedCompound });
});

exports.topCompounds = asyncHandler(async (req, res) => {
  const top6CompoundsWithProperties = await compoundModel.aggregate([
    {
      $lookup: {
        from: "properties",
        localField: "properties",
        foreignField: "_id",
        as: "properties",
      },
    },
    {
      $addFields: {
        numberOfProperties: { $size: "$properties" },
      },
    },
    { $sort: { numberOfProperties: -1 } },
    { $limit: 6 },
  ]);
  return res.success({ data: top6CompoundsWithProperties });
});
exports.getCompound = asyncHandler(async (req, res) => {
  const query = { _id: req.params.compoundId };
  const compound = await dbService.findOne(compoundModel, query);
  if (!compound) {
    return res.recordNotFound({ message: "compound not founded..." });
  }
  return res.success({ data: compound });
});
exports.getAllCompounds = asyncHandler(async (req, res) => {
  const compounds = await dbService.findMany(compoundModel);
  return res.success({ data: compounds });
});
exports.deleteCompound = asyncHandler(async (req, res) => {
  const query = { _id: req.params.compoundId };
  const compound = await dbService.findOne(compoundModel, query);
  if (!compound) {
    return res.recordNotFound({ message: "compound not founded..." });
  }
  await deleteImages(compound);
  const deletedCompound = await dbService.deleteOne(compoundModel, query);
  return res.success({ data: deletedCompound });
});
