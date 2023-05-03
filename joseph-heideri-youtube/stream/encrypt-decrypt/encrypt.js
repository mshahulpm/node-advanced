const { Transform } = require('stream');
const fs = require('fs/promises')

class Encrypt extends Transform {

    _transform(chunk, encoding, callback) {
        /*
         encrypting chunk
        <Buffer 43+1, 6f+1, 6e+1,...>
        */
        for (var i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 255) {
                chunk[i] = chunk[i] + 1
            }
        }
        callback(null, chunk)
        // or 
        // this.push(chunk)
    }

};


(async () => {

    const read = await fs.open('input.txt', 'r')
    const write = await fs.open('encrypt.txt', 'w')

    const read_stream = read.createReadStream()
    const write_stream = write.createWriteStream()

    const encrypt = new Encrypt()

    // in production use pipeline 
    read_stream.pipe(encrypt).pipe(write_stream)


})();


