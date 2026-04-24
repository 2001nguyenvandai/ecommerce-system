const express = require('express');
const router = express.Router();
// 1. Phải có forgotPassword trong danh sách lấy ra từ Controller
const { register, login, forgotPassword } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// 2. PHẢI CÓ DÒNG NÀY VÀ VIẾT ĐÚNG TỪNG CHỮ 
router.post('/forgot-password', forgotPassword); 

module.exports = router;