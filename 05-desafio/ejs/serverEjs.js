const express = require("express");

const ProductosApi = require('./api/productos')

const productosApi = new ProductosApi()

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
console.clear();


//--------------------------------------------

app.set('views', './views');
app.set('view engine', 'ejs');

//--------------------------------------------

app.post('/productos', (req, res) => {
    const producto = req.body
    productosApi.guardar(producto)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = productosApi.listarAll()

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});





const PORT = 8000;
app.listen(PORT, () => {
  console.log("escuchando en puerto " + PORT);
});
