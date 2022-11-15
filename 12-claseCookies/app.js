const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cookiesRoutes = require('./routes/cookies.routes.js')

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.get(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/prueba", (req, res) => {
  res.send("Hola Mundo");
});

app.listen(PORT, () => {
  console.log("Server on port 3000");
});
