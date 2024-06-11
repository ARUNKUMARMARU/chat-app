const express = require('express');
const router = express.Router();
const  {authenticateToken} = require('../middleware/authMiddleware');
const friendController = require('../controller/friendController');

router.post('/friend-requests', authenticateToken, friendController.sendFriendRequest);
