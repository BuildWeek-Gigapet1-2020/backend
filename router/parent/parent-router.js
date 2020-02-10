const parentRouter = require('express').Router()
const db = require('../../models/Parent-models')
const { validateParentId } = require('../../middleware/validateParent')

parentRouter
  .get('/', async (req, res, next) => {
    const [parent] = await db.findById(req.userId)
    return res.status(200).json(parent)
  })

  .get('/:id', validateParentId(), (req, res, next) => {
    try {
      return res.status(200).json(req.parent)
    } catch (error) {
      next(error)
    }
  })

  .put('/:id', validateParentId(), async (req, res, next) => {
    try {
      const newParent = await db.update(req.parent.id, req.body)
      return res.status(200).json(newParent)
    } catch (error) {
      next(error)
    }
  })

  .delete('/:id', validateParentId(), async (req, res, next) => {
    try {
      await db.remove(req.params.id)
      return res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      next(error)
    }
  })

module.exports = parentRouter
