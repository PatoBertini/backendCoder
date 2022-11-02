const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CartSchema = new mongoose.Schema({
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'products',
		required: true,
		autopopulate: true
	}]
}, { timestamps: true })

const carts = mongoose.model('carts', CartSchema)

module.exports = carts
