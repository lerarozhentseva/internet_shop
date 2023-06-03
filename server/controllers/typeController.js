const {Type} = require('../models/models');
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
}

module.exports = new TypeController()