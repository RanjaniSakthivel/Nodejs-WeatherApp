const promise1= new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //console.log('promise 1');
        resolve('value1');
    },500)
})

const promise2= new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //console.log('promise 2');
        reject('bad promise2');
    },1000)
})

const promise3= new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //console.log('promise 3');
        resolve('value3');
    },1000)
})

Promise.all([promise1,promise2,promise3])
.then((values)=>{
    console.log('inside then');
    console.log(values);
})
.catch((error)=>{
    console.log('inside catch');
    console.log(error);
})

// var app = require("express")();

// app.get("/", function(httpRequest, httpResponse, next){
//     httpResponse.write("Hello");
//     //httpResponse.end();
//     next(); //remove this and see what happens 
// });

// app.get("/", function(httpRequest, httpResponse, next){
//     httpResponse.write(" World !!!");
//     httpResponse.end();
// });

//app.listen(8080);