const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const ProductosApi = require("./api/productosApi.js");
const MensajesApi = require("./api/mensajesApi.js");
const ClienteSQL = require("./api/clienteSQL");
const { sqlite, mysql } = require("./api/servidores");

//=================================== Codificando el servidor
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productosApi = new ProductosApi();
const mensajesApi = new MensajesApi();

console.clear();

//=================================== Configuración Socket
const arrayProductos = [
  {
    producto: "Guitarra fender 330",
    precio: "2.999",
    url: "https://res.cloudinary.com/dd4ko3egd/image/upload/v1661362819/X10Slim-CarbonRed._jpg_t9qetm.webp",
  },
];

// Configuracion Knex
const mysqlKnex = new ClienteSQL(mysql,'productos')
const sqliteKnex = new ClienteSQL(sqlite, 'mensajes')


// Cada vez que el cliente se conecta emitimos un mensaje -WebSockets
io.on("connection", async (client) => {
  console.log("New user connected!");
  //-> 1) primer producto emitido del servidor para el cliente y traemos todos los productos de nuestro constructor
  client.emit("productos", await mysqlKnex.list());
	socket.emit('mensajes', await sqliteKnex.list())

  socket.on('update', async	(data) => {
		await mysqlKnex.insert(data)
		let products = await mysqlKnex.list()
		io.sockets.emit('products', products)
	})

	socket.on('new-message', async (data) => {
		await sqliteKnex.insert(data)
		let messages = await sqliteKnex.list()
		io.sockets.emit('messages', messages)
	})
  
  // 4) Escuchamos ese newProducto del lado del cliente y lo guardamos en nuestro constructor, luego emitimos de nuevo un mensaje con todos los productos
  client.on("newProduct", (product) => {
    productosApi.guardar(product);
    io.sockets.emit("productos", productosApi.listarAll());
  });
  // A) primer mensaje emitido del servidor al cliente
  client.emit("mensajes", await mensajesApi.listarAll());
  // D) Recibimos el newMessage del cliente traido del form
  client.on("newMessage", async (newMessage) => {
    newMessage.fyh = new Date().toLocaleString();
    await mensajesApi.guardar(newMessage);
    io.sockets.emit("mensajes", await mensajesApi.listarAll());
  });
});

//=================================== Instanciando server
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log("All OK, Listening on port" + PORT);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
