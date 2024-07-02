const express = require("express");
const colors = require("colors");
require("dotenv").config();
const productRouter = require("./Routes/productRoutes.js");
require("./Config/db.js");

const app = express();
app.use(express.json());

app.use("/api/v1/products", productRouter);

app.listen(process.env.PORT || 1400, () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgMagenta);
});
