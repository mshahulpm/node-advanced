const Worker = require('webworker-threads').Worker;
const express = require('express')

function delay(n = 5000) {
    const start = Date.now()
    while (Date.now() - start < n) { }
}

const app = express()

app.get('/fast', async (req, res) => {
    const worker = new Worker(function () {

        this.onmessage = function () {
            delay()

        }
        postMessage()
    })

    worker.onmessage = function (count) {
        res.json({ message: count })
    }

    worker.postmessage()
})

app.get('/block', (req, res) => {
    delay(5000)
    res.json({ message: 'hi from block route' })
})



app.listen(3000, () => console.log('server is running on port 3000')) 