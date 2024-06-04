const {
  updateType,
  getType,
  getAllTypes,
  topTypes,
  deleteType,
  createType,
} = require("../controllers/typeController");
const multerConfig = require("../utils/multer");

const router = require("express").Router();
router.post("/create", multerConfig.fields([{ name: "images" }]), createType);
router.put(
  "/update/:typeId",
  multerConfig.fields([{ name: "images" }]),
  updateType
);
router.get("/get", getAllTypes);
router.get("/get-top", topTypes);
router.get("/get/:typeId", getType);
router.delete("/delete/:typeId", deleteType);
 
module.exports = router;
