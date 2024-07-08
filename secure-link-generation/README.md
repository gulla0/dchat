# Link Generator Module

## Overview

The Link Generator module is a vital component of a decentralized chat application, responsible for creating secure, encrypted links that incorporate an AES key. These links are essential for initiating encrypted chat sessions, ensuring that communications between participants remain secure.

## Module Description

### `linkGenerator.js`

#### Functionality

This file contains the `generateSecureLink` function, which is responsible for creating secure links for chat rooms.

#### `generateSecureLink(publicKey)`

- **Purpose**: 
  - Generates a secure chat room link containing an encrypted and encoded AES key, critical for initiating secure chat sessions and encrypting all messages within the session.

- **Procedure**:
  1. **Token Generation**: 
     - Uses `crypto.randomBytes` to generate a random 16-byte hexadecimal token, serving as a unique identifier for the chat session.
  2. **AES Key Generation**: 
     - Generates a random 32-byte AES key for message encryption.
  3. **AES Key Encryption**: 
     - Encrypts the AES key using the provided RSA public key to ensure only the holder of the corresponding RSA private key can decrypt it.
  4. **Key Encoding**: 
     - Encodes the encrypted AES key in base64 format for URL inclusion.
  5. **Link Construction**: 
     - Constructs the final chat link by appending the encoded AES key as a query parameter.

- **Code Implementation**:
  ```javascript
  const crypto = require('crypto');
  const { encryptAESKey, encodeKeyForURL } = require('./keyManagement');

  function generateSecureLink(publicKey) {
      const token = crypto.randomBytes(16).toString('hex');
      const aesKey = crypto.randomBytes(32);
      const encryptedAESKey = encryptAESKey(aesKey, publicKey);
      const encodedAESKey = encodeKeyForURL(encryptedAESKey);
      const link = `https://dchat.com/chat/${token}?key=${encodedAESKey}`;
      return link;
  }

  module.exports = { generateSecureLink };
  ```

## Testing

### `linkGenerator.test.js`

#### Overview

This test suite verifies that the `generateSecureLink` function works correctly, handling both successful operations and potential errors.

#### Test Setup

- **Mocking Dependencies**: 
  - Functions `encryptAESKey` and `encodeKeyForURL` from `keyManagement` are mocked to focus testing on the link generation process.

- **Variable Setup**: 
  - A fixed AES key is used in all tests to maintain consistency.

#### Test Cases

- **Secure Link Generation Test**
  - **Objective**: Verify that the `generateSecureLink` function produces a correctly formatted secure link containing the encoded AES key.
  - **Implementation**:
    ```javascript
    it('should generate a secure link containing the AES key', () => {
        const encryptedKey = Buffer.from('encryptedAESKey');
        const encodedKey = 'encodedAESKey';
        keyManagement.encryptAESKey.mockReturnValue(encryptedKey);
        keyManagement.encodeKeyForURL.mockReturnValue(encodedKey);
        const link = generateSecureLink(publicKey);
        expect(link).toMatch(/^https:\/\/dchat\.com\/chat\/[a-f0-9]{32}\?key=encodedAESKey$/);
        expect(link).toContain(encodedKey);
        expect(keyManagement.encryptAESKey).toHaveBeenCalledWith(aesKey, publicKey);
        expect(keyManagement.encodeKeyForURL).toHaveBeenCalledWith(encryptedKey);
    });
    ```

- **Error Handling Test**
  - **Objective**: Test the error handling for failures during the encryption and encoding processes.
  - **Implementation**:
    ```javascript
    it('should handle errors in key encryption and encoding gracefully', () => {
        keyManagement.encryptAESKey.mockImplementation(() => {
            throw new Error('Encryption failed');
        });
        expect(() => generateSecureLink(publicKey)).toThrow('Encryption failed');
        keyManagement.encryptAESKey.mockRestore();
        keyManagement.encodeKeyForURL.mockImplementation(() => {
            throw new Error('Encoding failed');
        });
        expect(() => generateSecureLink(publicKey)).toThrow('Encoding failed');
    });
    ```

### Conclusion

The Link Generator module is critical in providing secure and encrypted access to chat sessions in the decentralized chat application. By embedding AES keys in generated links, it ensures robust encryption and privacy of communications.