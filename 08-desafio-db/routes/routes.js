const { Router } = require("express");
const data = [];
const router = Router();
const ClienteSQL = require("../api/clienteSQL");
const { mysql } = require("../ClienteSQL/options");

const db = new container(mysql, "products");

// GET
router.get("/", async (req, res) => {
  let products = await db.list();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  let product =
    (await db.getById(req.params.id)) != []
      ? "No data"
      : db.getById(req.params.id);
  res.json({ result: product });
});

// POST
router.post("/", async (req, res) => {
  let postProduct = req.body;
  let result = await db.insert(postProduct);
  res.json({ result });
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let newProduct = req.body;
  let result = await db.updateById(newProduct, id);

  res.json({ status: "Updated", product: result });
});

// DELETE
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let prodId = await db.deleteById(id);

  res.json({ status: "deleted", response: prodId });
});

module.exports = router;
