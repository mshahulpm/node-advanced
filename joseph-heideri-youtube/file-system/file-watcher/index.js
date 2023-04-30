const fs = require('fs/promises');


(async () => {

    const commandFileHandler = await fs.open('command.txt', 'r')


    commandFileHandler.on('change', async () => {
        // get size of the file  
        const size = (await commandFileHandler.stat()).size

        /*
         allocating required size for reading buffer content otherwise it will allocate large amount of memory 
        */
        // allocate buffer with the size of file 
        const buff = Buffer.alloc(size)
        // the location we want to filling our buffer
        const offset = 0
        // how many bytes we need to read
        const length = buff.byteLength
        // start position we need to start filling the buffer  
        const position = 0

        await commandFileHandler.read(
            buff,
            offset,
            length,
            position
        )

        console.log(buff)
        console.log(buff.toString('utf-8'))

    })

    const watcher = fs.watch('command.txt')

    for await (const event of watcher) {
        if (event.eventType === 'change') {
            // the file was changed .... 
            commandFileHandler.emit('change')
        }
    }

})();
