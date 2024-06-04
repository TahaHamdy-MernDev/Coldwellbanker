const {
  createDeveloper,
  updateDeveloper,
  getDeveloper,
  getAllDevelopers,
  deleteDeveloper,
} = require("../controllers/developerController");
const multerConfig = require("../utils/multer");

const router = require("express").Router();
router.post(
  "/create",
  multerConfig.fields([{ name: "images" }]),
  createDeveloper
);
router.put(
  "/update/:developerId",
  multerConfig.fields([{ name: "images" }]),
  updateDeveloper
);

router.get("/get/:developerId", getDeveloper);
router.get("/get-all", getAllDevelopers);
router.delete("/delete/:developerId", deleteDeveloper);

module.exports = router;
