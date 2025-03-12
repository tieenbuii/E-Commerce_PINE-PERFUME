const router = require('express').Router();
const ctrls = require('../controllers/stockController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createStock);
router.get('/', ctrls.getAllStock),

router.put('/:sid', [verifyAccessToken, isAdmin], ctrls.updateStock);
router.delete('/:sid', [verifyAccessToken, isAdmin], ctrls.deleteStock);
router.get('/:sid', ctrls.getStock),



module.exports = router;
