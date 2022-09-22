class ProductosApi {
  constructor() {
    (this.productos = []), (this.id = 0);
  }

  getAll(){
    return [...this.productos]
  }













}

module.exports = ProductosApi
