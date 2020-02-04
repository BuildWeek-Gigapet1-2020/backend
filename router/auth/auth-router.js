const authRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../../token/generateToken')
const Parents = require('../../models/Parent-models')
const { validateRegister, validateLogin } = require('../../middleware/validate')
const accountLimiter = require('../../middleware/accountLimiter')

authRouter
  .post(
    '/register',
    accountLimiter,
    validateRegister(),
    async (req, res, next) => {
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
    }
  )

  .post('/login', accountLimiter, validateLogin(), async (req, res, next) => {
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

  .post('/reset-password', accountLimiter, async (req, res, next) => {
    try {
      const { email, new_password } = req.body
      let user = await Parents.findBy({ email: email })
      const hashPw = await bcrypt.hash(new_password, 12)
      let updatedParent = {
        ...user,
        password: hashPw
      }
      await Parents.update(user.id, updatedParent)
      return res.status(200).json(updatedParent)
    } catch (error) {
      next(error)
    }
  })

module.exports = authRouter
