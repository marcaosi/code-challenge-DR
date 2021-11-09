require('dotenv').config()
const PORT = process.env.PORT || 3000
const express = require('express')

const app = express()

const routes = require('./src/routes')

app.use(express.json())
app.use(routes)


app.listen(PORT, err => console.log(err?.message || `API listening on port ${PORT}`))