// linkGenerator.js

const crypto = require('crypto');
const { encryptAESKey, encodeKeyForURL } = require('./keyManagement');

function generateSecureLink(publicKey) {
    const token = crypto.randomBytes(16).toString('hex'); // Secure token for the room
    const aesKey = crypto.randomBytes(32);                // Generate a 256-bit AES key
    const encryptedAESKey = encryptAESKey(aesKey, publicKey); // Encrypt the AES key with a public RSA key
    const encodedAESKey = encodeKeyForURL(encryptedAESKey);   // Base64 encode the encrypted AES key for URL safe transport

    const link = `https://dchat.com/chat/${token}?key=${encodedAESKey}`;
    return link;
}

module.exports = { generateSecureLink };
