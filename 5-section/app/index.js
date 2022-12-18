const express = require('express')
const app = express()
const db = require('./db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

// router
const user = require('./routes/user')
const book = require('./routes/book')

app.use('/user', user)
app.use('/book', book)

app.all("*", (req, res) => {
    res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).json({ message: err.status === 404 ? 'Not found' : 'internal' })
    }
})

app.listen(3002, () => console.log('server is running on port 3002'))
