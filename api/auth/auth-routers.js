const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./auth-models')
const router = express.Router()

router.post('/register', async (req, res, next) => {

}

router.post('/login', async (req, res, next) => {  

}

module.exports = router