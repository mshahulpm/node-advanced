const net = require('net')


const socket = net.createConnection({
    port: 3000,
    host: '127.0.0.1' // or ipv6 "::1"
}, () => {
    // socket.write('Simple message coming from simple connection') 
    // or 
    const buffer = Buffer.alloc(6)
    // below buffer for 'SHAHUL'
    buffer[0] = 83
    buffer[1] = 72
    buffer[2] = 65
    buffer[3] = 72
    buffer[4] = 85
    buffer[5] = 76
    socket.write(buffer)
    socket.on('data', (data) => {
        console.log(data.toString())
    })
})


