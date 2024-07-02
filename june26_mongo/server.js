require("dotenv").config();
const colors = require("colors");
const express = require("express");
const { database, productsCollection } = require("./database/db.js");

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const products = await  productsCollection.find().toArray();
    res.json({
      status: "success",
      data: {
        products: products,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
});

app.post("/products", async (req, res) => {
  const body = req.body;
  console.log(body)
  if (!body.title || !body.price) {
      res.status(400);
      res.json({
          status: "fail",
          message: "Title and Price are Required",
      });
      return;
  }
  const result = await productsCollection.insertOne(body);
  res.json({
      status: "Success",
      data: {
          products: result,
    }
  })
})

const port = process.env.PORT || 1400;
app.listen(port, () => {
  console.log(`<----Server is running on ${port}---->`.bgCyan.white);
});
