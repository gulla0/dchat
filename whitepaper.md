# White Paper: Decentralized Peer-to-Peer Chat Application

## Abstract
In an age of increasing concerns over privacy, data ownership, and surveillance, decentralized communication platforms have emerged as a solution to restore control and security to users. This white paper introduces a peer-to-peer (P2P) chat application leveraging blockchain technology, specifically the Cardano blockchain, to enable secure and private communication without relying on centralized servers or intermediaries. Users can connect directly by establishing self-hosted communication channels with cryptographic security and full data control. The application is designed to start with secure one-on-one chats and scale to multi-user chat rooms without introducing middlemen, ensuring scalability and trust.

## Introduction
Modern centralized communication platforms suffer from significant vulnerabilities, including data breaches, government surveillance, and exploitation of user data by corporations. These platforms often compromise user privacy for profit or convenience. This presents an urgent need for decentralized communication solutions where users can maintain control over their personal data, connections, and messaging.

The decentralized peer-to-peer (P2P) chat application proposed in this paper aims to provide a secure, transparent, and scalable communication platform. Built on the Cardano blockchain for connection management and utilizing WebRTC for real-time messaging, this platform ensures that all conversations are private, encrypted, and free from the risks associated with centralized intermediaries.

## System Architecture
The system architecture of the decentralized P2P chat application is designed with simplicity, security, and scalability in mind. It removes the need for centralized servers, instead using self-hosted servers managed by each user to facilitate direct communication. Below, we break down the key components and how they function together to create a secure communication platform.

### 1. Components

#### User Authentication
Users authenticate by connecting their Cardano wallets. This serves as a verifiable identity mechanism, where a unique wallet address and cryptographic signing of nonces ensure the authenticity of each user.  
A key feature is encouraging users to create a new, dedicated wallet specifically for this purpose, ensuring further separation of communication activity from other blockchain activities.

#### Connection Management
Connections between users are managed via blockchain transactions. To establish a connection, both parties must perform a self-transaction to their own wallet, acting as proof of their intent to connect.  
The connection request is initiated by one party using a randomly generated 6-digit number and username provided by the person they wish to connect with. The number is valid for only 10 minutes, adding an additional layer of security.  
Once both parties complete their respective transactions, the connection is established, and they can start communicating without limit.

#### Transaction Handling
The system uses the Cardano blockchain to manage connection establishment and termination transactions. The blockchain’s decentralized and immutable nature ensures that all connection-related activities are transparent, verifiable, and tamper-proof.  
Each self-transaction, whether for initiating or terminating a connection, is recorded on the blockchain, providing an immutable record of all communication events.

#### Connection State Management
The status of each connection (e.g., active or terminated) is tracked by the system. This allows both parties to always be aware of the connection's current state. Transactions ensure that connection statuses are recorded immutably.

#### Message Handling
Once a connection is established, messages are exchanged through WebRTC data channels. WebRTC offers low-latency, peer-to-peer communication, which is ideal for real-time messaging.  
To ensure security, all messages are encrypted using AES encryption, with the keys exchanged via RSA.

#### Key Management
RSA key pairs are generated for each connection, and AES keys are securely exchanged between the users for message encryption.  
A new secure link is generated for each chat session, ensuring that each conversation is isolated from the previous ones and no data is carried over in an unencrypted form.

#### Secure Link Generation
A new secure link is generated for each conversation, using the AES encryption keys exchanged during the handshake phase. This ensures that each chat session has its own encrypted link, reducing the risk of message interception or unauthorized access.

### 2. Self-Hosted Servers
Each user runs their own self-hosted server to facilitate communication, allowing complete control over data storage and transmission.  
Self-hosted servers manage WebRTC connections, ensuring that no third-party servers are involved in relaying messages or storing data.

### 3. Proof of Transaction System
The proof of transaction system on the Cardano blockchain is critical to ensuring transparency, security, and accountability.

