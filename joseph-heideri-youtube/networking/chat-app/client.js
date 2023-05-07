const net = require('net')
const readline = require('readline/promises')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let user_id;

const clearLine = (dir) => {
    return new Promise((resolve) => {
        process.stdout.clearLine(dir, () => {
            resolve()
        })
    })
}

const moveCuser = (dx, dy) => {
    return new Promise((resolve) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve()
        })
    })
}



const socket = net.createConnection({
    host: '127.0.0.1',
    port: 3000,
}, async () => {
    console.log('Connected to server');

    ask()

})

const ask = async () => {

    const message = await rl.question('Enter a message >')

    socket.write(JSON.stringify({
        user_id,
        message
    }))

}

socket.on('end', () => console.log('connection was ended'))

socket.on('error', () => {
    process.exit()
})


socket.on('data', async (data) => {

    // initial data when connecting first time 
    const _data = JSON.parse(data.toString())

    if (_data.code === 'new_conn') {
        user_id = _data.user_id
        return
    }

    if (user_id === _data.user_id) {
        // move one line up
        await moveCuser(0, -1)
    } else {
        await moveCuser(0, 0)
    }
    // clear current line
    await clearLine(0)
    console.log(`User ${_data.user_id} >`, _data.message)
    ask()
})