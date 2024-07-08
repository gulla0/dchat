require('webrtc-adapter');

// A simple function to create a peer connection
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

// Function to start a chat room
function startChatRoom(peerConnection) {
    peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
            // Offer to share with other peers
            console.log("Offer to join chat:", peerConnection.localDescription);
        })
        .catch(e => console.error(e));
}

// Function for another peer to join the chat room
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

module.exports = { createPeerConnection, startChatRoom, joinChatRoom };
