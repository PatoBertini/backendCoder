/* 
Hacer una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar ('./productos.txt') e implemente los siguientes metodos.
1- save(object): Number - REcibe un obj, lo guarda en el archivo y devuelve el id asignado.
2- getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
3- getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
4- deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
5- deleteAll(): void - Elimina todos los objetos presentes en el archivo.
*/

// Importamos modulos de node
const fs = require("fs");

class Productos {
  constructor(fileName) {
    this.fileName = fileName;
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
  async save(obj) {
    const fileContent = await this.#readDocument();
    if (fileContent.length !== 0) {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(
          // pasamos a string (txt/json)
          [
            ...fileContent,
            {
              ...obj,
              id: fileContent[fileContent.length - 1].id + 1,
            },
          ],
          null,
          2
        ),
        "utf-8"
      );
    } else {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify([{ ...obj, id: 1 }]),
        "utf-8"
      );
    }
  }

  async getById(num) {
    try {
      const fileContent = await this.#readDocument();
      const idFounded = fileContent.find((element) => element.id === num);
      console.log(idFounded);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const fileContent = await this.#readDocument();
      console.log(fileContent);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(num) {
    try {
      const fileContent = await this.#readDocument();
      const arrayFilter = fileContent.filter((element) => element.id !== num);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(arrayFilter, null, 4),
        "utf-8"
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify([]), "utf-8");
      console.log('Elementos borrados');
      const fileContent = await this.#readDocument();
      console.log(fileContent);
    } catch (error) {
      console.log(error);
    }
  }
}

const producto = new Productos("./products.txt");

// producto.save({ nombre: "jose", edad: 123 });
// producto.getById(3);
// producto.getAll();
// producto.deleteById(2);
// producto.deleteAll()
