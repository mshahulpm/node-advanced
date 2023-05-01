const fs = require('fs/promises');
const fs_main = require('fs');

const NO_OF_WRITE = 1000000 * 3;

//  ------------ Code A ------------ //
// promise version of fs
// Execution time : 1.18 minute
// Cpu usage      : ~10%
// Memory usage   : ~50MB
// (async () => {

//     console.time('write-many')
//     const file = await fs.open('write-text.txt', 'w')
//     for (let i = 0; i < NO_OF_WRITE; i++) {
//         await file.write(` ${i} `)
//     }
//     console.timeEnd('write-many')

// })();


//  ------------ Code B ------------ //
// callback version of fs and fsWriteSync
// Execution time : ~10 seconds
// Cpu usage      : ~7%
// Memory usage   : ~28MB
// (async () => {

//     console.time('write-many')
//     fs_main.open('write-text.txt', 'w', (err, fd) => {
//         if (err) console.log(err)
//         else {
//             for (let i = 0; i < NO_OF_WRITE; i++) {
//                 const buff = Buffer.from(` ${i} `)
//                 fs_main.writeSync(fd, buff)
//                 // we can pass string directly
//                 // fs_main.writeSync(fd, ` ${i} `)
//             }
//         }
//         console.timeEnd('write-many')
//     })

// })()


//  ------------ Code C ------------ //
// callback version of fs (pure callback)
// Execution time : ~10 seconds
// Cpu usage      : ~20%
// Memory usage   : ~950MB
// (async () => {

//     console.time('write-many')
//     fs_main.open('write-text.txt', 'w', (err, fd) => {
//         if (err) console.log(err)
//         else {
//             for (let i = 0; i < NO_OF_WRITE; i++) {
//                 fs_main.write(fd, ` ${i} `, (err) => {
//                     if (err) console.log(err)
//                 })
//             }
//         }
//         // console.timeEnd('write-many')
//     })

// })()


/* -------  Don't do this way this one is highly memory ineffective ------- */
//  ------------ Code A (with stream to make even faster) ------------ //
// promise version of fs with stream
// Execution time : ~3 second
// Cpu usage      : ~10%
// Memory usage   : ~220MB
// (async () => {

//     console.time('write-many')
//     const file = await fs.open('write-text.txt', 'w')
//     const stream = file.createWriteStream()

//     for (let i = 0; i < NO_OF_WRITE; i++) {
//         const buff = Buffer.from(` ${i} `)
//         stream.write(buff)
//     }
//     // stream.
//     console.timeEnd('write-many')

// })();




//  understanding stream max write limit,drain,etc..
// (async () => {

//     const file = await fs.open('write-text.txt', 'w')
//     const stream = file.createWriteStream()

//     // max writable stream length is 16384 
//     const buff = Buffer.alloc(16382, 'a')

//     console.log(stream.write(buff))  // safe to write

//     console.log(stream.write(Buffer.alloc(1, 'b'))) // safe to write
//     console.log(stream.write(Buffer.alloc(1, 'b'))) // not safe to write cause memory issue  
//     console.log(stream.write(Buffer.alloc(1, 'b'))) // not safe to write cause memory issue  

//     console.log(stream.writableLength)

//     stream.on('drain', () => {

//         console.log(stream.write(Buffer.alloc(1, 'b')))  // again safe to write until 16383
//         console.log(stream.writableLength)

//         console.log('We are now safe to write more')
//     })


// })()


/* -------  Solved version of memory efficiency issue ------- */
//  ------------ Code A (with stream to make even faster) ------------ //
// promise version of fs with stream
// Execution time : ~7.5 second
// Cpu usage      : ~7.2%
// Memory usage   : ~42MB
(async () => {

    console.time('write-many')
    const file = await fs.open('write-text.txt', 'w')
    const stream = file.createWriteStream()

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
        file.close()
        console.timeEnd('write-many')
    })


})();