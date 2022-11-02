const express = require('express')
const { Router } = require('express')
const productsRouter = Router()


const { ProductDaoMongo } = require('../daos/products/productsDaoMongo')
const productsDao = new ProductDaoMongo()

productsRouter.get('/', async (req, res) => {
  let products = await productsDao.getAll();
  res.json({products: products})
})

productsRouter.get('/:id', async (req, res) => {
  let product = await productsDao.getById(req.params.id)
  res.json({product})
})

productsRouter.post('/', async (req, res) => {
	let product = req.body
	product = await productsDao.save(product)
	res.json({ status: 'Ok!', product })
})

productsRouter.delete('/:id', async (req, res) => {
  let { id } = req.params
  product = await productsDao.delete(id)
	res.json({ status: 'OK!', response: product })
})

productsRouter.put('/:id', async (req, res) => {
  let product = req.body 
  let response = await productsDao.update(req.params.id, product)
	res.json({ status: 'OK!', response })
})

module.exports = productsRouter
