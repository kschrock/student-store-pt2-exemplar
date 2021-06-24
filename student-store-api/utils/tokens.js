const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { validateFields } = require("./validate")

const generateToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn: "24h" })

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch (err) {
    return {}
  }
}

const createUserJwt = (creds) => {
  validateFields({ required: ["email"], obj: creds, location: "token generation" })

  const payload = {
    email: creds.email,
    isAdmin: creds.isAdmin || false,
  }

  return generateToken(payload)
}

module.exports = {
  generateToken,
  validateToken,
  createUserJwt,
}
