const Router = require('express');
const router = new Router();
const basketConroller = require('../controllers/basketController')

router.post('/', basketConroller.addToCart)
router.get('/:userId', basketConroller.getCart);

module.exports = router;