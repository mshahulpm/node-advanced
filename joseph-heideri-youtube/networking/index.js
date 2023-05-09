const http = require('http')


const port = 80
const host = '127.0.0.1' //'192.168.1.68'

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};



const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});