const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./auth-models')
const { JWT_SECRET } = require("../secrets");
// const generateToken = require("./gen-token.js");

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, owner } = req.body

    if (!username || !password)
      return res.status(409).json({
        message: "username and password required"
      })

    const user = await Users.findBy(username)
    if (user) {
      return res.status(409).json({
        message: "username taken"
      })
    }

    const hashedPw = await bcrypt.hash(password, 4)

    const newUser = await Users.add({
      username,
      password: hashedPw,
      owner,
    })

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      owner: newUser.owner
    })

  } catch (err) {
    next(err)
  }
})


router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(404).json({
        message: 'username and password required'
      })
    }

    const user = await Users.findBy(username)
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    const token = jwt.sign({
      username: user.username,
    }, JWT_SECRET);

    res.cookie = ("token", token)
    res.status(200).json({
      message: `welcome, ${user.username}`,
      token: token,
    })

  } catch (err) {
    next(err)
  }
})

module.exports = router;