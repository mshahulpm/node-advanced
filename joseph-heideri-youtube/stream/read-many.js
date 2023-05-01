const fs = require('fs/promises');



/**
 *  this seems work fine  but better way is below 
 */

(async () => {

    const read_file = await fs.open('read-text.txt', 'r')
    // console.log(await read_file.stat())
    const write_file = await fs.open('write-text2.txt', 'w')

    const read_stream = read_file.createReadStream()
    const write_stream = write_file.createWriteStream()

    read_stream.on('data', (chuck) => {

        write_stream.write(chuck)


    })

});

/**
 *   Memory : ~40Mb
 *   CPU    : ~15%
 *   Time   : ~1.3 minute
 *   21.8 GB copied and saved 
 */
(async () => {

    console.time('read-many')

    const read_file = await fs.open('read-text.txt', 'r')
    // console.log(await read_file.stat())
    const write_file = await fs.open('write-text.txt', 'w')

    const read_stream = read_file.createReadStream()
    const write_stream = write_file.createWriteStream()

    read_stream.on('data', (chuck) => {

        if (!write_stream.write(chuck)) {
            read_stream.pause()
            // console.log('Pause')
        }

    })

    read_stream.on('end', (chuck) => {
        read_stream.close()
        read_file.close()
        write_stream.end(chuck)
    })



    write_stream.on('drain', () => {
        read_stream.resume()
    })

    write_stream.on('finish', () => {
        write_file.close()
        console.timeEnd('read-many')
    })

})()


