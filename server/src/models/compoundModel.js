const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
const multiLanguage = {
  en: {
    type: String,
  },
  ar: {
    type: String,
  },
};

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
});
const compoundSchema = new mongoose.Schema(
  {
    name: multiLanguage,
    description: multiLanguage,
    location: locationSchema,
    thumbnail: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    amenities: [amenitySchema],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    area: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
      },
    ],
    developer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Developer",
      },
    ],
  },
  { timestamps: true }
);

const compoundModel = mongoose.model("Compound", compoundSchema);

module.exports = compoundModel;
