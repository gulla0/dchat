const {
    generatePin,
    validatePin,
    createConnectionRequest,
    handleConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest
} = require('./connectionManagement.js');

describe('Connection Management Functions', () => {
    test('generatePin should return a 6-digit pin and a timestamp', () => {
        const { pin, timestamp } = generatePin();
        expect(pin).toBeGreaterThanOrEqual(100000);
        expect(pin).toBeLessThanOrEqual(999999);
        expect(typeof timestamp).toBe('number');
    });

    test('validatePin should return true for a valid pin', () => {
        const { pin, timestamp } = generatePin();
        expect(validatePin(pin, timestamp)).toBe(true);
    });

    test('validatePin should return false for an expired pin', () => {
        const { pin, timestamp } = generatePin();
        const expiredTimestamp = timestamp - 31 * 60 * 1000; // 31 minutes ago
        expect(validatePin(pin, expiredTimestamp)).toBe(false);
    });

    test('createConnectionRequest should create a valid connection request', () => {
        const { pin, timestamp } = generatePin();
        const username = 'testuser';
        const connectionRequest = createConnectionRequest(username, pin, timestamp);
        expect(connectionRequest).toEqual({ username, pin, timestamp, status: 'pending' });
    });

    test('createConnectionRequest should throw an error for an expired pin', () => {
        const { pin, timestamp } = generatePin();
        const expiredTimestamp = timestamp - 31 * 60 * 1000; // 31 minutes ago
        const username = 'testuser';
        expect(() => createConnectionRequest(username, pin, expiredTimestamp)).toThrow('PIN is invalid or has expired.');
    });

    test('handleConnectionRequest should log a valid connection request', () => {
        const { pin, timestamp } = generatePin();
        const username = 'testuser';
        console.log = jest.fn();
        handleConnectionRequest(username, pin, timestamp);
        expect(console.log).toHaveBeenCalledWith('Connection request created:', { username, pin, timestamp, status: 'pending' });
    });

    test('handleConnectionRequest should log an error for an expired pin', () => {
        const { pin, timestamp } = generatePin();
        const expiredTimestamp = timestamp - 31 * 60 * 1000; // 31 minutes ago
        const username = 'testuser';
        console.error = jest.fn();
        handleConnectionRequest(username, pin, expiredTimestamp);
        expect(console.error).toHaveBeenCalledWith('PIN is invalid or has expired.');
    });

    test('acceptConnectionRequest should update the status to accepted', () => {
        const { pin, timestamp } = generatePin();
        const username = 'testuser';
        const connectionRequest = createConnectionRequest(username, pin, timestamp);
        acceptConnectionRequest(connectionRequest);
        expect(connectionRequest.status).toBe('accepted');
    });

    test('rejectConnectionRequest should update the status to rejected', () => {
        const { pin, timestamp } = generatePin();
        const username = 'testuser';
        const connectionRequest = createConnectionRequest(username, pin, timestamp);
        rejectConnectionRequest(connectionRequest);
        expect(connectionRequest.status).toBe('rejected');
    });
});