const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, 
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
}, { timestamps: true });

// SỬA TẠI ĐÂY: Bỏ chữ 'next' đi vì dùng async/await
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return; // Không dùng next() ở đây

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err; // Ném lỗi ra để Mongoose tự bắt
    }
});

module.exports = mongoose.model('User', userSchema);