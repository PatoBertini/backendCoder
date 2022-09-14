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

  getRandom() {
    return this.getById(Math.floor(Math.random() * this.products.length) + 1);
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

const productList = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  },
];

// try {
//   let fileContent = await this.#readDocument(); // leemos nuestro archivo con array de objetos
//   obj.id = (await this.getLastId()) + 1; // declaramos el id del obj a cargar
//   await fileContent.push(obj);
//   await fs.promises.writeFile(
//     this.fileName,
//     JSON.stringify(fileContent, null, "\t")
//   );
//   return `your new element is saved under the id : ${obj.id}`;
// } catch (error) {
//   console.log(error);
// }


module.exports = {
  Container
};
