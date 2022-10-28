const https = require('https')

const start = Date.now()
function doRequest() {
    https.get('https://google.com', (res) => {
        res.on('data', () => { })
        res.on('end', () => {
            console.log(Date.now() - start)
        })
    })
        .end()
}

doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()

/**
 *   the above 10 network request actually finish in almost same time 
 *   what is happening here is the network request is not handled by node or libuv 
 *   libuv just off load the requesting process to os level 
 *   and just handle when req finish that is why node is faster in such cases 
 *   these type of pending operations are osPendingTasks
 */