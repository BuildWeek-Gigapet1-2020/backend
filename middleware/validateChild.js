const db = require('../models/Child-models')

function validateChildId() {
  return async (req, res, next) => {
    try {
      const child = await db.findById(req.params.id)
      req.child = child
      next()
    } catch (error) {
      return res.status(400).json({
        message: 'There is no child by that ID'
      })
    }
  }
}

function validateChildInputs() {
  return async (req, res, next) => {
    if (!req.body.name || !req.body.monster_id) {
      return res.status(400).json({
        message: 'Provide a name and a monster id please'
      })
    }

    next()
  }
}

module.exports = {
  validateChildId,
  validateChildInputs
}
