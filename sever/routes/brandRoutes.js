const router = require('express').Router();
const ctrls = require('../controllers/brandController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createBrand);
router.get('/', ctrls.getAllBrand),

router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBrand);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBrand);
router.get('/:bid', ctrls.getBrand),



module.exports = router;
