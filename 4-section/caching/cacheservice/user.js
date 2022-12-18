const client = require("../config")


module.exports = class UserCacheService {

    async getAllUser() {
        try {
            return JSON.parse(await client.get('all-user'))
        } catch (error) {
            return null
        }
    }

    async setAllUser(data) {
        try {
            client.set('all-user', JSON.stringify(data))
        } catch (error) {
            return null
        }
    }

    async getOneUser(id) {
        try {
            return JSON.parse(await client.get(`user-${id}`))
        } catch (error) {
            return null
        }
    }

    async setOneUser(id, data) {
        try {
            client.set(`user-${id}`, JSON.stringify(data))
        } catch (error) {
            return null
        }
    }

}