const express = require("express");
const productRouter = require("./routes/productRoutes");


const app = express();
app.use(express.json());


app.use((req,res,next)=>{
    res.set(["Server Time :",Date.now()])
    console.log("ok:",req.url,req.method);
    next();
})

app.use(productRouter);
app.listen(3000, () => {
    console.log("Server Started ");
});

