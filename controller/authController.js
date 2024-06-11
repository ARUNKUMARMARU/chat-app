const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.register = async (req, res) => {
    const { userId, deviceId, name, phone, availCoins, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users (userId, deviceId, name, phone, availCoins, password) VALUES (?, ?, ?, ?, ?, ?)', 
            [userId, deviceId, name, phone, availCoins, hashedPassword]);
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
};

exports.login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE userId = ?', [userId]);
        if (rows.length === 0) return res.status(400).send('User not found');

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid password');

        const token = jwt.sign({ userId: user.userId, isPrime: user.isPrime }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Error logging in');
    }
};
