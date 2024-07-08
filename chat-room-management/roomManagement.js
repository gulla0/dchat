// roomManagement.js
function closeRoom(peerConnection) {
    if (peerConnection && peerConnection.close) {
        peerConnection.close();
        console.log("Room has been closed by the host.");
    }
}

module.exports = { closeRoom };

const nodemailer = require('nodemailer');

async function sendRoomInvitations(emailList, roomLink) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: emailList.join(", "),
        subject: 'Chat Room Invitation',
        text: `You're invited to join a chat room: ${roomLink}`
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Room invitation(s) sent successfully:', result);
    } catch (error) {
        console.error('Error sending room invitation:', error);
    }
}

module.exports = { closeRoom, sendRoomInvitations };
