const https = require('https')
const crypto = require('crypto')
const fs = require('fs')

const start = Date.now()

function doRequest() {
    https.get('https://google.com', (res) => {
        res.on('data', () => { })
        res.on('end', () => {
            console.log("req :", Date.now() - start)
        })
    })
        .end()
}


function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, data) => {

        console.log('Hash: ', Date.now() - start)
    })
}

function readFile() {
    fs.readFile('./async.js', 'utf-8', (err) => {
        if (err) return console.log('FS on Error: ', Date.now() - start)
        console.log('FS: ', Date.now() - start)
    })
}

process.env.UV_THREADPOOL_SIZE = 1

doRequest()

readFile()

doHash()
doHash()
doHash()
doHash()


/**
 * 
 *   order of execution of above functions 
 *   req , hash , fs , and 3 more hashes 
 * 
 *   if you comment out that 4 hash fn calls the readfile will finish in just 25 ms otherwise it may take upto 2 second 
 * 
 *   req is executed by os level 
 *   current thread pool have 4 thread 
 *   thread 1 pick fs task and other 3 threads picks 3 hash tasks 
 *   fs tasks executed by 2 step 
 *     - access file stats , and reading file content 
 *     - when asking file stats it is moved to hard disk 
 *     - so the that thread become free and does not wait to result and pick last hash fn 
 *     so after finishing one hash fn among the first 3 hash fns that thread fill pick pending fs execute the task 
 *     - thats why the order of execution become like this 
 * 
 *   scenario 2 (thread pool size set to 5) 
 *   order of execution  FS , Req , 4 Hash 
 * 
 *   because req is handled by os and 5 thread pool tasks and 5 thread available 
 *   1st thread will pick fs task and wait to finish it  
 */