const express= require("express");
const path= require('path');
const hbs = require('hbs');
const geocode= require('../src/utils/geocode');
const forecast= require('../src/utils/forecast')


//const template = require("../public/index") 

const app=express();



const publicpath= path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.listen(3000,()=>{
    console.log("server listening");
})


app.set('view engine','hbs');
app.set('views',viewsPath)
app.use(express.static(publicpath));
hbs.registerPartials(partialsPath);


//dynamic template rendering using handle bars ***hbs**** package
app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather',
        'name':'Ranjani'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'About'        
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        'title':'Help',
        'message':'I am here to help'
    })
})


//static way of showing data
// app.get('/about',(req,res)=>{
//     res.send("<h1>About Page</h1>");
// })

// app.get('/help',(req,res)=>{
//     res.send("help");
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'50deg',
//         location:'India'
//     });
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide Address'
        });
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return console.log({error});
            }
            //console.log(forecastdata)
            res.send({
                address:req.query.address,
                location:location,
                forecast:forecastdata
            })
        })
        
    })    

})

app.get('/help/*',(req,res)=>{
    res.render('pagenotfound',{
        'errormessage':'Help article not found'
    });
})

//wildcard routes
app.get('*',(req,res)=>{
    res.render('pagenotfound',{
        'title':'SORRY',
        'errormessage':'Page not found'
    });
})