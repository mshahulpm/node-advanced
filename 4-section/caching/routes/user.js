const UserCacheService = require('../cacheservice/user')
const User = require('../model/User')

const router = require('express').Router()

const userCache = new UserCacheService()

router.get('/', async (req, res) => {
    let allUsers = await userCache.getAllUser()
    if (!allUsers?.length) {
        allUsers = (await User.find())
        if (allUsers?.length) userCache.setAllUser(allUsers)
    }
    res.json(allUsers)
})

router.post('/', async (req, res) => {

    const userCount = await User.count()
    const new_user = await User.create({
        name: "User " + userCount,
        age: 1 + userCount
    })

    res.json(new_user)

    userCache.setOneUser(new_user._id, new_user.toObject())
    userCache.setAllUser((await userCache.getAllUser() || []).push(new_user))

})

router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id).cache()
    console.log(await user.validate())
    res.json(user)
})

router.patch('/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedUser)
    userCache.setOneUser(req.params.id, updatedUser)
})



module.exports = router