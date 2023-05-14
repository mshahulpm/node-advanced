const net = require('net')
const fs = require('fs/promises')

const server = net.createServer(socket => {

})

server.on('connection', (socket) => {

    console.log("New Connection");
    let file, file_stream

    socket.on('data', async (data) => {

        if (!file) {
            socket.pause() // pausing data receiving until file is open 
            file = await fs.open(`storage/${Date.now()}.txt`, 'w')
            file_stream = file.createWriteStream()
            file_stream.write(data)
            socket.resume()

            file_stream.on('drain', () => {
                socket.resume()
            })

        } else {

            if (!file_stream.write(data)) {
                socket.pause()
            }


        }


    })


    socket.on('end', () => {
        file.close()
        socket.end()
        file = undefined
        file_stream = undefined
        console.log('Connection ended')
    })

    socket.on('error', (err) => {
        file.close()
        console.log(err.message)
    })

})

server.listen(3000, '::1', () => {
    console.log("Upload server is running on:", server.address());
})