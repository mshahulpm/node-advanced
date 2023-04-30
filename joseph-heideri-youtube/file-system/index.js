const fs = require('fs')
const fs_promise = fs.promises

const content = fs.readFileSync('hello.txt')

console.log(content)
console.log(content.toString('utf-8'));


// copy file using promise api 

(async () => {

    try {
        await fs_promise.copyFile('hello.txt', 'copy-promise.txt')
    } catch (error) {
        console.log(error)
    }

})()


// copy file using call back fn 

fs.copyFile('hello.txt', 'call_back.txt', (err) => {
    if (err) console.log(err)
})



// copy file using sync fn 

fs.copyFileSync('hello.txt', 'syc.txt')