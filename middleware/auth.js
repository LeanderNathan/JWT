const jwt = require('jsonwebtoken')
const { UnAuthError, CustomAPIError } = require('../errors')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthError('No token provided')
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { username } = decoded
    req.user = { username }
    next()
  } catch (error) {
    throw new UnAuthError('Not authorization to access this route')
  }
}

module.exports = authMiddleware
