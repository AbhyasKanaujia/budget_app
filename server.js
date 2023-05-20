require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')

const app = express()

mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, 
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connecton error: ', error))

const port = process.env.PORT || 5000

app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint is working!' })
})
app.use('/api/users', userRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`))
