const router = require('express').Router();
const ctrls = require('../controllers/toneController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createTone);
router.get('/', ctrls.getAllTone),

router.put('/:tid', [verifyAccessToken, isAdmin], ctrls.updateTone);
router.delete('/:tid', [verifyAccessToken, isAdmin], ctrls.deleteTone);
router.get('/:tid', ctrls.getTone),



module.exports = router;
