const { closeRoom, sendRoomInvitations } = require('./roomManagement');
const nodemailer = require('nodemailer');

jest.mock('nodemailer');

describe('Room Management', () => {
    describe('closeRoom', () => {
        it('should close the peer connection', () => {
            const mockPeerConnection = { close: jest.fn() };
            closeRoom(mockPeerConnection);
            expect(mockPeerConnection.close).toHaveBeenCalled();
        });
    });

    describe('sendRoomInvitations', () => {
        it('should send email invitations to all participants', async () => {
            const mockSendMail = jest.fn().mockResolvedValue('Email sent');
            nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

            await sendRoomInvitations(['test@example.com'], 'http://chatroom.link');
            expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
                to: 'test@example.com'
            }));
        });
    });
});
