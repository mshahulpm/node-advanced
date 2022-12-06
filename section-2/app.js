const cluster = require('node:cluster')
const numCPUs = require('node:os').cpus().length;
const crypto = require('crypto')

if (cluster.isPrimary) {
    console.log(numCPUs)
    cluster.fork()
    // cluster.fork()
    // cluster.fork()
    // cluster.fork()
} else {
    const express = require('express')

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

    app.listen(3001, () => console.log('server is running on port 3001'))
}

