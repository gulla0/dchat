const { createPeerConnection, startChatRoom, joinChatRoom } = require('./p2pConnection');

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

describe('PeerConnection', () => {
    test('should create a peer connection object', () => {
        const peerConnection = createPeerConnection();
        expect(peerConnection).toBeDefined();
        expect(peerConnection.iceConnectionState).toBe('new');
    });

    test('should generate offer for chat room', async () => {
        const peerConnection = createPeerConnection();
        await startChatRoom(peerConnection);
        expect(peerConnection.createOffer).toHaveBeenCalled();
        expect(peerConnection.localDescription).toEqual({ type: 'offer', sdp: 'dummy sdp' });
    });

    test('should accept offer and generate answer', async () => {
        const hostPeerConnection = createPeerConnection();
        await startChatRoom(hostPeerConnection);

        const guestPeerConnection = createPeerConnection();
        await joinChatRoom(guestPeerConnection, { type: 'offer', sdp: 'dummy sdp' });
        expect(guestPeerConnection.setRemoteDescription).toHaveBeenCalledWith({ type: 'offer', sdp: 'dummy sdp' });
        expect(guestPeerConnection.createAnswer).toHaveBeenCalled();
        expect(guestPeerConnection.localDescription).toEqual({ type: 'answer', sdp: 'dummy sdp' });
    });
});
