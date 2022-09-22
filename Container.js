const fs = require("fs");

// Creamos la clase producto con los atributos que vamos a darle
class Products {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
}

class Container {
  constructor(fileName) {
    // name es el nombre del archivo que le pasas
    this.fileName = fileName;
    try {
      this.products = fs.readFileSync(this.fileName, "utf-8"); // creo una clase products, leo archivo
      this.products = JSON.parse(this.products);
    } catch (error) {
      this.products = []; // si no hay nada creo un array vacio
    }
  }
  async #readDocument() {
    try {
      const resultPromise = await fs.promises.readFile(this.fileName, "utf-8"); // Esta en modo texto
      const resultPromiseParse = JSON.parse(resultPromise); // pasamos a objeto

      return resultPromiseParse;
    } catch (error) {
      console.log("El error es: " + error);
    }
  }

  async getAll() {
    // const productsFile = this.products;
    // return productsFile;
    try {
      const productsFile = await this.#readDocument();
      return productsFile;
    } catch (error) {
      console.log(error);
    }
  }

  getById(id) {
    try {
      const productsFile = this.products;
      const product = productsFile.find((product) => product.id === id);
      return product;
      // let product = { id };
      // for (let i = 0; i < this.products.length; i++) {
      //   if (product.id == this.products[i].id) {
      //     product = this.products[i];
      //   }
    } catch (error) {
      console.log("el error es" + error);
    }
  }



  async save(title, price) {
    try {
      let newProduct = new Products(title, price);
      if (this.products.length == 0) {
        newProduct.id = 1;
      } else {
        newProduct.id = this.products[this.products.length - 1].id + 1;
      }
      this.products.push(newProduct);
      fs.promises
        .writeFile(this.fileName, JSON.stringify(this.products, null, "\t"))
        .then(() => console.log("producto guardado"))
        .catch((e) => console.log(e));
    } catch (error) {}
  }

  delete() {
    fs.truncateSync(this.fileName, 0, () => console.log("contenido borrrado")); // borra todo el contenido
  }

  deleteById(id) {
    try {
      for (let i = 0; i < this.products.length; i++) {
        if (id == this.products[i].id) {
          this.products.splice(id - 1, 1);
        }
      }
      fs.promises
        .writeFile(this.fileName, JSON.stringify(this.products, null, "\t"))
        .then(() => console.log(`el producto con ID ${id} ha sido eliminado`))
        .catch((e) => console.log("Error: " + e));
    } catch (error) {
      console.log(error);
    }
  }
}


// Metodos clases anteriores

// app.get("/productos", async (req, res) => {
//   const result = await getProductsFromDB;
//   res.send(result);
// });

// app.get("/productoRandom", async (req, res) => {
//   const result = await getProductsFromDB;
//   let randomNumber = Math.ceil(Math.random() * result.length);
//   let newProduct = myFile.getById(randomNumber);
//   res.send(newProduct);
// });



module.exports = {
  Container
};
