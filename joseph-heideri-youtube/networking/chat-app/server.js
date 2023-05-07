const net = require('net')

const PORT = 3222
const HOST = '127.0.0.1'
const clients = []

const server = net.createServer(socket => {


    socket.on('data', (data) => {

        clients.map(_socket => {
            _socket.write(data)
        })

    })

    socket.on('error', () => {

    })


})


server.on('connection', (socket) => {
    const id = clients.length + 1
    console.log('A new connection to the server')
    clients.push(socket)
    socket.write(
        JSON.stringify({
            user_id: id,
            message: 'connection success',
            code: 'new_conn'
        })
    )

})

server.on('close', () => {
    console.log('One connection closed');
})

server.listen(PORT, HOST, () => {
    console.log('Server is running on :', server.address());
})

