const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController')


router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.get('/:id', brandController.getDevicesByBrand)
router.delete('/:id', brandController.deleteOne)

module.exports = router;