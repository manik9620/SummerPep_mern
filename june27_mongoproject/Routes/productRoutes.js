const express = require("express");
const {
  getProducts,
  postProducts,
  putProducts,
  deleteProducts,
  patchProducts,
  checkId,
  listProducts
} = require("../Controllers/productConroller.js");

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(postProducts);

productRouter.route("/list").get(listProducts);

productRouter
  .route("/:id")
  .put(checkId, putProducts)
  .delete(checkId, deleteProducts)
  .patch(checkId, patchProducts);


module.exports = productRouter;
