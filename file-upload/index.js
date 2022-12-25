require('dotenv').config()
const express = require('express')
const app = express()
const Minio = require('minio')

const minio = new Minio.Client({
    endPoint: process.env.MINIO_URL,
    accessKey: 'shahul',
    secretKey: 'shahul123',
    port: 9000,
    useSSL: false,
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))


/* Get presigned url to upload images from client side */
app.get('/get-minioUrl', async (req, res) => {


    const url = await minio.presignedPutObject(
        process.env.MINIO_BUCKET,
        Date.now() + '.jpeg',
        100
    )

    console.log(url)
    res.json(url)
})


app.all("*", (req, res) => {
    res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).json({ message: err.status === 404 ? 'Not found' : 'internal' })
    }
})

app.listen(3002, () => console.log('server is running on port 3002'))
