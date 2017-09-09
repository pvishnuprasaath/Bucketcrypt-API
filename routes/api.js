const express=require('express')
const bodyParser = require('body-parser')
const CryptoJS = require("crypto-js")
const router=express.Router()
const rsa=require('../rsafun');

router.post('/rsa/enc',function(req,res){
    if (!req.body) return res.sendStatus(400)
    var cipherText=rsa.encryptStringWithRsaPublicKey(req.body.text,'./cert/publicKey.PEM')
    console.log(cipherText.toString())
    res.send({
        Text: req.body.text,
        Cipher: cipherText.toString()
    });
});


router.post('/rsa/dec',function(req,res){
    if (!req.body) return res.sendStatus(400)
    var plainText=rsa.decryptStringWithRsaPrivateKey(req.body.cipher,'./cert/privateKey.PEM')
    console.log(plainText)    
    res.send({
        Cipher: req.body.cipher,
        Text: plainText
    });
});

router.post('/aes/enc', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var cipherText = CryptoJS.AES.encrypt(req.body.text, 'secret')
    console.log(cipherText.toString())
    res.send({
        Text: req.body.text,
        Cipher: cipherText.toString()
    });
  })
  
router.post('/aes/dec', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var bytes  = CryptoJS.AES.decrypt(req.body.cipher, 'secret')
    var plainText = bytes.toString(CryptoJS.enc.Utf8)
    console.log(plainText)    
    res.send({
        Cipher: req.body.cipher,
        Text: plainText
    });
})

module.exports=router