import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        identifier: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,11}$/;

        if (mode === 'signup' && !formData.username.trim()) {
            newErrors.username = "Tên không được để trống";
        }

        if (!formData.identifier) {
            newErrors.identifier = "Vui lòng nhập Email hoặc Số điện thoại";
        } else {
            const isEmail = formData.identifier.includes('@');
            if (isEmail && !emailRegex.test(formData.identifier)) {
                newErrors.identifier = "Email không đúng định dạng (VD: abc@gmail.com)";
            } else if (!isEmail && !phoneRegex.test(formData.identifier)) {
                newErrors.identifier = "Số điện thoại phải có 10-11 chữ số";
            }
        }

        if (mode !== 'forgot') {
            if (!formData.password) {
                newErrors.password = "Mật khẩu không được để trống";
            } else if (formData.password.length < 6) {
                newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
        let endpoint = '';
        if (mode === 'login') endpoint = '/api/auth/login';
        else if (mode === 'signup') endpoint = '/api/auth/register';
        else endpoint = '/api/auth/forgot-password';

        const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
        
        if (mode === 'login') {
    localStorage.setItem('token', res.data.token);
    alert("Đăng nhập thành công!"); 
    window.location.href = '/'; 
} else {
            alert("Thành công: " + res.data.message);
            if (mode === 'signup') setMode('login');
        }

    } catch (err) {
        const serverMsg = err.response?.data?.message || "Không thể kết nối đến máy chủ";
        alert("Lỗi: " + serverMsg);
    }
};

    return (
        <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                {mode === 'forgot' && (
                    <button onClick={() => { setMode('login'); setErrors({}); }} className="flex items-center text-indigo-600 mb-4 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Login
                    </button>
                )}

                <h1 className="text-3xl font-bold text-gray-800 text-center uppercase">
                    {mode === 'login' ? "Welcome Back" : mode === 'signup' ? "Create Account" : "Reset Password"}
                </h1>

                <form className="space-y-4 mt-8" onSubmit={handleSubmit} noValidate>
                    {mode === 'signup' && (
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Your Full Name" 
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${errors.username ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-indigo-500'}`}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1 italic">{errors.username}</p>}
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Email address or Phone number" 
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${errors.identifier ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-indigo-500'}`}
                            onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                        />
                        {errors.identifier && <p className="text-red-500 text-xs mt-1 italic">{errors.identifier}</p>}
                    </div>

                    {mode !== 'forgot' && (
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-indigo-500'}`}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1 italic">{errors.password}</p>}
                        </div>
                    )}

                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transform active:scale-95 transition-all">
                        {mode === 'login' ? "Login" : mode === 'signup' ? "Sign Up" : "Send Reset Link"}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-3">
    {mode === 'login' && (
    <>
        <p 
            className="text-sm text-red-500 font-medium cursor-pointer hover:text-red-700 hover:underline transition-all mb-2" 
            onClick={() => { setMode('forgot'); setErrors({}); }}
        >
            Forgot Password?
        </p>
        
        <p className="text-gray-600">
            Don't have an account? <span className="text-indigo-600 font-bold cursor-pointer underline" onClick={() => { setMode('signup'); setErrors({}); }}>Sign up</span>
        </p>
    </>
)}

    {(mode === 'signup' || mode === 'forgot') && (
        <p className="text-gray-600">
            Already have an account? <span className="text-indigo-600 font-bold cursor-pointer underline" onClick={() => { setMode('login'); setErrors({}); }}>Login</span>
        </p>
    )}
</div>
            </div>
        </div>
    );
};

export default Auth;