- **Connection Establishment**: When a user wishes to connect with another user, both parties must perform a transaction to their own wallets. These transactions serve as proof of intent and are immutably recorded on the blockchain.
- **Connection Termination**: A connection is severed when one party performs a self-transaction to their own wallet, breaking the connection on both sides. This ensures mutual disconnection, with proof recorded on the blockchain.
- **Immutable Record**: All transactions are recorded immutably, ensuring that no connection or disconnection can occur without leaving a verifiable trace.

## User Experience

### Flow of User Interaction:
- **Download and Setup**: Users download the app and connect their Cardano wallets. It is recommended that users create a new wallet specifically for communication purposes.
- **Initiating Connection**: To connect with another user, the initiator must have a 6-digit number and username provided by the intended recipient. The number is only valid for 10 minutes. The initiator sends a connection request by making a self-transaction.
- **Accepting Connection**: The recipient of the request, after receiving the 6-digit number and username, completes the connection by also performing a self-transaction. There is no time limit for accepting the request after it is sent.
- **Messaging**: Once both transactions are complete, the chat session is established. Users can exchange messages via WebRTC, with all data encrypted and stored locally.
- **Data Handling**: Each time a chat starts, a new secure link is generated, and previously saved chats are loaded onto the new link. Once a session ends, data is again stored locally. Users have the option to save or delete chats after each session.

This process provides an intuitive, blockchain-secured method for initiating and maintaining P2P communication while offering users full control over their chat data.

## Security Model
The security of the decentralized chat application hinges on a combination of blockchain-based transaction verification, cryptographic encryption, and user-controlled data hosting.

### 1. Blockchain-Based Verification
Each connection and disconnection is recorded on the blockchain as a transaction, providing verifiable proof that both actions occurred.  
This decentralized proof-of-transaction system ensures that no single party can manipulate or falsify connection states, enhancing accountability and transparency.

### 2. End-to-End Encryption
All messages are encrypted using AES, with RSA used to securely exchange encryption keys between users. This ensures that messages remain private and cannot be intercepted by third parties, including the app developers.  
The use of unique secure links for each chat session ensures that every conversation is compartmentalized and isolated from the previous one, minimizing the risk of cross-chat vulnerabilities.

### 3. Self-Hosted Data
Since each user hosts their own server, they retain full control over their data. No central servers store or relay messages, significantly reducing the risk of centralized data breaches or surveillance.

## Use Cases

### Private Conversations
For individuals who prioritize privacy in personal conversations, this decentralized chat app provides a platform free from surveillance and centralized control. Users can connect securely with no concerns over data mining or third-party access.

### Business Communication
Businesses can use the platform for secure, decentralized communication without relying on external providers that could compromise sensitive business information.

### Decentralized Collaboration
Decentralized teams can communicate securely, knowing that no centralized party can access or monitor their discussions. This is especially useful for organizations working on privacy-focused or blockchain-based projects.

## Scalability and Future Work
The system is designed to start with secure one-on-one communications, with future plans to expand into multi-user chat rooms. The scalability is ensured by the app’s decentralized, peer-to-peer architecture, which eliminates the need for middlemen or central servers. Future enhancements could include:

- **Group Communication**: Expanding the system to allow for secure, encrypted multi-user chat rooms.
- **Encrypted File Sharing**: Adding support for encrypted file sharing directly within chat sessions.
- **Cross-Chain Compatibility**: Exploring compatibility with other blockchains, broadening the user base.
- **Mobile Support**: Enhancing the app’s usability across different mobile platforms, ensuring smooth, cross-device communication.

## Conclusion
This decentralized P2P chat application offers a secure, privacy-focused communication platform that puts control back in the hands of users. By leveraging blockchain technology, self-hosted servers, and end-to-end encryption, the system ensures that all communication is both private and verifiable. As the app grows, it will maintain its core ethos of decentralization and user control, scaling seamlessly from one-on-one conversations to multi-user chat rooms.
