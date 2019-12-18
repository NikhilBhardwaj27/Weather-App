const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocodeUrl = require('./utils/geocodeUrl')

// Creating express instance
const app = express()


// Setting directories and express config
const publicDirectory = path.join(__dirname,'../public')
app.use(express.static(publicDirectory))
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')


// setting view engine and views location
app.set('view engine','.hbs')
app.set('views',viewsDirectory)
hbs.registerPartials(partialsDirectory)


// Home Page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather  App',
    })
})

// About Page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
    })
})

// Help Page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        content:'Contact on 99882961 for any help'
    })
})

// Weather page 
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        res.send('Please enter Location in search bar')
    }else {
            
        geocodeUrl(req.query.location,(error,{longitude,latitude,location} = {})=>{
            if(error){
                return res.send(error)
            }else {        
                forecast(longitude,latitude,(error,data)=>{
                    const {temperature,summary} = data
                    if(error){
                        return res.send(error)
                    }else {
                        res.send({
                            location:location,
                            temperature:temperature,
                            summary:summary
                        })
                    }
                })
            }
        })
    }
})

//404 error page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is running')
})