
// console.log("START");
// const pr= new Promise((resolve,reject)=>{
//     const flag=true;
//     if(flag==true){
//         setTimeout(()=>{
//             resolve(["Apple,Mango"]);
//         },2000)     //
        
//     }
//     else{
//         reject("Promise is rejected");
//     }
// });

// console.log("MID");
// setTimeout(()=>{
//     console.log("DONE")
// },4000)

// pr.then((val)=>{
//     console.log(val)
// }).catch((err)=>{
//     console.log("error=>>>>>>> ",err)
// })

//setInterval
let cnt=0;
let id;

const cb=()=>{
    cnt++;
    console.log('Done',cnt);
    if(cnt==4){
        clearInterval(id);
    }
}
const time=1000;

id=setTimeout(cb,time);