const User = require('../model/User')
const redis = require('../config')
const router = require('express').Router()

router.get('/', async (req, res) => {
    console.log('Redis isReady : ', redis.isReady)
    res.json(await User.find())
})


module.exports = router