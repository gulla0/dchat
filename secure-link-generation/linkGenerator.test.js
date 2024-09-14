// linkGenerator.test.js

const { generateSecureLink } = require('./linkGenerator');
const keyManagement = require('../key-exchange-component/keyManagement');
const crypto = require('crypto');

// Mock the keyManagement functions used in generateSecureLink
jest.mock('../key-exchange-component/keyManagement', () => ({
  encryptAESKey: jest.fn(),
  encodeKeyForURL: jest.fn()
}));

describe('Link Generator', () => {
  const publicKey = 'publicKeyExample';
  let aesKey;
  let token;

  beforeAll(() => {
    aesKey = Buffer.from('a'.repeat(64), 'hex'); // Mock 32-byte AES key (64 hex characters)
    token = Buffer.from('b'.repeat(32), 'hex'); // Mock 16-byte token (32 hex characters)

    crypto.randomBytes = jest.fn((size) => {
      if (size === 32) return aesKey;
      if (size === 16) return token;
      return Buffer.alloc(size);
    });
  });

  it('should generate a secure link containing the AES key', () => {
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
});


