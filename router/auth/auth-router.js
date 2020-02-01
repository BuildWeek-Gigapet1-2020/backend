const authRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../../token/generateToken')
const Parents = require('../../models/Parent-models')
const { validateRegister, validateLogin } = require('../../middleware/validate')

authRouter
  .post('/register', validateRegister(), async (req, res, next) => {
    try {
      let user = req.body
      const hashPw = await bcrypt.hash(user.password, 12)
      user.password = hashPw

      await Parents.add(user)
      return res
        .status(201)
        .json({ message: 'You have been successfully registered' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

  .post('/login', validateLogin(), async (req, res, next) => {
    try {
      const { username, password } = req.body
      const user = await Parents.findBy({ username })
      const verifyPw = await bcrypt.compare(password, user.password)

      if (user && verifyPw) {
        const token = generateToken(user)
        return res.status(200).json({
          message: `Welcome ${user.username}`,
          parent_name: user.parent_name,
          token
        })
      } else {
        return res.status(401).json({
          message: 'Invalid Credentials'
        })
      }
    } catch (error) {
      next(error)
    }
  })

module.exports = authRouter
