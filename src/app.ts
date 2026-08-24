import express from 'express'
import userRouter from '@/modules/user/user.routes.js'
import { errorHandler } from '@/middlewares/errorHandler.middleware.js'

const app = express()
const port = 3000

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use('/users', userRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
