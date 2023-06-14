//const {Basket, BasketDevice} = require('../models/models');
const {Device, BasketDevice, Basket, Type} = require("../models/models")
const ApiError = require('../error/ApiError');

// class BasketController {
//   async getCart(req, res, next) {
//     const {userId} = req.params;
//
//     const cart = await Basket.findOne({
//       where: {id: userId},
//       include: [BasketDevice],
//     });
//
//     if (!cart) {
//       next(ApiError.badRequest('Basket not found'));
//     }
//
//     return res.json(cart);
//   }
//
//   async addToCart(req, res) {
//     const {userId, deviceId, quantity} = req.body;
//     const defaultQuantity = 1;
//
//     await BasketDevice.findOne({
//       where: {
//         basketId: userId,
//         deviceId: deviceId,
//         quantity: quantity || defaultQuantity
//       },
//     });
//     const basket = await Basket.findOrCreate({where: {id: userId}});
//     const sendBasket = await BasketDevice.create({
//       basketId: basket[0].id,
//       deviceId: deviceId,
//       quantity: quantity || defaultQuantity
//     });
//
//     return res.json(sendBasket);
//   }
// }
class BasketController {
  async addToBasket(req, res) {
    const user = req.user
    const {deviceId, quantity} = req.body
    const defaultQuantity = 1;
    const basket = await BasketDevice.create({
      basketId: user.id,
      deviceId: deviceId,
      quantity: quantity || defaultQuantity
    })
    return res.json(basket)
  }

  async getBasketUser(req, res) {
    const {id} = req.user
    const basket = await BasketDevice.findAll({
      include: {
        model: Device
      }, where: {basketId: id}
    })

    return res.json(basket)
  }

  async deleteDevice(req, res) {
    const {id} = req.body;
    try {
      const deletedDevice = await BasketDevice.destroy({
        where: {id},
      });

      if (deletedDevice === 0) {
        return res.status(404).json({message: 'Device not found'});
      }
      return res.json({message: 'Device deleted successfully'});
    } catch (error) {
      return res.status(500).json({message: 'Error deleting type', error: error.message});
    }
  }
}

module.exports = new BasketController();
