# Key Management System

## Overview

This document provides a detailed overview of the Key Management System developed for secure communication in a decentralized chat application. This system handles the generation, encryption, decryption, and encoding of cryptographic keys.

## Components

### `keyManagement.js`

This module includes several functions essential for cryptographic operations required to secure communications.

#### Functions

##### `generateKeyPair()`

- **Purpose**: Generates an RSA key pair used for asymmetric encryption.
- **Implementation**:
  ```javascript
  function generateKeyPair() {
      return crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: { type: 'spki', format: 'pem' },
          privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
      });
  }
  
- **Description**: This function generates a public-private key pair. The public key can be shared with anyone, while the private key must be kept secure.

##### `generateAESKey()`

- **Purpose**: Generates a symmetric 256-bit AES key for encrypting messages.
- **Implementation**:
  ```javascript
  function generateAESKey() {
      return crypto.randomBytes(32);  // Generates a 256-bit AES key
  }
  ```

##### `encryptAESKey(aesKey, publicKey)`

- **Purpose**: Encrypts an AES key using an RSA public key.
- **Implementation**:
  ```javascript
  function encryptAESKey(aesKey, publicKey) {
      return crypto.publicEncrypt({
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
      }, aesKey);
  }
  ```

##### `decryptAESKey(encryptedKey, privateKey)`

- **Purpose**: Decrypts an AES key using an RSA private key.
- **Implementation**:
  ```javascript
  function decryptAESKey(encryptedKey, privateKey) {
      return crypto.privateDecrypt({
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
      }, encryptedKey);
  }
  ```

##### `encodeKeyForURL(key)`

- **Purpose**: Encodes a key into a base64 string to safely include in URLs.
- **Implementation**:
  ```javascript
  function encodeKeyForURL(key) {
      return key.toString('base64');
  }
  ```

##### `decodeKeyFromURL(encodedKey)`

- **Purpose**: Decodes a base64 string back into a binary key.
- **Implementation**:
  ```javascript
  function decodeKeyFromURL(encodedKey) {
      return Buffer.from(encodedKey, 'base64');
  }
  ```

## Testing

### `keyManagement.test.js`

This test suite ensures the functionality of the cryptographic operations.

#### Test Descriptions

##### RSA Key Pair Generation

- **Test**:
  ```javascript
  describe('RSA Key Pair Generation', () => {
      it('should generate a public and private key', () => {
          const { publicKey, privateKey } = generateKeyPair();
          expect(publicKey).toBeDefined();
          expect(privateKey).toBeDefined();
      });
  });
  ```

##### AES Key Generation

- **Test**:
  ```javascript
  describe('AES Key Generation', () => {
      it('should generate a 256-bit AES key', () => {
          const aesKey = generateAESKey();
          expect(aesKey.length).toBe(32);
      });
  });
  ```

##### AES Key Encryption and Decryption

- **Test**:
  ```javascript
  describe('AES Key Encryption and Decryption', () => {
      it('should encrypt and decrypt the AES key correctly', () => {
          const { publicKey, privateKey } = generateKeyPair();
          const aesKey = generateAESKey();
          const encryptedKey = encryptAESKey(aesKey, publicKey);
          const decryptedKey = decryptAESKey(encryptedKey, privateKey);
          expect(decryptedKey).toEqual(aesKey);
      });
  });
  ```

##### Key Encoding and Decoding for URL

- **Test**:
  ```javascript
  describe('Key Encoding and Decoding for URL', () => {
      it('should encode and decode the key correctly for URL transmission', () => {
          const aesKey = generateAESKey();
          const encodedKey = encodeKeyForURL(aesKey);
          const decodedKey = decodeKeyFromURL(encodedKey);
          expect(decodedKey).toEqual(aesKey);
      });
  });
  ```

## Conclusion

The key management system is crucial for ensuring secure communication in the chat application. It allows for the secure generation, sharing, and management of cryptographic keys, ensuring that only intended recipients can access encrypted communications.
```