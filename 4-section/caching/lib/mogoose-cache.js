const mongoose = require('mongoose')
const client = require('../config')

const exec = mongoose.Query.prototype.exec

// add cache function for mongoose model 
mongoose.Query.prototype.cache = function () {
    this.useCache = true
    return this
}

mongoose.Query.prototype.exec = async function () {

    if (!this.useCache) {
        return exec.apply(this, arguments)
    }

    console.log(this.useCache)

    // create unique id for redis key 
    const redisKey = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.model.collection.name
    }))

    let cachedValue = await client.get(redisKey)

    if (cachedValue) {
        cachedValue = JSON.parse(cachedValue)
        // converting object as mongoose model 
        return Array.isArray(cachedValue) ?
            cachedValue.map(value => this.model(value))
            : this.model(cachedValue)
    }

    const result = await exec.apply(this, arguments)

    client.set(redisKey, JSON.stringify(result))

    console.log('From Db')

    return result

}