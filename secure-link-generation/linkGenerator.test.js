// linkGenerator.test.js

const { generateSecureLink } = require('./linkGenerator');
const keyManagement = require('./keyManagement');
const crypto = require('crypto');

// Mock the keyManagement functions used in generateSecureLink
jest.mock('./keyManagement', () => ({
  encryptAESKey: jest.fn(),
  encodeKeyForURL: jest.fn()
}));

describe('Link Generator', () => {
  // Setting up common variables
  const publicKey = 'publicKeyExample';
  let aesKey;

  beforeAll(() => {
    // Generate a fixed AES key for consistency in tests
    aesKey = crypto.randomBytes(32);
    crypto.randomBytes = jest.fn(() => aesKey);
  });

  it('should generate a secure link containing the AES key', () => {
    // Mock implementations to return expected results
    const encryptedKey = Buffer.from('encryptedAESKey');
    const encodedKey = 'encodedAESKey';

    keyManagement.encryptAESKey.mockReturnValue(encryptedKey);
    keyManagement.encodeKeyForURL.mockReturnValue(encodedKey);

    const link = generateSecureLink(publicKey);

    // Check the structure of the generated link
    expect(link).toMatch(/^https:\/\/dchat\.com\/chat\/[a-f0-9]{32}\?key=encodedAESKey$/);
    expect(link).toContain(encodedKey);

    // Validate that keyManagement functions are called correctly
    expect(keyManagement.encryptAESKey).toHaveBeenCalledWith(aesKey, publicKey);
    expect(keyManagement.encodeKeyForURL).toHaveBeenCalledWith(encryptedKey);
  });

  it('should handle errors in key encryption and encoding gracefully', () => {
    // Simulate an error during the encryption or encoding process
    keyManagement.encryptAESKey.mockImplementation(() => {
      throw new Error('Encryption failed');
    });

    expect(() => generateSecureLink(publicKey)).toThrow('Encryption failed');

    // Ensure error handling is robust and informative
    keyManagement.encryptAESKey.mockRestore();
    keyManagement.encodeKeyForURL.mockImplementation(() => {
      throw new Error('Encoding failed');
    });

    expect(() => generateSecureLink(publicKey)).toThrow('Encoding failed');
  });
});


