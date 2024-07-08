
# Message Handling Component

## Introduction

This document provides a detailed overview of the Message Handling component used in the decentralized chat application. This component is responsible for managing the sending and receiving of messages between peers using WebRTC Data Channels.

## messageHandler.js

### Purpose

The `messageHandler.js` file contains functions necessary to handle message transmission via WebRTC. This includes setting up a data channel on a WebRTC peer connection and sending messages through it.

### Implementation Details

- **Function:** `setupDataChannel`
  - **Description:** Sets up a data channel on the provided WebRTC peer connection. It configures event listeners for the data channel's `open` and `message` events.
  - **Parameters:** `peerConnection` - A WebRTC peer connection object.
  - **Returns:** The initialized data channel.

- **Function:** `sendMessage`
  - **Description:** Sends a message through an open data channel if the channel's state allows.
  - **Parameters:**
    - `dataChannel` - The data channel through which the message will be sent.
    - `message` - The message to be sent.
  - **Returns:** None, but triggers the `send` method of the data channel.

### Code Explanation

```javascript
const sendMessage = (dataChannel, message) => {
    if (dataChannel.readyState === 'open') {
        dataChannel.send(message);
    }
};

const setupDataChannel = (peerConnection) => {
    const dataChannel = peerConnection.createDataChannel("chatChannel");
    dataChannel.onopen = () => console.log("Data channel is open");
    dataChannel.onmessage = (event) => console.log("Received message:", event.data);

    return dataChannel;
};
```

- **Data Channel Setup:** Initializes a data channel with handlers for open and message events to log status and incoming messages.
- **Send Message:** Checks if the data channel is open before attempting to send a message to avoid errors related to trying to use a closed or not-yet-open channel.

## messageHandler.test.js

### Purpose

The `messageHandler.test.js` file contains tests to ensure that the message handling functionality behaves as expected, particularly verifying that messages are only sent when the data channel is open.

### Implementation Details

- **Test:** `sendMessage sends a message when the data channel is open`
  - **Description:** Tests that the `sendMessage` function correctly sends messages through an open data channel using mocked methods.
  - **Expected Outcome:** The test passes if the `send` method of the data channel is called with the correct message when the channel state is 'open'.

### Code Explanation

```javascript
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
```

- **Setup:** Mocks a peer connection and a data channel to test the `sendMessage` function without needing a real WebRTC environment.
- **Test Execution:** Manipulates the `readyState` of the data channel to simulate its opening, and checks if the `send` method is called correctly.

## Testing

To test the functionality of the Message Handling component, execute the following command in your terminal:

```
npm test
```

This command runs the Jest test suite defined in `messageHandler.test.js`, ensuring all functionalities are working as expected.

## Conclusion

This README provides a comprehensive guide to the Message Handling component of the decentralized chat application. It details how messages are handled, sent, and received through WebRTC Data Channels, ensuring efficient and secure communication between peers.