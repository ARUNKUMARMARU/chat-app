const db = require('../config/database');

exports.createRoom = async (req, res) => {
    if (!req.user.isPrime) return res.status(403).send('Only prime members can create chat rooms');
    const { roomPassword } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO chatrooms (creatorId, roomPassword) VALUES (?, ?)', [req.user.userId, roomPassword]);
        res.status(201).json({ roomId: result.insertId });
    } catch (err) {
        res.status(500).send('Error creating chat room');
    }
};
// exports.inviteParticipant = async (req, res) => {
//     // Implement secure invitation mechanism here
// };

exports.joinRoom = async (req, res) => {
    const { roomId } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM room_members WHERE roomId = ?', [roomId]);
        if (rows.length >= 6) return res.status(400).send('Room is full');
        
        if (!req.user.isPrime) {
            const [userRows] = await db.execute('SELECT * FROM room_members WHERE userId = ?', [req.user.userId]);
            if (userRows.length > 0 && req.user.availCoins < 150) return res.status(400).send('Insufficient coins');
        }
        
        await db.execute('INSERT INTO room_members (roomId, userId) VALUES (?, ?)', [roomId, req.user.userId]);
        res.status(200).send('Joined room successfully');
    } catch (err) {
        res.status(500).send('Error joining room');
    }
};
exports.sendMessage = async (req, res) => {
    const { roomId, content } = req.body;
    try {
        await db.execute('INSERT INTO messages (roomId, userId, content) VALUES (?, ?, ?)', [roomId, req.user.userId, content]);
        res.status(201).send('Message sent');
    } catch (err) {
        res.status(500).send('Error sending message');
    }
};
