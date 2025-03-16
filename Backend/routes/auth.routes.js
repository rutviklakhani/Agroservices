const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;
