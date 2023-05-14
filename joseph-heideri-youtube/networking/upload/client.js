const net = require('net')
const fs = require('fs/promises')


const socket = net.createConnection({ host: '::1', port: 3000 }, async () => {

    console.log(process.argv)

    const fileToUpload = './text.txt'
    const file = await fs.open(fileToUpload, 'r')
    const read_stream = file.createReadStream()

    // Reading from the source  
    read_stream.on('data', async (data) => {
        // sending to server 
        if (!socket.write(data)) {
            read_stream.pause()
        }
    })

    socket.on('drain', () => {
        read_stream.resume()
    })

    read_stream.on('end', () => {
        socket.end()
        console.log("File upload finished");
    })

})

