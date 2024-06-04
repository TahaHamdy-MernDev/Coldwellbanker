const mongoose = require("mongoose");

const multiLanguage = {
  en: {
    type: String,
    trim: true, 
  },
  ar: {
    type: String,
    trim: true, 
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

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, 
  },
});

const paymentPlanSchema = new mongoose.Schema({
  equal_installments: {
    value: {
      type: String,
      required: true,
      enum: ["monthly", "quarterly", "yearly"],
    },
  },
  down_payment: {
    value: {
      type: Number,
      required: true,
    },
  },
  years: {
    type: Number,
    required: true,
  },
});

const propertySchema = new mongoose.Schema(
  {
    images: [
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
    name: multiLanguage,
    addressLocality: multiLanguage,
    min_price: {
      type: Number,
      required: true,
    },
    max_price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true, 
    },
    number_of_bathrooms: {
      type: Number,
      required: true,
    },
    number_of_bedrooms: {
      type: Number,
      required: true,
    },
    finishing: {
      type: String,
      enum: ["Not Finished", "Semi Finished", "Finished"],
      required: true,
      trim: true, 
    },
    resale: {
      type: Boolean,
      default: false,
    },
    property_type: {
      name: {
        type: String,
        required: true,
        trim: true, 
      },
    },
    type:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
      }
    ],
    delivery_in: {
      type: Date,
      required: true,
    },
    sale_type: {
      type: String,
      enum: ["Developer Sale"],
      required: true,
      trim: true, 
    },
    forSale: {
      type: Boolean,
      default: false,
    },
    forRent: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    contactUs:Number,
    max_unit_area:Number,
    amenities: [amenitySchema],
    location: locationSchema,
    description: multiLanguage,
    payment_plans: [paymentPlanSchema],
    area: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
      },
    ],
    compound: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Compound",
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

propertySchema.pre(/^find/, function (next) {
  this.populate({
    path: "area",
    select: "title",
  }).populate({
    path: "compound",
    select: "name images",
  }).populate("developer").populate("type")
    next();
});

const propertyModel = mongoose.model("Property", propertySchema);

module.exports = propertyModel;
