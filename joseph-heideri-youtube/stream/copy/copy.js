const fs = require('node:fs/promises');
const { pipeline } = require('stream/promises');

/**
 *   Copy file like below only for small files 
 * in these method nodejs will load all data into memory that wil lead to error and unwanted issues 
 * here it will load 700mb to memory
 *  Memory   : 700Mb
 *  Time     : 1.8 sec
 *  FileSize : ~700 MB
 */
(async () => {

    console.time('copy')

    const destination = await fs.open('_copy.txt', 'w')
    const file_for_copy = await fs.readFile('700mb.txt')


    await destination.write(file_for_copy)

    console.timeEnd('copy')


});


/**
 *  using file.read which will return 16 kb of file chunk each time 
 *  Memory   : 15 Mb
 *  Time     : 4.7 sec
 *  FileSize : ~700 MB
 */
(async () => {

    console.time('copy')

    const src_file = await fs.open('700mb.txt', 'r')
    const dst_file = await fs.open('700mb-copy.txt', 'w')

    let bytesRead = -1

    while (bytesRead !== 0) {
        const readChunk = await src_file.read()
        bytesRead = readChunk.bytesRead

        if (bytesRead != 16384) {

            const indexOfNonFilledBuffer = readChunk.buffer.indexOf(0)
            const new_buffer = Buffer.alloc(indexOfNonFilledBuffer)

            readChunk.buffer.copy(new_buffer, 0, 0, indexOfNonFilledBuffer)

            dst_file.write(new_buffer)
        } else {
            dst_file.write(readChunk.buffer)
        }

    }

    console.timeEnd('copy')

});


/**
 *  Using pipe and stream (don't use in production)
 *  Memory   : 20 Mb
 *  Time     : 2.1 sec
 *  FileSize : ~700 MB
*/
(async () => {

    console.time('copy')

    const src_file = await fs.open('700mb.txt', 'r')
    const dst_file = await fs.open('700mb-copy.txt', 'w')

    const read_stream = src_file.createReadStream()
    const write_stream = dst_file.createWriteStream()

    read_stream.pipe(write_stream)

    read_stream.on('end', () => {
        console.timeEnd('copy')
    })

});



/**
 * using pipeline 
 * 
 */
(async () => {

    console.time('copy')

    const src_file = await fs.open('700mb.txt', 'r')
    const dst_file = await fs.open('700mb-copy.txt', 'w')

    const read_stream = src_file.createReadStream()
    const write_stream = dst_file.createWriteStream()

    try {
        await pipeline(read_stream, write_stream)
        console.log('copied')
        console.timeEnd('copy')
    } catch (error) {
        console.log(error)
    }

})()