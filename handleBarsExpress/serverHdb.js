const express = require("express");
const hbs = require("express-handlebars");

const ProductosApi = require('./api/productos')

const productosApi = new ProductosApi()

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
console.clear();


app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "index.hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");


app.post('/productos', (req, res) => {
  const producto = req.body
  productosApi.guardar(producto)
  res.redirect('/')
})

app.get('/productos', (req, res) => {
  const productos = productosApi.listarAll()

  res.render("vista", {
      productos: productos,
      hayProductos: productos.length
  });
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log("escuchando en puerto " + PORT);
});
