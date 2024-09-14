const { createPeerConnection, startChatRoom, joinChatRoom, handleDataChannel } = require('./p2pConnection');

global.RTCPeerConnection = function(configuration) {
    this.iceConnectionState = 'new';
    this.localDescription = null;
    this.remoteDescription = null;
    this.dataChannel = null;

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

    this.createDataChannel = jest.fn().mockImplementation(label => {
        this.dataChannel = { label, onmessage: null };
        return this.dataChannel;
    });

    this.onicecandidate = null;
    this.ondatachannel = null;
    this.addIceCandidate = jest.fn().mockResolvedValue();
};

global.RTCSessionDescription = function(descriptionInitDict) {
    return descriptionInitDict;
};

describe('PeerConnection', () => {
    test('should create a peer connection object', () => {
        const peerConnection = createPeerConnection();
        expect(peerConnection).toBeDefined();
        expect(peerConnection.iceConnectionState).toBe('new');
    });

    test('should generate offer for chat room', async () => {
        const peerConnection = createPeerConnection();
        const dataChannel = startChatRoom(peerConnection);
        expect(peerConnection.createOffer).toHaveBeenCalled();
        expect(peerConnection.localDescription).toEqual({ type: 'offer', sdp: 'dummy sdp' });
        expect(dataChannel).toBeDefined();
        expect(dataChannel.label).toBe('chat');
    });

    test('should accept offer and generate answer', async () => {
        const hostPeerConnection = createPeerConnection();
        startChatRoom(hostPeerConnection);

        const guestPeerConnection = createPeerConnection();
        await joinChatRoom(guestPeerConnection, { type: 'offer', sdp: 'dummy sdp' });
        expect(guestPeerConnection.setRemoteDescription).toHaveBeenCalledWith({ type: 'offer', sdp: 'dummy sdp' });
        expect(guestPeerConnection.createAnswer).toHaveBeenCalled();
        expect(guestPeerConnection.localDescription).toEqual({ type: 'answer', sdp: 'dummy sdp' });
    });

    test('should handle data channel messages', done => {
        const peerConnection = createPeerConnection();
        handleDataChannel(peerConnection, event => {
            expect(event.data).toBe('Hello, peer!');
            done();
        });

        const dataChannelEvent = { channel: { onmessage: null } };
        peerConnection.ondatachannel(dataChannelEvent);
        dataChannelEvent.channel.onmessage({ data: 'Hello, peer!' });
    });
});
