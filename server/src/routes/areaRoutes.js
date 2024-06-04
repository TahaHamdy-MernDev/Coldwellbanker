const { createArea, updateArea, getAllArea, topAreas, deleteArea, getArea } = require('../controllers/areaController');
const multerConfig = require('../utils/multer');

const router = require('express').Router();
router.post('/create',multerConfig.fields([{name:"images"}]), createArea)
router.put('/update/:areaId',multerConfig.fields([{name:"images"}]), updateArea)
router.get('/get-all',getAllArea)
router.get('/top-areas',topAreas)
router.delete('/delete/:areaId',deleteArea)
router.get('/get/:areaId',getArea)
module.exports = router;