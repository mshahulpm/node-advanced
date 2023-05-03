const { Writable } = require('stream')
const fs = require('fs')
const fsPromise = require('fs/promises')

class FileWriteStream extends Writable {

    /**
     * 
     * @param {highWaterMark} param0 
     */
    constructor({ highWaterMark, file_name }) {
        super({ highWaterMark })
        this.file_name = file_name
        this.fd = null
        this.chunks = []
        this.chunkSize = 0
        this.writesCount = 0
    }

    /*
    this will run after constructor run and it will put of all calling the other methods until we call the callback fn 
    */
    _construct(callback) {
        console.log('hello')
        fs.open(this.file_name, 'w', (err, fd) => {
            if (err) {
                // error
                callback(err)
            } else {
                this.fd = fd
                // success
                callback()
            }
        })
    }

    _write(chunk, encoding, callback) {

        // do your write operation 
        this.chunks.push(chunk)
        this.chunkSize += chunk.length

        if (this.chunkSize > this.writableHighWaterMark) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    return callback(err)
                }
                this.chunks = []
                this.chunkSize = 0
                ++this.writesCount
                callback()
            })
        } else {
            // when we are done 
            callback()
        }

    }

    _final(callback) {

        fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
            if (err) return callback()

            this.chunks = []
            callback()

        })

    }


    _destroy(error, callback) {

        console.log('No of writes:', this.writesCount)
        if (this.fd) {
            fs.close(this.fd, (err) => {
                callback(err || error)
            })
        } else {
            callback(error)
        }

    }


}


const NO_OF_WRITE = 1000000;

/**
 * Time   : 1.2 sec
 * Memory : 45MB
 */
async function writeWithAboveCustomWritable() {

    console.time('write-many')
    const stream = new FileWriteStream({
        file_name: 'fast.txt'
    });

    let i = 0;
    function write() {
        while (i++ < NO_OF_WRITE) {
            const buff = Buffer.from(` ${i} `)

            if (i === NO_OF_WRITE) {

                stream.end() // also can pass the last buffer 
                break;

            }

            if (!stream.write(buff)) break
        }
    }

    write()

    // resume write when internal buffer is available again 
    stream.on('drain', () => {
        write()
    })

    stream.on('finish', () => {
        console.timeEnd('write-many')
    })

}


async function slowAwaitCode() {


    console.time('write-many')
    const file = await fsPromise.open('slow.txt', 'w')
    for (let i = 0; i < NO_OF_WRITE; i++) {
        await file.write(` ${i} `)
    }
    console.timeEnd('write-many')


}

// slowAwaitCode()
writeWithAboveCustomWritable()

setInterval(() => { }, 1000)
