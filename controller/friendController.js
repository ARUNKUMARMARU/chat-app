const db = require('../config/database');

exports.sendFriendRequest = async (req, res) => {
    const { receiverId } = req.body;
    try {
        await db.execute('INSERT INTO friend_requests (senderId, receiverId) VALUES (?, ?)', [req.user.userId, receiverId]);
        res.status(201).send('Friend request sent');
    } catch (err) {
        res.status(500).send('Error sending friend request');
    }
};
