
// //De-Structuring an object
// const student={
//     name:"Manik",
//     rollno:"19",
//     city:"Delhi",
//     hobbies:['printing','reading','playing'],
// }

// const {name,city,hobbies}=student;

// console.log(hobbies);
// console.log(student);



// const fruits=['banana','mango','apple'];
// // console.log(fruits[0]);

// const [i0,i3]=fruits;
// console.log(i0,i3);

//rest--> to pack the values
//spread--> to unpack the values


////shallow copy using spread opreator
// const s1={
//          name:"Manik",
//          rollno:"19",
//          city:"Delhi",
//      hobbies:['printing','reading','playing'],
//      }
//      const s2=s1;
//      const s3={...s1};
//      s2.name='aman';
//      s2.hobbies[0]='aman';


//      console.log(s1);
//      console.log(s2);
//      console.log(s3);
    

// //rest operator
// function sum(...a){
//     const sum=a.reduce((acc,a,i)=>{
//         console.log(acc,a,i);
//         return acc+a;
//     },-1);
//     console.log(sum);
// }

// // sum();
// // sum(10);
// // sum(10,20);
// sum(10,20,30,40);
// // sum(10,2,3,40,66);


