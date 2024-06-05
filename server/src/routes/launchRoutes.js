const {
  createLunch,
  latestLunches,
  getLunch,
} = require("../controllers/launchController");
const multerConfig = require("../utils/multer");

const router = require("express").Router();

router.use(function(req,res,next){
console.log("fffffffffffffffffffff");
next()
})
router.post(
  "/create",
  multerConfig.fields([{ name: "video" }, { name: "thumbnail" }]),
  createLunch
);
router.get("/get-latest", latestLunches);
router.get("/get/:lunchId", getLunch);
module.exports = router;
