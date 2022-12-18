const db = require('../db')

const router = require('express').Router()


router.get('/', (req, res) => {
    res.json(db.books)
})

router.get('/:id', (req, res, next) => {
    const book = db.books.find(u => u.id == req.params.id)
    if (!book) return next({ status: 404 })
    res.json(book)
})

router.delete('/:id', (req, res, next) => {
    const book = db.books.find(u => u.id == req.params.id)
    if (!book) return next({ status: 404 })
    db.books = db.books.filter(u => u.id != req.params.id)
    res.json(book)
})

module.exports = router 