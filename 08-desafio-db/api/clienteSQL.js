const knex = require('knex')

class ClienteSQL {
	constructor(config, table){
		this.knex = knex(config)
		this.table = table 
	}

	async insert(data){
		return await this.knex(this.table).insert(data)
	}

	list(){
		return this.knex(`${this.table}`).select('*')
	}

	getById(id){
		return this.knex.from(this.table).where('id', id).select('*')
	}

	deleteById(id){
		return this.knex.from(this.table).where('id', id).del()
	}

	updateById(data, id){
		console.log(data, id)
		return this.knex.update(data).where('id', id)
			.then(res => { return res })		
			.catch(err => { console.log(err); throw err })
	}

	close(){
		this.knex.close()
	}

}

module.exports = ClienteSQL
