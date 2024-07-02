const fsPromises = require("fs/promises");

const validateForTitleAndPrice = (req, res, next) => {
  const body = req.body;
  if (!body.title || !body.price) {
    res.json({
      status: "fail",
      message: "!! Title and Price is required",
    });
    return;
  }
  next();
};

const getDataMiddleware = async (req, res, next) => {
  try {
    const text = await fsPromises.readFile("./data.json", {
      encoding: "utf-8",
    });
    req.products = JSON.parse(text);
  } catch (error) {
    req.products = [];
  }
  next();
};

const validateID = async (req, res, next) => {
  const params = req.params;
  const body = req.body;
  const products = req.products;

  const prIdx = products.findIndex((elem) => elem.id == params.id);

  if (prIdx === -1) {
    res.status(400).json({
      status: "Fail",
      message: "Invalid Product Id",
    });
    return;
  }
  products[prIdx] = { ...products[prIdx], ...body };
  await fsPromises.writeFile("./data.json", JSON.stringify(products, null, 2), {
    encoding: "utf-8",
  });

  res.json({
    status: "Success",
    message: "Product updated successfully",
    data: {
      product: products[prIdx],
    },
  });
};

const getData = async (req, res) => {
  const text = await fsPromises.readFile("./data.json", { encoding: "utf8" });
  let products;
  try {
    products = JSON.parse(text);
  } catch {
    products = [];
  }
  return products;
};

const getProducts = async (req, res) => {
  try {
    const text = await fsPromises.readFile("./data.json", {
      encoding: "utf-8",
    });
    const products = JSON.parse(text);
    res.json({
      status: "successful",
      message: "Server is running",
      data: {
        products: products,
      },
    });
  } catch (err) {
    res.json({
      status: "Hello",
      message: "Server is running",
      data: {
        products: [],
      },
    });
  }
};

const createProduct = async (req, res) => {
  const body = req.body;
  const products = req.products;
  products.push(body);
  await fsPromises.writeFile("./data.json", JSON.stringify(products));

  res.status(201);
  res.json({
    status: "Success",
    data: {
      products: body,
    },
  });
};

const putProducts = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const products = req.products;

    const prIdx = products.findIndex((elem) => elem.id == params.id);

    if (prIdx === -1) {
      res.status(400).json({
        status: "Fail",
        message: "Invalid Product Id",
      });
      return;
    }
    products[prIdx] = { ...products[prIdx], ...body };
    await fsPromises.writeFile(
      "./data.json",
      JSON.stringify(products, null, 2),
      { encoding: "utf-8" }
    );

    res.json({
      status: "Success",
      message: "Product updated successfully",
      data: {
        product: products[prIdx],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const patchProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const products = req.products;

    const prIdx = products.findIndex((elem) => elem.id == id);

    if (prIdx === -1) {
      res.status(400).json({
        status: "Fail",
        message: "Invalid Product Id",
      });
      return;
    }

    const newOB = {
      ...products[prIdx],
      ...body,
    };

    products[prIdx] = newOB;
    await fsPromises.writeFile(
      "./data.json",
      JSON.stringify(products, null, 2),
      { encoding: "utf-8" }
    );

    res.json({
      status: "Success",
      message: "Product updated successfully",
      data: {
        product: products[prIdx],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteProducts = async (req, res) => {
  const params = req.params;
  // const body=req.body;
  const products = req.products;
  const prIdx = products.findIndex((elem) => {
    if (elem.id == params.id) return true;
    return false;
  });

  if (prIdx === -1) {
    res.status(400);
    res.json({
      status: "Fail",
      message: "Invalid Product Id",
    });
    return;
  }

  products.splice(prIdx, 1);
  await fsPromises.writeFile("./data.json", JSON.stringify(products));
  res.status(204);
  res.json({
    status: "Success",
    data: {
      product: null,
    },
  });
  return;
};

module.exports = {
  getProducts,
  createProduct,
  putProducts,
  patchProducts,
  deleteProducts,
  validateForTitleAndPrice,
  getDataMiddleware,
  validateID,
};
