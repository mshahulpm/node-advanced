const fs = require('fs/promises');


(async () => {

    const file = await fs.open('voice.mp3', 'r');
    const write = await fs.open('voice.txt', 'w')

    write.write(readChunk.buffer)

})()