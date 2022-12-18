const BlogCacheService = require('../cacheservice/blog')
const Blog = require('../model/Blog')

const router = require('express').Router()

const blogCache = new BlogCacheService()

router.get('/', async (req, res) => {

    const allBlogs = (await blogCache.getAllBlog()) || (await Blog.find())
    res.json(allBlogs)
})

router.post('/', async (req, res) => {

    const blogCount = await Blog.count()

    const newBlog = await Blog.create({
        content: "Blog " + blogCount,
        title: "Blog Title " + blogCount
    })

    res.json(newBlog)

    blogCache.setOneBlog(newBlog._id, newBlog.toObject())
    blogCache.setAllBlog((await blogCache.getAllBlog() || []).push(newBlog))

})

router.get('/:id', async (req, res) => {
    let blog = await blogCache.getOneBlog(req.params.id)
    if (!blog) {
        console.log('From db')
        blog = await Blog.findById(req.params.id)
        blogCache.setOneBlog(req.params.id, blog)
    }
    res.json(blog)
})

router.patch('/:id', async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedBlog)
    blogCache.setOneBlog(req.params.id, updatedBlog)
})



module.exports = router