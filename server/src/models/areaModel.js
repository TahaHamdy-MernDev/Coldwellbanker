const mongoose = require("mongoose");
const areaSchema = new mongoose.Schema(
  {
    title: {
      en: String,
      ar: String,
    },
    propertiesAvailable: Number,
    description: {
      en: String,
      ar: String,
    },
    callUsNumber: Number,
    images: [
      {
        url: { type: String, required: true },
      },
    ],
    location:{
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },

    launches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Launch" }],
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Developer" }],
    compounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Compound" }],
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);
areaSchema.pre(/^find/, function(next){
  // this.populate('developers')
  // .populate('compounds').populate('properties')
  next()
})
const areaModel = mongoose.model("Area", areaSchema);

module.exports = areaModel;
