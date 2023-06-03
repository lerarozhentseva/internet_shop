const {Basket, BasketDevice} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async getCart(req, res, next) {
    const {userId} = req.params;

    const cart = await Basket.findOne({
      where: {id: userId},
      include: [BasketDevice],
    });

    if (!cart) {
      next(ApiError.badRequest('Basket not found'));
    }

    return res.json(cart);
  }

  async addToCart(req, res) {
    const {userId, deviceId, quantity} = req.body;
    const defaultQuantity = 1;

    await BasketDevice.findOne({
      where: {
        basketId: userId,
        deviceId: deviceId,
        quantity: quantity || defaultQuantity
      },
    });
    const basket = await Basket.findOrCreate({where: {id: userId}});
    const sendBasket = await BasketDevice.create({
      basketId: basket[0].id,
      deviceId: deviceId,
      quantity: quantity || defaultQuantity
    });

    return res.json(sendBasket);
  }
}

module.exports = new BasketController();
