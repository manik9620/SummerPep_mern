// const [sum,mul] = require('./math_func.js');

// const res=sum(9+10);
// console.log(res)

// const res1=mul(5,3);
// console.log(res1);






const figlet=require('figlet');

figlet("Manik Proch", (err,data) => {
    if(err){
        console.log("Something went wrong");
        console.dir(err);
    }
    
    console.log(data);
})