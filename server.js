const express = require('express')
const bodyParser = require('body-parser')
const CryptoJS = require("crypto-js")
const rsa=require('./rsafun');
const routes=require('./routes/api')

const app = express()

app.use(bodyParser.json())
app.use('/api',routes)

app.get('/', function (req, res) {
    res.send(' Welcome to BucketCrypt '+ ciphertext) 
})

app.listen(process.env.port||3000, function () {
  console.log('Server started at port 3000')
})