const net = require('net')


const server = net.createServer((socket) => {

    socket.on('data', (data) => {
        console.log(data)
        console.log(data.toString('utf-8'))
    })

})

const host = '0:0:0:0:0:0:0:1'  // or "::1"

server.listen(3000, host, () => {
    console.log('server running on :', server.address())
})