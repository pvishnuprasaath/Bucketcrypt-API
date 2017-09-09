var crypto = require("crypto")
var path = require("path")
var fs = require("fs")

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
    var publicKey = fs.readFileSync(absolutePath, "utf8")
    var buffer = new Buffer(toEncrypt)
    var encrypted = crypto.publicEncrypt(publicKey, buffer)
    return encrypted.toString("base64")
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey)
    var privateKey = fs.readFileSync(absolutePath, "utf8")
    var buffer = new Buffer(toDecrypt, "base64")
    var decrypted = crypto.privateDecrypt(privateKey, buffer)
    return decrypted.toString("utf8")
};

module.exports = {
    encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey
}