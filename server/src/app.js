const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.listen(process.env.PORT || 8081)
