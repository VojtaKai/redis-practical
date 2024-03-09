const express = require('express')
const cors = require('cors')
const photosRouter = require('./router/photos')
const { errorMiddleware } = require('./middleware/error')

const app = express()
const port = 8888

app.use(cors())
app.use('/photos', photosRouter)
app.use(errorMiddleware)

app.listen(port, () => console.log(`Server is running on the port ${port}`))