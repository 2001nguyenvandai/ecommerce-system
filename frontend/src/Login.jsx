import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            alert("Đăng nhập thành công!");
            localStorage.setItem('token', res.data.token); // Lưu token để dùng cho các trang sau
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
            <h2>Đăng Nhập</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Đăng nhập</button>
        </form>
    );
};

export default Login;