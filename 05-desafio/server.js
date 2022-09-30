const express = require("express");
const productos = require("./modulos/productos");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

console.clear();

const app = express();
const httpServer = new HttpServer(app); // Aca express esta funcionando dentro de un servido http
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Data que viene del lado del cliente

// Declarando/api/productos
app.use("/api/productos", productos);

app.get("/", (req, res) => {
  res.send("helloword");
});

//========================================================= Server_Listen
const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
  console.log(`It's all OK, Listening on port number ${PORT}`);
});
server.on("error", (err) => console.log(err));

const arrayMsg = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" },
];

io.on("connection", (socket) => {
  socket.emit("mensaje", arrayMsg);

  socket.on("new-mensaje", (data) => {
    arrayMsg.push(data);
    io.sockets.emit("mensajes", arrayMsg);
  });
});
