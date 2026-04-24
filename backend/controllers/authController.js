const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        const isEmail = identifier.includes('@');
        const query = isEmail ? { email: identifier } : { phone: identifier };

        const userExists = await User.findOne(query);
        if (userExists) {
            return res.status(400).json({ message: "Tài khoản này đã tồn tại!" });
        }

        const userData = { username, password };
        if (isEmail) userData.email = identifier;
        else userData.phone = identifier;

        const newUser = await User.create(userData);
        
        res.status(201).json({ 
            message: "Đăng ký thành công!", 
            user: { id: newUser._id, username: newUser.username } 
        });

    } catch (error) {
    process.stdout.write("\n--- PHÁT HIỆN LỖI ĐĂNG KÝ ---\n");
    process.stdout.write(error.stack + "\n");
    process.stdout.write("-----------------------------\n");

    res.status(500).json({ 
        message: "Lỗi hệ thống: " + error.message 
    });
}
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const isEmail = identifier.includes('@');
        const user = await User.findOne(isEmail ? { email: identifier } : { phone: identifier });

        if (!user) return res.status(400).json({ message: "Tài khoản không tồn tại!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

        res.json({ token, message: "Đăng nhập thành công!", user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Lỗi đăng nhập: " + error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { identifier } = req.body;

        if (!identifier) {
            return res.status(400).json({ message: "Vui lòng nhập Email hoặc Số điện thoại!" });
        }

        const isEmail = identifier.includes('@');
        const user = await User.findOne(isEmail ? { email: identifier } : { phone: identifier });

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy tài khoản này trong hệ thống!" });
        }

        res.status(200).json({ 
            message: "Hệ thống đã xác nhận! Vui lòng kiểm tra " + identifier + " để đặt lại mật khẩu." 
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi: " + error.message });
    }
};