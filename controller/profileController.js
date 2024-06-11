const db = require('../config/database');

exports.getProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE userId = ?', [userId]);
        if (rows.length === 0) return res.status(404).send('User not found');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send('Error retrieving profile');
    }
};
