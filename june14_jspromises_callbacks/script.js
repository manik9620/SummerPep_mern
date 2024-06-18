// function xyz(){
//     console.log("inside xyz" );
//     function temp(x){
//         console.log(x*x)
//     }
//     console.log("End");
//     temp(12);
// }

// console.log("start");
// xyz();

// const button=document.getElementsByTagName('button')[0];
// button.addEventListener('click',cb);

// function cb(){
//     console.log("Button clicked");
// }

// const input=document.getElementsByTagName('input')[0];

// const ab=(e)=>{
//     console.log("Input is: ",e.target.value);
// }
// input.addEventListener('keyup',ab);

//setinterval
//executes the function after EVERY INTERVAL (like hello will be printed on the console after every 2 sec)
// function sayHello() {
//     console.log("Hello! im setinterval");
// }

// // Execute the sayHello function every 2 seconds (2000 milliseconds)
// setInterval(sayHello, 2000);

//setTimeout
//Executes the function after SOME DELAY
// console.log("start");
// const delay=2000;
// const fn=()=>{
//     console.log("Hello im setTimeout");
// }

// setTimeout(fn, delay);

// console.log("End");

//PROMISE
// const pr=fetch("https://api.artic.edu/api/v1/artworks/search?q=cats");
// console.log(pr);

// const pr=fetch("https://api.github.com/users/likbalpande");

// pr.then((res)=>{
//     const pr2=res.json();

//     pr2.then((data)=>{
//         console.log(data);
//     });
// }).catch((e)=>{
//     console.log("fetch: ",e);
// });

const request = fetch("https://dummyjson.com/products");

request
  .then((result) => {
    const convertdata = result.json();

    convertdata.then(renderUI);
  })
  .catch((err) => {
    alert("No data");
  });

const renderUI = (data) => {
  const root = document.getElementById("root");
//   console.log("hello")
  const product = data.products;
  for (let i = 0; i < product.length; i++) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <h3>${product[i].title}</h3>
    <p>${product[i].price}</p>`;
    root.appendChild(card);
  }
  console.log(product);
};
