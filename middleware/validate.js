const { Parent } = require('../models/Model')
/* check for all credentials for register
 * parent_name
 * username
 * password
 * email
 *
 * Check to see if email is used
 *
 * Check to see if username is used
 */
function validateRegister() {
  return async (req, res, next) => {
    if (
      !req.body.parent_name ||
      !req.body.username ||
      !req.body.password ||
      !req.body.email
    ) {
      return res.status(400).json({ message: 'Please Provide All Fields' })
    }

    const [email] = await Parent.findBy({ email: req.body.email })
    if (email) {
      return res.status(400).json({ message: 'A user with that email exists' })
    }

    const [username] = await Parent.findBy({ username: req.body.username })
    if (username) {
      return res
        .status(400)
        .json({ message: 'A user with that username exists' })
    }

    next()
  }
}

/* check for credentials on login
 * username
 * password
 */
function validateLogin() {
  return (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Please supply a username and a password' })
    }

    next()
  }
}

module.exports = {
  validateRegister,
  validateLogin
}
