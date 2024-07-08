```markdown
# P2P Connection Component

## Introduction

This document describes the Peer-to-Peer (P2P) connection component of our decentralized chat application. This component facilitates the establishment of direct connections between clients, enabling real-time messaging without the need for central servers.

## Installation and Setup

To set up the P2P connection component, execute the following commands in your terminal:

```bash
cd path/to/p2p-connection
npm install
```

This setup assumes that Node.js and npm are already installed on your system.

## Usage

To use the P2P connection functions, integrate them into your application as follows:

```javascript
const { createPeerConnection, startChatRoom, joinChatRoom } = require('./p2pConnection');

let peerConnection = createPeerConnection();
startChatRoom(peerConnection);
```

## Functions

### createPeerConnection()

- **Description:** Initializes and returns a new `RTCPeerConnection` object configured with default ICE servers.
- **Parameters:** None
- **Returns:** A new `RTCPeerConnection` object

### startChatRoom(peerConnection)

- **Description:** Generates an offer for a new chat room, sets the local description, and logs the offer to the console.
- **Parameters:**
  - `peerConnection`: The `RTCPeerConnection` object
- **Returns:** None

### joinChatRoom(peerConnection, offer)

- **Description:** Accepts an offer, sets the remote description, creates an answer, sets the local description for the answer, and completes the connection setup.
- **Parameters:**
  - `peerConnection`: The `RTCPeerConnection` object
  - `offer`: Offer description as an `RTCSessionDescription` object
- **Returns:** None

## API Documentation

### createPeerConnection()

- **Description:** Initializes a new `RTCPeerConnection`.
- **Parameters:** None
- **Returns:** A new `RTCPeerConnection` object

### startChatRoom(peerConnection)

- **Description:** Starts a chat room by creating an offer.
- **Parameters:**
  - `peerConnection`: The `RTCPeerConnection` object
- **Returns:** None

### joinChatRoom(peerConnection, offer)

- **Description:** Joins an existing chat room.
- **Parameters:**
  - `peerConnection`: The `RTCPeerConnection` object
  - `offer`: Offer description as an `RTCSessionDescription` object
- **Returns:** None

## Testing

To test the functionality of the P2P connection component, run the following command:

```bash
npm test
```

The test suite verifies that the P2P connection can correctly create offers, accept answers, and handle ICE candidates.

## License

This project is licensed under the GNU General Public License (GPL), which requires that all distributed copies, modifications, and derivatives remain open source under the same license.
```

