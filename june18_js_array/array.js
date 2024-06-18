const arr1=[1,2,3,[4,4],5,[6,6]];
console.log(arr1)
arr1.splice(0,1,0); 
console.log(arr1)

const arr=["a","b","c","d"]

//  const res1= arr.forEach((a,b,c)=>{
//     return "OK";
// })

// const res2=arr.map((elem,b,c)=>{
//     return elem;
// })

// console.log(res2)

const res3=arr.filter((a,b,c)=>{
    console.log(a,b,c)
})