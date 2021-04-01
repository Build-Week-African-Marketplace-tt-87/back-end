const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../secrets/index");

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: "token required"
      })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "invalid token"
        })
      }

      req.token = decoded

      next()
    })
  } catch (err) {
    next(err)
  }
};

module.exports = {
  restrict
}