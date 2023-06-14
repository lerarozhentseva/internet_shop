const {Type, Device, Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res) {
    const {name} = req.body;
    const type = await Type.create({name});
    return res.json(type)
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types)
  }

  async deleteOne(req, res) {
    const {id} = req.params;
    try {
      const deletedTypeCount = await Type.destroy({
        where: {id},
      });

      if (deletedTypeCount === 0) {
        return res.status(404).json({message: 'Type not found'});
      }
      return res.json({message: 'Type deleted successfully'});
    } catch (error) {
      return res.status(500).json({message: 'Error deleting type', error: error.message});
    }
  }

  async getBrandsByType(req, res) {
    const {id} = req.params;
    try {
      const brands = await Brand.findAll({
        where: {typeId: id}
      });
      return res.json(brands);
    } catch (err) {
      return res.status(500).json({message: 'Error retrieving BRAND by type', error: err.message})
    }
  }
}

module.exports = new TypeController()