const mongoose = require("mongoose");
const multiLanguage = {
  en: {
    type: String,
  },
  ar: {
    type: String,
  },
};
const developerSchema = new mongoose.Schema(
  {
    name: multiLanguage,
    description: multiLanguage,
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    callUsNumber: Number,
    compounds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Compound",
      },
    ],
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    compounds_count: {
      type: Number,
      default: 0,
    },
    areas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
      },
    ],
    launches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Launch",
      },
    ],
  },
  { timestamps: true }
);

const developerModel = mongoose.model("Developer", developerSchema);

module.exports = developerModel;
