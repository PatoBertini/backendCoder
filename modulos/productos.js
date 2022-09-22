const express = require("express");
const { Router } = express;

const router = Router();

const productos = [
  {
    title: "pizza",
    price: "500",
    thumbnail: "url",
    id: 1,
  },
  {
    title: "hamburgesa",
    price: "700",
    thumbnail: "url",
    id: 2,
  },
  {
    title: "spaghetti",
    price: "1000",
    thumbnail: "url",
    id: 3,
  },
  {
    title: "choripan",
    price: "5000",
    thumbnail: "url",
    id: 4,
  },
];

//========================================================= Api_Productos
router.get("/", async (req, res) => {
  const result = await productos;
  res.send(result);
});

router.get("/:id", (req, res) => {
  const producto = productos.find(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (!producto) {
    return res.status(404).send({ error: "Producto no encontrado" });
  } else {
    res.status(201).send(producto);
  }
});

router.post("/", (req, res) => {
  // res.send("Ejecutando Metodo Post");
  // const productoSave = req.body;
  const producto = {
    title: req.body.title,
    price: parseInt(req.body.price),
    thumbnail: req.body.thumbnail,
    id: productos.length + 1,
  };
  console.log(producto);
  productos.push(producto);
  res
    .status(201)
    .send(
      `El producto con las siguientes caracteristicas ha sido agregado: \n ${JSON.stringify(
        producto
      )}`
    );
});

router.delete("/:id", (req, res) => {
  const producto = productos.find(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (!producto) {
    return res
      .status(404)
      .send("No puede eliminar ese producto por que no existe");
  } else {
    const index = productos.indexOf(producto);
    console.log(index);
    productos.splice(index, 1);
    res
      .status(201)
      .send(
        `El producto con las siguientes caracteristicas ha sido eliminado: \n ${JSON.stringify(
          producto
        )}`
      );
  }
});

router.put("/:id", (req, res) => {
  // res.send('PROBANDO PUT')
  let id = req.params.id
  const producto = productos.find(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (producto) {
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    let newProductos = {
      title: req.body.title,
      price: parseInt(req.body.price),
      thumbnail: req.body.thumbnail,
      id: id,
    };
    productos.push(newProductos);
    res.status(200).json({
      status: 200,
      message: "Item Update",
    });
  } else {
    res
      .status(404)
      .json({
        status: 400,
        message: "Item Not Found",
      })
      .end();
  }
});

module.exports = router;
