const {
  createCompound,
  updateCompound,
  getAllCompounds,
  getCompound,
  topCompounds,
} = require("../controllers/compoundController");
const multerConfig = require("../utils/multer");

const router = require("express").Router();
router.post(
  "/create",
  multerConfig.fields([{ name: "images" }, { name: "thumbnail" }]),
  createCompound
);
router.put(
  "/update/:compoundId",
  multerConfig.fields([{ name: "images" }, { name: "thumbnail" }]),
  updateCompound
);
router.get("/get-all", getAllCompounds);
router.get("/get/:compoundId", getCompound);
router.get("/get-top", topCompounds);
module.exports = router;
