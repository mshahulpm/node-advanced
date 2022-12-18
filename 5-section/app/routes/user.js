const db = require('../db')

const router = require('express').Router()


router.get('/', (req, res) => {
    res.json(db.user)
})

router.get('/:id', (req, res, next) => {
    const user = db.user.find(u => u.id == req.params.id)
    if (!user) return next({ status: 404 })
    res.json(user)
})

router.delete('/:id', (req, res, next) => {
    const user = db.user.find(u => u.id == req.params.id)
    if (!user) return next({ status: 404 })
    db.user = db.user.filter(u => u.id != req.params.id)
    res.json(user)
})

module.exports = router 