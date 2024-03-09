const express = require('express')
const redis = require('redis')
const { default: axios } = require('axios')
const { tryCatch } = require('../middleware/tryCatch')
const { stringify, parse } = require('../utils/utils')

const router = express.Router()
const redisClient = redis.createClient({
    url: "redis://127.0.0.1:6379"
})

redisClient.on('error', err => console.log("Redis Client Error", err))
redisClient.on('connect', () => console.log('Redis Connected'))

redisClient.connect()

router.get('/', tryCatch(async (req, res) => {
    const albumId = req.query.albumId

    const key = `photo?${albumId}`

    const photos = await redisClient.get(key)

    if (photos) {
        res.status(200).send(parse(photos))
    } else {
        const { data: photos } = await axios.get("https://jsonplaceholder.typicode.com/photos", {
            params: {
                albumId
            }
        })
        await redisClient.setEx(key, 300, stringify(photos))
        res.status(200).send(photos)
    }
}))

router.get('/:id', tryCatch(async (req, res) => {
    const id = req.params.id

    const key = `photo:${id}`

    const photo = await redisClient.get(key)

    if (photo) {
        res.status(200).send(parse(photo))
    } else {
        const { data: photo} = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
        await redisClient.setEx(key, 300, stringify(photo))
        res.status(200).send(photo)
    }
}))

module.exports = router
