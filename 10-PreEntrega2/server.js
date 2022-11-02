const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB
const cartRouter = require('./src/routes/cart')
const productsRouter = require('./src/routes/products')


app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is OK, Listening in Port ${PORT}`))
