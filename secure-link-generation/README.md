```
# Link Generator Module

## Overview

The Link Generator module is a key component of the decentralized chat application, tasked with generating secure, encrypted links that embed an AES key. These links are crucial for initiating encrypted chat sessions, ensuring secure communication between participants.

## Module Description

### `linkGenerator.js`

#### Functionality

The `linkGenerator.js` file contains the `generateSecureLink` function, responsible for creating secure links for chat rooms.

#### `generateSecureLink(publicKey)`

- **Purpose**: 
  - Generates a secure chat room link that embeds an encrypted and encoded AES key. This link is crucial for starting secure chat sessions, ensuring that all messages within the session are encrypted using the AES key.
  
- **Procedure**:
  1. **Token Generation**: 
     - Utilizes `crypto.randomBytes` to generate a random 16-byte hexadecimal token, serving as a unique identifier for the chat session.
  2. **AES Key Generation**: 
     - Generates a random 32-byte AES key to encrypt chat messages.
  3. **AES Key Encryption**: 
     - Encrypts the AES key using the provided RSA public key, ensuring that only the holder of the corresponding RSA private key can decrypt it.
  4. **Key Encoding**: 
     - Encodes the encrypted AES key in base64 format, making it suitable for URL inclusion.
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


## Testing

### `linkGenerator.test.js`

#### Overview

The test suite for `linkGenerator.js` ensures that the `generateSecureLink` function performs as expected, correctly handling both successful operations and potential errors.

#### Test Setup

- **Mocking Dependencies**: 
  - The `keyManagement` functions `encryptAESKey` and `encodeKeyForURL` are mocked to isolate the link generation logic for testing.

- **Variable Setup**: 
  - A fixed AES key is generated before all tests to ensure consistency.

#### Test Cases

- **Secure Link Generation Test**
  - **Objective**: Confirm that the `generateSecureLink` function generates a correctly formatted secure link that contains the encoded AES key.
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
   

- **Error Handling Test**
  - **Objective**: Ensure that errors during the encryption and encoding processes are handled gracefully.
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


### Conclusion

The Link Generator module plays a critical role in the decentralized chat application by providing secure and encrypted access to chat sessions. Its ability to generate links embedding AES keys ensures that all communication within a session is secured through robust encryption, protecting against unauthorized access and maintaining the privacy of the communication.
```