const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const { initFile } = require('./util')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

initFile()

routes(app)

app.listen(process.env.PORT || 8081)

module.exports = app // for testing

// passport for session management
