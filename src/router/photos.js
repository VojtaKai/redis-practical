const express = require('express')
const redis = require('redis')
const { default: axios } = require('axios')
const { tryCatch } = require('../middleware/tryCatch')

const router = express.Router()
const redisClient = redis.createClient({
    url: "redis://127.0.0.1:6379"
})

router.get('/', tryCatch(async (req, res) => {
    const albumId = req.query.albumId
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos", {
        params: {
            albumId
        }
    })
    res.status(200).send(data)
}))

router.get('/:id', tryCatch(async (req, res) => {
    const id = req.params.id
    res.status(200).send(id)
}))

module.exports = router
