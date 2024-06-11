const express = require('express');
const router = express.Router();
const  {authenticateToken} = require('../middleware/authMiddleware');
const profileController = require('../controller/profileController')

router.get('/profile/:userId', authenticateToken, profileController.getProfile);
