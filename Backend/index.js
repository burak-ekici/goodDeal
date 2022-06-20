const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const items = require('./routes/items')
require('./models/dbConfig')
const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use('/', items)

app.listen(process.env.PORT)