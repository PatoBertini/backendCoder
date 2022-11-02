const ContainerMongo = require('../../container/MongoDB')
const ProductModel = require('../../models/products')

class ProductDaoMongo extends ContainerMongo {
	constructor(){
		super(ProductModel)
	}

}

module.exports = { ProductDaoMongo }
