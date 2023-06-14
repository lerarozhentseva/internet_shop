// const Router = require('express');
// const router = new Router();
// const basketConroller = require('../controllers/basketController')
//
// router.post('/', basketConroller.addToCart)
// router.get('/:userId', basketConroller.getCart);
const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)
router.delete('/', authMiddleware, basketController.deleteDevice)
module.exports = router;