const buff = Buffer.alloc(8)

console.log(buff.length, typeof buff, Array.isArray(buff))

buff.write('s', 'utf-8')

console.log(buff)


buff.write('string', 'utf-8')

console.log(buff)

console.log(buff.toJSON()) // data = [115, 116, 114, 105, 110, 103]


console.log(Buffer.from([115, 116, 114, 105, 110, 103]).toString('utf-16le')) // string