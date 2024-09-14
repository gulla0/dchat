# Decentralized P2P Chat Application Requirements Brief

## Overview

A secure, decentralized peer-to-peer chat application that leverages the Cardano blockchain for proof of intent in connection management and WebRTC for real-time, direct communication. The application provides a user-friendly experience similar to making a phone call, where users can initiate and terminate chat sessions seamlessly.

## Core Components

1. **Peer-to-Peer Connection**

   - Utilize WebRTC for direct peer-to-peer communication.
   - Implement functions for creating peer connections, starting chat sessions, and managing data channels.
   - Ensure compatibility with existing modules such as `p2p-connection` and `message-handling`.

2. **Blockchain Integration**

   - Integrate with the Cardano blockchain for recording proof of intent when initiating or terminating connections.
   - Implement self-transaction creation for users to signal their intent.
   - Develop wallet connection features for user authentication.

3. **Message Handling**

   - Use WebRTC data channels for sending and receiving encrypted messages.
   - Implement message encryption using AES keys, securely exchanged via RSA.
   - Ensure messages are only exchanged when both users are online.

4. **Key Management**

   - Generate and manage RSA key pairs for asymmetric encryption.
   - Create and securely exchange AES keys for symmetric message encryption.
   - Automate secure link generation for each chat session under the hood.

5. **Connection Management**

   - Implement a process where the initiator must make a blockchain transaction as proof of intent.
   - Enforce a 10-minute validity period for the initiator's PIN.
   - Allow either user to terminate the connection via a self-transaction.
   - No need for apps to monitor the blockchain; transactions serve as prerequisites for app actions.

6. **User Interface**

   - Design intuitive interfaces for wallet connection, initiating connections, messaging, and managing active connections.
   - Implement notifications for incoming connection requests, session initiation, and termination.
   - Provide clear guidance on the use of PINs and usernames during the connection process.

## Detailed Requirements

### Blockchain Integration

1. **Wallet Connection**

   - Implement functionality for users to connect their Cardano wallets within the app.
   - Encourage the creation of dedicated wallets for communication purposes.

2. **Transaction Handling**

   - Develop functions to create and submit self-transactions on the Cardano blockchain.
   - Ensure transactions are minimal, containing no sensitive data.
   - Transactions act as proofs of intent or termination but are not directly involved in the connection process.

3. **Proof of Intent and Termination**

   - Use the act of making a transaction as proof of intent to connect or terminate a connection.
   - The app uses the presence of the transaction as a prerequisite to proceed with connection requests or terminations.

### Connection Lifecycle

1. **Initiating a Connection**

   - **User A** requests to connect with **User B**.
   - **User B** provides a 6-digit PIN and username to **User A**.
   - **User A** performs a self-transaction on the Cardano blockchain within 10 minutes as proof of intent.
   - **User A's app** sends a direct connection request to **User B's app** using the PIN and username.

2. **Accepting a Connection**

   - **User B's app** receives the connection request and validates it using the stored PIN and username.
   - **User B** accepts the connection within the app.
   - No additional transaction is required from **User B** to accept the connection.

3. **Active Connection**

   - After validation, the app establishes a secure connection.
   - Users can initiate message calls without additional transactions.
   - Communication occurs only when both users are online.

4. **Terminating a Connection**

   - Either user can terminate the connection by making a self-transaction.
   - The app recognizes the transaction (as a prerequisite) and severs the connection.
   - Re-establishing the connection requires repeating the initial connection process.

### Security

1. **Encryption**

   - Use RSA encryption for secure key exchange.
   - Implement AES encryption for all message data.
   - Generate new encryption keys for each chat session to ensure forward secrecy.

2. **Key Storage**

   - Securely store encryption keys and session information on the user's device.
   - Implement measures to protect against unauthorized access to stored keys.

3. **PIN and Username Validation**

   - Use the 6-digit PIN and username internally for authenticating connection requests.
   - Do not include the PIN or username in any blockchain transactions.

### Data Management

1. **Session Management**

   - Automatically generate and handle secure links for each chat session.
   - Ensure that session data is isolated and securely managed.

2. **Local Storage**

   - Store chat histories and connection information locally on the user's device.
   - Provide options for users to save or delete chat histories after sessions end.

3. **Data Security**

   - Encrypt stored data to protect against unauthorized access.
   - Implement data cleanup processes when connections are terminated.

### User Experience

1. **Intuitive Interfaces**

   - Design user-friendly interfaces for all app functionalities.
   - Simplify processes for initiating connections and starting chat sessions.

2. **Notifications and Feedback**

   - Implement clear notifications for incoming connection requests, session starts, and session ends.
   - Provide feedback during transactions, such as progress indicators or confirmations.

3. **Guidance and Support**

   - Include helpful tips and explanations for using PINs, usernames, and wallets.
   - Offer troubleshooting assistance within the app.

### Testing

1. **Functional Testing**

   - Develop comprehensive test suites for all new components.
   - Test the connection initiation process, including PIN validation and transaction handling.

2. **Security Testing**

   - Perform security assessments on key management and encryption implementations.
   - Test for vulnerabilities related to unauthorized access and data leakage.

3. **Integration Testing**

   - Ensure seamless integration with existing modules.
   - Test the entire connection lifecycle from initiation to termination.

## Non-Functional Requirements

1. **Performance**

   - Ensure minimal latency in establishing connections and during messaging.
   - Optimize the app to handle network variations and provide a smooth user experience.

2. **Scalability**

   - Design the system to handle an increasing number of users without degradation in performance.
   - Prepare for future features like group chats and additional functionalities.

3. **Privacy**

   - Guarantee user privacy through robust encryption and secure key management.
   - Ensure that no personal data is exposed on the blockchain or through the app.

4. **Usability**

   - Create an interface accessible to users unfamiliar with blockchain technology.
   - Provide clear instructions and minimize technical jargon.

5. **Compatibility**

   - Ensure the application works across different devices and operating systems.
   - Support both desktop and mobile platforms, optimizing interfaces accordingly.

## Integration with Existing Codebase

1. **Module Compatibility**

   - Maintain compatibility with existing modules:
     - `message-handling`
     - `secure-link-generation`
     - `key-exchange-component`
     - `p2p-connection`
     - `chat-room-management`

2. **Code Refactoring**

   - Refactor existing components as necessary to integrate blockchain-based connection management.
   - Ensure that new features do not disrupt existing functionalities.

3. **Testing and Validation**

   - Update existing test suites to include new features.
   - Validate that the integration maintains the stability and reliability of the application.

## Additional Considerations

1. **Security Measures**

   - Implement safeguards against brute-force attacks on the 6-digit PIN by enforcing time limits and possibly rate limiting.
   - Regularly update and patch the application to protect against emerging security threats.

2. **User Education**

   - Provide educational resources within the app to help users understand the importance of security practices.
   - Encourage users to keep their wallets and devices secure.

3. **Legal and Ethical Compliance**

   - Ensure compliance with data protection regulations and laws applicable in target regions.
   - Address any legal considerations related to encryption and blockchain usage.

## Conclusion

This requirements brief outlines the essential features and considerations for developing a decentralized P2P chat application that prioritizes security, privacy, and user control. By integrating blockchain technology for proof of intent and leveraging WebRTC for real-time communication, the application offers a robust solution for secure messaging without reliance on centralized servers. The design focuses on providing a familiar and intuitive user experience while upholding the principles of decentralization and end-to-end encryption.


