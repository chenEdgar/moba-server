module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')
  router.post('/categories', async(req, res) => {
   const model = await Category.create(req.body)
   res.send(model)
  })

  router.get('/categories', async(req, res) => {
    const model = await Category.find().limit()
    res.send(model)
   })

  app.use('/admin/api', router)
}