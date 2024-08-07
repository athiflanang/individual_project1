if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
// const PORT = process.env.PORT || 3000
const router = require("./routers/index")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

module.exports = app