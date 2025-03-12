const router = require('express').Router();
const ctrls = require('../controllers/stockController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createStock);
router.get('/', ctrls.getAllStock),

router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updateStock);
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteStock);
router.get('/:pid', ctrls.getStock),



module.exports = router;
