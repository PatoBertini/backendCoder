const ContainerMongo = require('../../container/MongoDB')
const CartModel = require('../../models/cart')

class CartDaoMongo extends ContainerMongo {
	constructor(){
		super(CartModel)
	}

	getProducts(id){
		return this.model.find({ _id: id }).populate('products')
	}

}

module.exports = { CartDaoMongo }
