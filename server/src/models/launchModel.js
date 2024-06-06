const mongoose = require("mongoose");
const multiLanguage = {
  en: {
    type: String,
  },
  ar: {
    type: String,
  },
}
const LaunchSchema = new mongoose.Schema({
  video: [
    {
      url: {
        type: String,
        required: true, 
      },
    },
  ],
  thumbnail: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
  },
  launchDetails:multiLanguage,
  launchName:multiLanguage,
  location: {
    name:multiLanguage,
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  description: multiLanguage,
},{
  timestamps:true
});
LaunchSchema.pre(/^find/, function (next) {
  this.populate("developer");
  next();
});
const launchModel = mongoose.model("Launch", LaunchSchema);

module.exports = launchModel;
