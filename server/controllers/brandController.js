const {Brand, Device} = require('../models/models');
const ApiError = require('../error/ApiError')

class BrandController {
  async create(req, res) {
    const {name} = req.body;
    const brand = await Brand.create({name});
    return res.json(brand)
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async deleteOne(req, res) {
    const {id} = req.params;
    await Brand.destroy({where: {id: id}});
    return res.json({message: 'Brand deleted successfully'})
  }

  async getDevicesByBrand(req, res) {
    const {id} = req.params;

    try {
      const devices = await Device.findAll({
        where: {brandId: id}
      });

      return res.json(devices);
    } catch (error) {
      return res.status(500).json({message: 'Error retrieving devices by brand', error: error.message});
    }
  }
}

module.exports = new BrandController()