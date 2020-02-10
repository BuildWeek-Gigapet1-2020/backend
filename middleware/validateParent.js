const { Parent } = require('../models/Model')
/* check for id
 * make sure the id exists
 */
function validateParentId() {
  return async (req, res, next) => {
    try {
      const [parent] = await Parent.findBy({ id: req.params.id })
      if (!parent) {
        return res.status(404).json({ message: 'Parent not found' })
      } else {
        let { password, ...rest } = parent
        req.parent = { ...rest }
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { validateParentId }
