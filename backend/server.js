const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
console.log("--- Kiểm tra biến môi trường ---");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Đã nhận ✅" : "Chưa nhận ❌");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("Không tìm thấy biến MONGO_URI trong .env");
        }
        await mongoose.connect(uri);
        console.log('✅ KẾT NỐI MONGODB THÀNH CÔNG!');
    } catch (err) {
        console.error('❌ Lỗi kết nối:', err.message);
    }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});