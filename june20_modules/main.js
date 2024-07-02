const http = require("http");
const fsPromises = require("fs/promises");
const fs = require("fs");
const url = require("url");

const dataText = fs.readFileSync("./data.json");
const data = JSON.parse(dataText);

const app = http.createServer(async (req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  try {
    switch (pathname) {
      case "/": {
        const bf = await fsPromises.readFile("./pages/homepage.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(bf);
        break;
      }
      case "/products": {
        const bf = await fsPromises.readFile("./pages/products.html");
        let text = bf.toString();
        let productsText = "";
        for (let i = 0; i < data.length; i++) {
          productsText += `<div class="product-card">
                        <h3>${data[i].title}</h3>
                        <img src="${data[i].thumbnail}" alt='product-image' height='200'>
                        <p>${data[i].description}</p>
                        <a href="/view?id=${data[i].id}" target="_blank">More</a>
                    </div>`;
        }
        text = text.replace("$PRODUCTS$", productsText);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(text);
        break;
      }
      case "/view": {
        const product = data.find((elem) => elem.id == query.id);
        if (product) {
          const bf = await fsPromises.readFile("./pages/prodDesc.html");
          let text = bf.toString();
          text = text.replace(
            "$VIEW$",
            `<div class="container">
                <div class="left">
                        <img src="${
                          product.thumbnail
                        }" alt='product-image' height='200'>
                </div>
                <div class="right">
                            <h3>${product.title}</h3>
                            <p>${product.description}</p>
                            <p>Category: ${product.category}</p>
                            <p>Discount: ${product.discountPercentage}%</p>
                            <p>Tags: ${product.tags.join(", ")}</p>
                            <h2 >Price: $${product.price}</h2>
                            </div>
                            
                </div>`
          );
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(text);
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h2>Product not found</h2>");
        }
        break;
      }
      // case "/products.css":{
      //   const bf = await fsPromises.readFile("./pages/products.css");
      //   res.end(bf);
      //   break;
      // }
      default: {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2>Oops! Page not found...</h2>");
      }
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h2>Internal Server Error</h2>");
    console.error(error);
  }
});

app.listen(1400, () => {
  console.log("--------- Server Started ----------");
});
