const { Transform } = require('stream');
const fs = require('fs/promises')

class Decrypt extends Transform {

    _transform(chunk, encoding, callback) {
        /**
         * decrypting chunk
         * <Buffer  44-1,70-1,6f-1,...>
        */
        for (var i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 255) {
                chunk[i] = chunk[i] - 1
            }
        }
        callback(null, chunk)
        // or 
        // this.push(chunk)
    }

};


(async () => {

    const read = await fs.open('encrypt.txt', 'r')
    const write = await fs.open('decrypt.txt', 'w')

    const read_stream = read.createReadStream()
    const write_stream = write.createWriteStream()

    const decrypt = new Decrypt()

    // in production use pipeline 
    read_stream.pipe(decrypt).pipe(write_stream)


})();


