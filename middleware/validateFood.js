const { Food } = require('../models/Model')

function validateFoodId() {
  return async (req, res, next) => {
    const [food] = await Food.findBy({ id: req.params.id })

    if (!food) {
      return res.status(404).json({
        message: 'There is no food by that ID'
      })
    }

    req.food = food
    next()
  }
}

function validateFoodInputs() {
  return (req, res, next) => {
    const message = { message: 'Please send all required fields' }

    if (
      !req.body.name ||
      !req.body.child_id ||
      !req.body.type ||
      !req.body.servings
    ) {
      return res.status(400).json(message)
    }

    next()
  }
}

module.exports = {
  validateFoodId,
  validateFoodInputs
}
