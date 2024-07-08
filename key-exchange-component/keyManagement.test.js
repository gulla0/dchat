const { generateKeyPair, generateAESKey, encryptAESKey, decryptAESKey, encodeKeyForURL, decodeKeyFromURL } = require('./keyManagement');

describe('Key Management Tests', () => {
    test('RSA Key Pair Generation', () => {
        const { publicKey, privateKey } = generateKeyPair();
        expect(publicKey).toBeDefined();
        expect(privateKey).toBeDefined();
    });

    test('AES Key Generation', () => {
        const aesKey = generateAESKey();
        expect(aesKey.length).toBe(32);  // 256 bits
    });

    test('AES Key Encryption and Decryption', () => {
        const { publicKey, privateKey } = generateKeyPair();
        const aesKey = generateAESKey();
        const encryptedKey = encryptAESKey(aesKey, publicKey);
        const decryptedKey = decryptAESKey(encryptedKey, privateKey);
        expect(decryptedKey).toEqual(aesKey);
    });

    test('Key Encoding and Decoding for URL', () => {
        const aesKey = generateAESKey();
        const encodedKey = encodeKeyForURL(aesKey);
        const decodedKey = decodeKeyFromURL(encodedKey);
        expect(decodedKey).toEqual(aesKey);
    });
});

