// run this file with pm2 
// pm2 start pm2.js -i 0 
// will run nofcors*2 instances 

const express = require('express')
const crypto = require('crypto')

// function sleep(delay) {
//     const start = Date.now()
//     while (Date.now() - start < delay * 1000) { }
// }


const app = express()

// a request to this route will leads to blocking of the entire app for 5 second 
app.get('/block', async (req, res) => {
    // sleep(5)
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, data) => {

        res.json({ message: data })

    })
})

app.get('/', async (req, res) => {
    res.json({ message: "Hi welcome" })
})

app.listen(3000, () => console.log('server is running on port 3000'))