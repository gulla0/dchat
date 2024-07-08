# Peer-to-Peer Connection Documentation

## Overview

This documentation provides a detailed explanation of the peer-to-peer (P2P) connection implementation and its associated test file. The main functionality of the P2P connection involves creating peer connections, starting chat rooms, and joining chat rooms. The test file ensures that each component functions correctly.

## p2pConnection.js

### Dependencies

- `webrtc-adapter`: A library to handle WebRTC inconsistencies across different browsers.

### Functions

#### 1. `createPeerConnection`

This function initializes a new RTCPeerConnection object with a specified configuration. The configuration includes an array of ICE servers. 

**Code:**
```javascript
function createPeerConnection() {
    const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };
    const peerConnection = new RTCPeerConnection(configuration);

    // Handle ICE candidate generation
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            console.log("New ICE candidate: ", event.candidate);
        }
    };

    return peerConnection;
}
```

**Components:**
- `iceServers`: Array of ICE server URLs used for NAT traversal.
- `RTCPeerConnection`: Creates a new WebRTC connection.
- `onicecandidate`: Event handler for new ICE candidate generation.

#### 2. `startChatRoom`

This function starts a chat room by creating an offer and setting it as the local description of the peer connection. The offer is then shared with other peers.

**Code:**
```javascript
function startChatRoom(peerConnection) {
    peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
            // Offer to share with other peers
            console.log("Offer to join chat:", peerConnection.localDescription);
        })
        .catch(e => console.error(e));
}
```

**Components:**
- `createOffer`: Creates an SDP offer.
- `setLocalDescription`: Sets the local SDP description.
- `localDescription`: The local SDP description that is shared with other peers.

#### 3. `joinChatRoom`

This function allows another peer to join the chat room by accepting the offer and creating an answer, which is then set as the local description.

**Code:**
```javascript
function joinChatRoom(peerConnection, offer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => peerConnection.createAnswer())
        .then(answer => peerConnection.setLocalDescription(answer))
        .then(() => {
            // Answer to complete the handshake
            console.log("Answer to join chat:", peerConnection.localDescription);
        })
        .catch(e => console.error(e));
}
```

**Components:**
- `setRemoteDescription`: Sets the remote SDP description.
- `RTCSessionDescription`: Creates a new RTC session description.
- `createAnswer`: Creates an SDP answer.
- `localDescription`: The local SDP description that is sent back to the offerer to complete the handshake.

### Exports

**Code:**
```javascript
module.exports = { createPeerConnection, startChatRoom, joinChatRoom };
```

## Test File (p2pConnection.test.js)

### Dependencies

- `jest`: JavaScript testing framework.
- `p2pConnection`: The module containing the P2P connection functions.

### Global Mocks

Mocks for the global objects `RTCPeerConnection` and `RTCSessionDescription` are created to simulate WebRTC functionalities.

**Code:**
```javascript
global.RTCPeerConnection = function(configuration) {
    this.iceConnectionState = 'new';
    this.localDescription = null;
    this.remoteDescription = null;

    this.createOffer = jest.fn().mockImplementation(() => {
        const offer = { type: 'offer', sdp: 'dummy sdp' };
        this.localDescription = offer;
        return Promise.resolve(offer);
    });
    this.createAnswer = jest.fn().mockImplementation(() => {
        const answer = { type: 'answer', sdp: 'dummy sdp' };
        this.localDescription = answer;
        return Promise.resolve(answer);
    });
    this.setLocalDescription = jest.fn().mockImplementation(description => {
        this.localDescription = description;
        return Promise.resolve();
    });
    this.setRemoteDescription = jest.fn().mockImplementation(description => {
        this.remoteDescription = description;
        return Promise.resolve();
    });

    this.onicecandidate = null;
    this.addIceCandidate = jest.fn().mockResolvedValue();
};

global.RTCSessionDescription = function(descriptionInitDict) {
    return descriptionInitDict;
};
```

### Tests

#### 1. Test for Peer Connection Creation

This test checks if a peer connection object is created and has the expected initial state.

**Code:**
```javascript
test('should create a peer connection object', () => {
    const peerConnection = createPeerConnection();
    expect(peerConnection).toBeDefined();
    expect(peerConnection.iceConnectionState).toBe('new');
});
```

#### 2. Test for Generating Offer

This test checks if the `startChatRoom` function generates an offer correctly.

**Code:**
```javascript
test('should generate offer for chat room', async () => {
    const peerConnection = createPeerConnection();
    await startChatRoom(peerConnection);
    expect(peerConnection.createOffer).toHaveBeenCalled();
    expect(peerConnection.localDescription).toEqual({ type: 'offer', sdp: 'dummy sdp' });
});
```

#### 3. Test for Accepting Offer and Generating Answer

This test checks if the `joinChatRoom` function accepts an offer and generates an answer correctly.

**Code:**
```javascript
test('should accept offer and generate answer', async () => {
    const hostPeerConnection = createPeerConnection();
    await startChatRoom(hostPeerConnection);

    const guestPeerConnection = createPeerConnection();
    await joinChatRoom(guestPeerConnection, { type: 'offer', sdp: 'dummy sdp' });
    expect(guestPeerConnection.setRemoteDescription).toHaveBeenCalledWith({ type: 'offer', sdp: 'dummy sdp' });
    expect(guestPeerConnection.createAnswer).toHaveBeenCalled();
    expect(guestPeerConnection.localDescription).toEqual({ type: 'answer', sdp: 'dummy sdp' });
});
```

## Conclusion

This documentation provides a comprehensive overview of the P2P connection implementation and its associated tests. Each function and component is explained in detail to facilitate understanding and maintenance. The tests ensure that the P2P connection functionalities work as expected, providing a reliable foundation for building WebRTC-based applications.

