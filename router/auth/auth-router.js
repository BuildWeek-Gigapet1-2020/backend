const authRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../../token/generateToken')
const { Parent } = require('../../models/Model')
const { validateRegister, validateLogin } = require('../../middleware/validate')
const sendgrid = require('../../utils/sendgrid')
const twilio = require('../../utils/twilio')
const {
  accountLimiter,
  resetLimiter
} = require('../../middleware/accountLimiter')

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

        await Parent.add(user)
        return res
          .status(201)
          .json({ message: 'You have been successfully registered' })
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  )

  .post(
    '/login',
    accountLimiter,
    validateLogin(),
    twilio(),
    async (req, res, next) => {
      try {
        const { username, password } = req.body
        const user = await Parent.findBy({ username })
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
    }
  )

  .post('/initiate-reset', accountLimiter, sendgrid(), (req, res, next) => {
    try {
      return res.status(200).json({ message: 'Please check your email' })
    } catch (error) {
      next(error)
    }
  })

  .post('/reset-password', resetLimiter, async (req, res, next) => {
    try {
      const { email, new_password } = req.body
      let user = await Parent.findBy({ email: email })
      const hashPw = await bcrypt.hash(new_password, 12)
      let updatedParent = {
        ...user,
        password: hashPw
      }
      await Parent.update(user.id, updatedParent)
      return res.status(200).json({ message: 'Password successfully updated' })
    } catch (error) {
      next(error)
    }
  })

module.exports = authRouter
