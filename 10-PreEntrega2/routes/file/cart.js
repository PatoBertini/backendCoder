const { Router } = require('express')
const Cart = require('../models/cart')
const File = require('../container/File')

const cartRouter = Router()
const controller = new File('cart')
const controllerProd = new File('products')

cartRouter.post('/', (req, res) => {
	let cart = new Cart()
	res.json(controller.save(cart))
})

cartRouter.delete('/:id', (req, res) => {
	let { id } = req.params
	res.json(controller.deleteById(id))
})

cartRouter.get('/:id/products', (req, res) => {
	let { id } = req.params
	let cart = controller.getById(id)
	console.log(cart.products)
	if(cart.products == undefined){
		res.json({ response: 'No Cart Found' })
	} else {
		res.json({ id: cart.id , products: cart.products })
	}

})

cartRouter.post('/:id/products', (req, res) => {
	let { id } = req.params
	let cart = controller.getById(id)
	let body = req.body.id_prod

	let products = body.forEach(id_prod => {
		let prod = controllerProd.getById(id_prod)
		cart.products.push(prod)	
	})

	let response = controller.update(cart)
	res.json({ response: 'Products Added to the Cart', cart: response })
})
cartRouter.delete('/:id/products/:id_prod', (req, res) => {
	let { id, id_prod } = req.params
	let cart = controller.getById(id)

	let index = cart.products.findIndex((el, ind) => {
		if(el.id == id_prod) { return true }
	})

	

	let newProducts = cart.products.filter((prod, ind) => prod.id != id_prod)
	console.log(index, cart.products)
	cart.products = newProducts
	let response = controller.update(cart)
	res.json({ response: 'Product Deleted from Cart', cart: response })
})

module.exports = cartRouter
