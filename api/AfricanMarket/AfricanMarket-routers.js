const express = require('express')
const jwt = require('jsonwebtoken')
const market = require('./AfricanMarket-models')
const router = express.Router()

//owners and users should be able to get a list of all items 
router.get('/items', async (req, res, next) => {
  try {
    await market.getItems()
    res.status(200).json(items)
  } catch(err){
    next(err)
  }
})

//owners and users should be able to get an item by id
router.get('/items/:id', async (req, res, next) => {

})

//owners and users should be able to get an item by a specific category 
router.get('/items/:category', async (req, res, next) => {

})

//owner should be able to create a new item
router.post('/items/addItem', async (req, res, next) => {

})

//owner should be able to edit/update an existing item 
router.put('/items/:id', async (req, res, next) => {

})

//owner should be able to delete an item
router.delete('/items', async (req, res, next) => {
  
})

module.exports = router;