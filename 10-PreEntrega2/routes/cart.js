const { Router } = require("express");
const cartRouter = Router();

const { CartDaoMongo } = require("../daos/cart/cartDaoMongo");
const cartDao = new CartDaoMongo();

cartRouter.post("/", async (req, res) => {
  let cart = await cartDao.save();
  res.json({ status: "SAVED!", cart });
});

cartRouter.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deleted = await cartDao.delete(id);
  res.json({ status: "Deleted", deleted });
});

cartRouter.get("/:id/products", async (req, res) => {
  let { id } = req.params;
  let cart = await cartDao.getProducts(id);
  res.json({ status: "Ok!", response: cart });
});

cartRouter.post("/:id/products", async (req, res) => {
  let { id } = req.params;
  let { products } = req.body;
  let cart = await cartDao.update(id, { products: products });
  res.json({ status: "New Cart", response: cart });
});

cartRouter.delete("/:id/products/:id_prod", async (req, res) => {
  let { id, id_prod } = req.params;
  let cart = await cartDao.getById(id);

  let prodIndex = cart[0].products.findIndex((element, index) => {
    if (element._id == id_prod) {
      return true;
    }
  });

  let object_id = cart[0].products[prodIndex];
  cart[0].products.pull(object_id);

  let newCart = await cartDao.update(id, { products: cart[0].products });
  res.json({ status: "OK!", cart: newCart });
});

module.exports = cartRouter;
