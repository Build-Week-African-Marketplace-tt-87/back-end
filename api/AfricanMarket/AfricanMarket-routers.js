const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const market = require('./AfricanMarket-models')
const router = express.Router()

//owners and users should be able to get a list of items 
router.get('/items', async (req, res, next) => {
})

//owner should be able to create a new item
router.put('/items', async (req, res, next) => {
})

//owner should be able to update an existing item 
router.put('/items', async (req, res, next) => {
})

//owner should be able to delete an item
router.delete('/items', async (req, res, next) => {
})

module.exports = router;