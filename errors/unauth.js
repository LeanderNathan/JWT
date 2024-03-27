const CustomAPIError = require('./custom-error')

class UnAuthError extends CustomAPIError {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = 401
  }
}

module.exports = UnAuthError
