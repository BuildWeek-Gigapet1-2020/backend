const parentRouter = require('express').Router()
const { Parent } = require('../../models/Model')
const { validateParentId } = require('../../middleware/validateParent')

parentRouter
  .get('/', async (req, res, next) => {
    const parent = await Parent.findById(req.userId)
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
      const newParent = await Parent.update(req.parent.id, req.body)
      return res.status(200).json(newParent)
    } catch (error) {
      next(error)
    }
  })

  .delete('/:id', validateParentId(), async (req, res, next) => {
    try {
      await Parent.remove(req.params.id)
      return res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      next(error)
    }
  })

module.exports = parentRouter
