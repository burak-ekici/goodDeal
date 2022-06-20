const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const HomePagesroutes = require('./routes/HomePage')
require('./models/dbConfig')
const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use('/', HomePagesroutes)

app.listen(process.env.PORT)