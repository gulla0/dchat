const crypto = require('crypto');

function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
}

function generateAESKey() {
    return crypto.randomBytes(32);  // 256-bit AES key
}

function encryptAESKey(aesKey, publicKey) {
    return crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, aesKey);
}

function decryptAESKey(encryptedKey, privateKey) {
    return crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, encryptedKey);
}

function encodeKeyForURL(key) {
    return key.toString('base64');
}

function decodeKeyFromURL(encodedKey) {
    return Buffer.from(encodedKey, 'base64');
}

module.exports = { generateKeyPair, generateAESKey, encryptAESKey, decryptAESKey, encodeKeyForURL, decodeKeyFromURL };

