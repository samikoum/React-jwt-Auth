const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('./dbconnect')
const verifyToken = require('./verifyToken')
require('dotenv').config()



// Midleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// API
app.get('/verifyToken',verifyToken,(req, res) => {
   return res.send('OK')
})

console.log(process.env.SECRET_TOKEN)



app.use('/',require('./routes/loginProcess'))
app.use('/',require('./routes/registerProcess'))



app.listen(3001, () =>
    console.log('Server running On http://localhost' + 3001))