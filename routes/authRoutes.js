const express = require('express');
const { login, validateToken, createAdmin } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.get('/validate', authMiddleware, validateToken);
router.post('/create-admin', createAdmin);  

module.exports = router;
