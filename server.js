require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connecton error: ', error))

const port = process.env.PORT || 5000

app.get("/api/test", (req, res) => {
  res.json({ message: "Test endpoint is working!"})
})

app.listen(port, () => console.log(`Server running on port ${port}`))
