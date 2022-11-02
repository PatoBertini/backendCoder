const { MONGO_URI } = require('../config/globals')
const mongoose = require('mongoose')

class ContainerMongo {
  constructor(model) {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))

    this.model = model;
  }

  async getAll(){
    return await this.model.find()
  }

 	async getById(id){
		return await this.model.find({ _id: id })
 	}
 
 	async update(id, data){
		return await this.model.updateOne({ _id: id }, { $set: data })
 	}
 
 	async delete(id){
		return await this.model.deleteOne({ _id: id })
 	}
 
	async save(data){
		return await this.model.create(data)
	}

}

module.exports = ContainerMongo;
