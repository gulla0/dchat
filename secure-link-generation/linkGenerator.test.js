// linkGenerator.test.js

const { generateSecureLink } = require('./linkGenerator');

describe('Link Generator', () => {
    test('generates a secure link', () => {
        const link = generateSecureLink();
        expect(link).toMatch(/^https:\/\/dchat.com\/chat\/[a-f0-9]{32}$/);
    });
});

