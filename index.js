const express = require("express");
const { Container } = require("./Container");


const app = express();

// const products = new Container("./products.txt");
const fileName = "./products.txt";
const myFile = new Container(fileName);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido al servidor fs.express</h1>");
});

app.get("/productos", (req, res) => {
  myFile.getAll().then((products) => res.send(products));
});

app.get("/productoRandom", (req, res) => {
  myFile.getAll().then((products) => {
    let randomNumber = Math.ceil(Math.random() * products.length);
    console.log(products);
    let newProduct = myFile.getById(randomNumber)
    res.send(newProduct)
  })
});
server.on("error", (err) => console.log(err));

// myFile.save('mouse', 423) - Funciona
// myFile.save('parlante', 333) - Funciona
// myFile.save('teclado', 4513123) - Funciona
// myFile.save('lapton', 123144) - Funciona
// myFile.save('monitor', 1313123) - Funciona
// myFile.getAll();
// console.log(myFile.getById(2));
// console.log(getRandom());
// myFile.delete() - Funciona
// myFile.deleteById(4) 
