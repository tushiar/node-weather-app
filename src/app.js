
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

// app.get('', (req, res)=>{
//    res.send("Hello Express!!")
// })


app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather App",
        content:"This is created using HandleBars and Partials"
    })
 })

app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About Steve",
        content:"Designed and developed for testing purpose."        
    })
})

// app.get('/weather', (req, res)=>{
//     res.render('weather',{title:'Weather',location: "Mumbai", forecast:"Will Rain"})
// })
app.get('/weather', (req, res)=>{
    if(!req.query.location) return res.send("Please enter location")

    geocode(req.query.location, (error, {location }) => {
        if (error) {
            return  res.send({ error })
        }
        const loc = location.split(',')[0]
        forecast(loc, (error, forecastData) => {
            if (error) {
                return  res.send({ error })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.location
            })
        })
    })
   
})


app.get('/weather/*', (req, res)=>{
   res.render('error', {
       title: "Weather Error ",
       content:"Weather Page Not Found"
   })
})

app.get('*', (req, res)=>{
    res.render('error-nest', {
        title: "Error",
        content:"Page Not Found"
    })
 })



app.listen(port, ()=>{
    console.log("Server has started successfully on "+port)
})