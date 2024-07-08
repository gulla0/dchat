// messageHandler.js

function sendMessage(dataChannel, message) {
    if (dataChannel.readyState === 'open') {
        dataChannel.send(message);
    }
}

function setupDataChannel(peerConnection) {
    const dataChannel = peerConnection.createDataChannel("chatChannel");
    dataChannel.onopen = () => console.log("Data channel is open");
    dataChannel.onmessage = (event) => console.log("Received message:", event.data);

    return dataChannel;
}

module.exports = { sendMessage, setupDataChannel };
