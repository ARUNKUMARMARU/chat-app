const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/chatrooms', authenticateToken, chatController.createRoom);
//router.post('/invite', authenticateToken, chatController.inviteParticipant);
router.post('/joinroom', authenticateToken, chatController.joinRoom);
router.post('/messages', authenticateToken, chatController.sendMessage);

module.exports = router;
