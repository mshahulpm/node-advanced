const Blog = require('../model/Blog')

const router = require('express').Router()

router.get('/', async (req, res) => {

    const allBlogs = await Blog.find()
    res.json(allBlogs)
})



module.exports = router