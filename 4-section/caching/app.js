require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const redis = require('./config')

// connecting database 
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOURI)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes 
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(3002, () => {
    console.log('server is listening on port 3002')
    setTimeout(() => {
        console.log('Redis isReady : ', redis.isReady)
    }, 2000)
})


process.on('exit', function () {
    console.log('About to exit.');
});