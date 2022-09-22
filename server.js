const express = require("express");
const productos = require("./modulos/productos");
const ProductosApi = require("./api/constructor");
console.clear();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Data que viene del lado del cliente

// Declarando/api/productos
app.use("/api/productos", productos);

//========================================================= Server_Listen
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`It's all OK, Listening on port number ${PORT}`);
});
server.on("error", (err) => console.log(err));
