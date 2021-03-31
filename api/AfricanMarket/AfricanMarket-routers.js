const express = require('express')
const jwt = require('jsonwebtoken')
const market = require('./AfricanMarket-models')
const router = express.Router()

//working
//owners and users should be able to get a list of all items 
router.get('/items', async (req, res, next) => {
  try {
    const items = await market.findItems()
    res.status(200).json(items)
  } catch (err) {
    next(err)
  }
})

//working
//owners and users should be able to get an item by id
router.get('/items/:id', async (req, res, next) => {
  try {
    const itemId = await market.findItemsById(req.params.id)
    res.status(200).json(itemId)
  } catch (err) {
    next(err)
  }
})

//working
//owner should be able to create a new item
router.post('/items/addItem', async (req, res, next) => {
  try {
    const addItem = await market.addItems(req.body)
    res.status(201).json(addItem)
  } catch (err) {
    next(err)
  }
})

//owner should be able to edit/update an existing item 
// router.put('/items/:id', async (req, res, next) => {
//   try {
//     const editItem = await market.updateItemsById(req.params.id, req.body)
//     res.status(200).json(editItem)
//   } catch (err) {
//     next(err)
//   }
// })
router.put('/items/:id', (req, res) => {
  market.updateItemsById(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    });
});

//working
//owner should be able to delete an item
router.delete('/items/:id', async (req, res, next) => {
  try {
    await market.deleteItems(req.params.id)
    res.status(200).json({
      messgae: "Item was successfully deleted"
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router;