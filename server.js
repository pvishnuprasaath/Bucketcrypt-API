const express = require('express')
var bodyParser = require('body-parser')
var CryptoJS = require("crypto-js");

const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send(' Welcome to BucketCrypt '+ ciphertext) 
})

app.post('/api/enc', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var ciphertext = CryptoJS.AES.encrypt(req.body.text, 'secret');
    console.log(ciphertext.toString());
    res.send({
        Text: req.body.text,
        Cipher: ciphertext.toString()
    });
  })
  app.post('/api/dec', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var bytes  = CryptoJS.AES.decrypt(req.body.cipher, 'secret');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8); 
    console.log(plaintext);    
    res.send({
        Cipher: req.body.cipher,
        Text: plaintext,
    });
  })


app.listen(process.env.port||3000, function () {
  console.log('Server started at port 3000')
})