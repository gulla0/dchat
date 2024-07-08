# Chat Room Management

## Overview

This document provides an overview of the backend components developed for managing chat rooms within a decentralized chat application. It covers the functionalities for closing chat rooms and sending email invitations to participants.

## Components

### roomManagement.js

#### Functions

##### closeRoom

- **Purpose**: This function is responsible for closing the active peer connection when the host decides to end the chat room.
- **Implementation**:
  ```javascript
  function closeRoom(peerConnection) {
      if (peerConnection && peerConnection.close) {
          peerConnection.close();
          console.log("Room has been closed by the host.");
      }
  }
  ```
  - **Parameters**:
    - `peerConnection`: A WebRTC peer connection object which is currently managing the chat room.
  - **Behavior**: Checks if the peer connection exists and has a close method, then calls it to terminate the connection.

##### sendRoomInvitations

- **Purpose**: Sends email invitations to potential chat room participants with a link to join the room.
- **Implementation**:
  ```javascript
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
  ```
  - **Parameters**:
    - `emailList`: Array of email addresses to which the room link will be sent.
    - `roomLink`: URL for the chat room that recipients can use to join.
  - **Behavior**: Configures a mail transporter using Gmail, sets up email options with recipients and content, then sends the emails.

## Testing

### roomManagement.test.js

#### Overview

Tests implemented to ensure the correct functioning of the room management functionalities.

#### Tests

##### closeRoom

- **Purpose**: Ensures that the `closeRoom` function correctly closes a peer connection.
- **Implementation**:
  ```javascript
  describe('closeRoom', () => {
      it('should close the peer connection', () => {
          const mockPeerConnection = { close: jest.fn() };
          closeRoom(mockPeerConnection);
          expect(mockPeerConnection.close).toHaveBeenCalled();
      });
  });
  ```
  - **Behavior**: Mocks a peer connection object, invokes `closeRoom`, and checks if the close method is called.

##### sendRoomInvitations

- **Purpose**: Verifies that `sendRoomInvitations` correctly sends an email to all listed recipients with the appropriate content.
- **Implementation**:
  ```javascript
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
  ```
  - **Behavior**: Mocks `nodemailer`'s sendMail function to simulate sending emails, checks if emails are sent with the correct parameters.

## Conclusion

This README provides detailed information about the functions and tests for the chat room management component. Each function is designed to enhance the chat application's functionality, allowing hosts to manage their chat rooms effectively and invite participants securely.
```