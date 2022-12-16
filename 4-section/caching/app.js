require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// connecting database 
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOURI)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes 
const userRoute = require('./routes/user')

app.use('/user', userRoute)

app.listen(3002, () => console.log('server is listening on port 3002'))