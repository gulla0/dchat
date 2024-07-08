// linkGenerator.js

const crypto = require('crypto');

function generateSecureLink() {
    const token = crypto.randomBytes(16).toString('hex');
    const link = `https://dchat.com/chat/${token}`;
    return link;
}

module.exports = { generateSecureLink };
