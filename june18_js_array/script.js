const pr=fetch('https://dummyjson.com/quotes');

pr.then((res)=>{
    const pr2=res.json();
    pr2.then((data)=>{
        console.log(data);
        console.log(data.products);
        createUI(data);
    })
}).catch((err)=>{
    console.log("error",err);
})

const main=document.getElementById('root');

function createUI(data){
    const products=data.quotes;

    main.innerHTML=""
    for(let i=0;i<products.length;i++){
        const newCard=document.createElement('div');
        const title=document.createElement('h3');
        title.innerText=products[i].title;
        newCard.appendChild(title);
        main.appendChild(newCard);
        newCard.innerHTML=`
        <div class="products">
            <h3>${products[i].author}</h3>
            
            <p>${products[i].quote}</p>
        </div>`
    }
}

function searchProducts(e){
    const searchText=e.target.value;
    const pr=fetch(`https://dummyjson.com/products/search?q=${searchText}`)
    pr.then((res)=>{
        const pr2=res.json();
        pr2.then((data)=>{
            createUI(data);
        })
    })
}