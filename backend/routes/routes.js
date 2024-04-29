const express = require('express');
const auth = require('../controllers/auth');
const chats = require('../controllers/chats');
const messages = require('../controllers/messages'); 
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/auth/login', auth.login);
router.get('/chats', authenticateToken, chats.get);
router.post('/chats', authenticateToken, chats.create);
router.get('/chats/search', authenticateToken, chats.findByTitle);
router.get('/messages/:chatId', authenticateToken, messages.getAllByChatId);
router.post('/messages/:chatId', authenticateToken, messages.create);
router.get('/messages/last/:chatId', authenticateToken, messages.getLastMessageByChatId);

module.exports = router;