CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    deviceId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    availCoins INT DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    isPrime BOOLEAN DEFAULT FALSE
);

CREATE TABLE chatrooms (
    roomId INT AUTO_INCREMENT PRIMARY KEY,
    creatorId INT,
    FOREIGN KEY (creatorId) REFERENCES users(userId),
    roomPassword VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room_members (
    roomId INT,
    userId INT,
    FOREIGN KEY (roomId) REFERENCES chatrooms(roomId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    PRIMARY KEY (roomId, userId)
);

CREATE TABLE messages (
    messageId INT AUTO_INCREMENT PRIMARY KEY,
    roomId INT,
    userId INT,
    FOREIGN KEY (roomId) REFERENCES chatrooms(roomId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    content TEXT,
    sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friend_requests (
    requestId INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT,
    receiverId INT,
    FOREIGN KEY (senderId) REFERENCES users(userId),
    FOREIGN KEY (receiverId) REFERENCES users(userId),
    status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
