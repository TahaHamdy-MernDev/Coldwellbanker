const {
  createProperty,
  updateProperty,
  latestProperties,
  getLatestPropertiesForRent,
  getProperty,
} = require("../controllers/propertyController");
const multerConfig = require("../utils/multer");

const router = require("express").Router();
router.post(
  "/create",
  multerConfig.fields([{ name: "images" }, { name: "thumbnail" }]),
  createProperty
);
router.put(
  "/update/:propertyId",
  multerConfig.fields([{ name: "images" }, { name: "thumbnail" }]),
  updateProperty
);
router.get("/get-latest", latestProperties);
router.get("/get/:propertyId", getProperty);
router.get("/for-rent", getLatestPropertiesForRent);

module.exports = router;
