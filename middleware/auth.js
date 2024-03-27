const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { username } = decoded
    req.user = { username }
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorization to access this route', 401)
  }
}

module.exports = authMiddleware
