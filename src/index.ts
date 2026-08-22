import express from 'express'

const app = express()
const port = 3000

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello Express')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
