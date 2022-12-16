const User = require('../model/User')

const router = require('express').Router()

router.get('/', async (req, res) => {
    res.json(await User.find())
})


module.exports = router