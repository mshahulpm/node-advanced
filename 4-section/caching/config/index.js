require('dotenv').config()
const { createClient } = require('redis')


const client = createClient({
    url: process.env.REDIS_URI
})
client.on('error', (err) => console.log('Redis Client Error', err));

client.connect()

// (async () => {
//     await client.connect()
//     await client.set("user", JSON.stringify({ name: "shahul", age: 27 }))
//     await client.set("user", JSON.stringify({ name: "shahul2", age: 28 }))
//     console.log(JSON.parse(await client.get('user')))

//     // hash set aka js object 

//     await client.hSet('key', 'name', 'shahul');
//     await client.hSet('key', 'age', '27');



//     console.log(await client.hGetAll('key'))

//     // await client.set('key', 'value', {
//     //     EX: 10,
//     //     NX: true
//     // });

//     await client.disconnect()
// })()

module.exports = client



// (async () => {
//     await client.connect()
//     await client.set("user", JSON.stringify({ name: "shahul", age: 27 }))
//     await client.set("user", JSON.stringify({ name: "shahul2", age: 28 }))
//     console.log(JSON.parse(await client.get('user')))

//     // hash set aka js object

//     await client.hSet('key', 'name', 'shahul');
//     await client.hSet('key', 'age', '27');



//     console.log(await client.hGetAll('key'))

//     // await client.set('key', 'value', {
//     //     EX: 10,
//     //     NX: true
//     // });

//     await client.disconnect()
// })()
