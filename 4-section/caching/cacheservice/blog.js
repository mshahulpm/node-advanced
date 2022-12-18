const client = require("../config")


module.exports = class BlogCacheService {

    async getAllBlog() {
        try {
            return JSON.parse(await client.get('all-blog'))
        } catch (error) {
            return null
        }
    }

    async setAllBlog(data) {
        try {
            client.set('all-blog', JSON.stringify(data))
        } catch (error) {
            return null
        }
    }

    async getOneBlog(id) {
        try {
            return JSON.parse(await client.get(`blog-${id}`))
        } catch (error) {
            return null
        }
    }

    async setOneBlog(id, data) {
        try {
            client.set(`blog-${id}`, JSON.stringify(data))
        } catch (error) {
            return null
        }
    }

}