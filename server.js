const express = require('express')
const bodyParser = require('body-parser')
const CryptoJS = require("crypto-js")
const crypto2 = require('crypto2')
const rsa=require('./rsafun');


const app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send(' Welcome to BucketCrypt '+ ciphertext) 
})

app.post('/api/rsa/enc',function(req,res){
    if (!req.body) return res.sendStatus(400)
    var cipherText=rsa.encryptStringWithRsaPublicKey(req.body.text,'./cert/publicKey.PEM')
    console.log(cipherText.toString())
    res.send({
        Text: req.body.text,
        Cipher: cipherText.toString()
    });
});

app.post('/api/rsa/dec',function(req,res){
    if (!req.body) return res.sendStatus(400)
    var plainText=rsa.decryptStringWithRsaPrivateKey(req.body.cipher,'./cert/privateKey.PEM')
    console.log(plainText)    
    res.send({
        Cipher: req.body.cipher,
        Text: plainText
    });
});


app.post('/api/aes/enc', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var cipherText = CryptoJS.AES.encrypt(req.body.text, 'secret')
    console.log(cipherText.toString())
    res.send({
        Text: req.body.text,
        Cipher: cipherText.toString()
    });
  })
  app.post('/api/dec', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var bytes  = CryptoJS.AES.decrypt(req.body.cipher, 'secret')
    var plainText = bytes.toString(CryptoJS.enc.Utf8)
    console.log(plainText)    
    res.send({
        Cipher: req.body.cipher,
        Text: plainText
    });
  })


app.listen(process.env.port||3000, function () {
  console.log('Server started at port 3000')
})