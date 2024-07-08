// messageHandler.test.js

const { sendMessage, setupDataChannel } = require('./messageHandler');

describe('Message Handling', () => {
    let peerConnection;
    let dataChannel;

    beforeEach(() => {
        peerConnection = { createDataChannel: jest.fn(() => ({
            send: jest.fn(),
            onopen: jest.fn(),
            onmessage: jest.fn()
        }))};

        dataChannel = setupDataChannel(peerConnection);
    });

    test('sendMessage sends a message when the data channel is open', () => {
        dataChannel.readyState = 'open';
        sendMessage(dataChannel, 'Hello, world!');
        expect(dataChannel.send).toHaveBeenCalledWith('Hello, world!');
    });
});

