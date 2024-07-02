const express = require("express");
const {
  getProducts,
  createProduct,
  putProducts,
  patchProducts,
  deleteProducts,
  validateForTitleAndPrice,
  getDataMiddleware,
  validateID
} = require("./../controllers/productController.js");

const productRouter = express.Router();

productRouter.use(getDataMiddleware);

// app.get("/products", getProducts);
// app.post("/products", createProduct);
productRouter
  .route("/")
  .get(getProducts)
  .post(validateForTitleAndPrice, createProduct);

// app.put("/products/:id",putProducts);
// app.patch("/products/:id", patchProducts);
// app.delete("/products/:id", deleteProducts);
productRouter
  .route("/:id")
  .put(validateID,validateForTitleAndPrice, putProducts)
  .patch(validateID,patchProducts)
  .delete(validateID,deleteProducts);

module.exports = productRouter;
