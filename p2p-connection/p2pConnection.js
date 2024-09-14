require('webrtc-adapter');

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

function startChatRoom(peerConnection) {
    const dataChannel = peerConnection.createDataChannel("chat");

    peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
            console.log("Offer to join chat:", peerConnection.localDescription);
        })
        .catch(e => console.error(e));

    return dataChannel;
}

function joinChatRoom(peerConnection, offer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => peerConnection.createAnswer())
        .then(answer => peerConnection.setLocalDescription(answer))
        .then(() => {
            console.log("Answer to join chat:", peerConnection.localDescription);
        })
        .catch(e => console.error(e));
}

function handleDataChannel(peerConnection, onMessageCallback) {
    peerConnection.ondatachannel = event => {
        const dataChannel = event.channel;
        dataChannel.onmessage = onMessageCallback;
    };
}

module.exports = { createPeerConnection, startChatRoom, joinChatRoom, handleDataChannel };
