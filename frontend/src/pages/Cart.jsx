import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => {
        const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
        return acc + (priceNum * item.quantity);
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 flex flex-col items-center border border-slate-100">
                    <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag size={40} className="text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800">Giỏ hàng đang trống</h2>
                    <p className="text-slate-500 mt-2">Có vẻ như bạn chưa chọn được mô hình nào ưng ý.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="mt-8 bg-indigo-600 hover:bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-200"
                    >
                        ĐI MUA SẮM NGAY
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center text-slate-400 hover:text-indigo-600 mb-8 font-bold transition-all group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    TIẾP TỤC MUA SẮM
                </button>

                <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight uppercase">
                    Giỏ hàng <span className="text-indigo-600">({cartItems.length})</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                                <div className="w-24 h-24 bg-slate-50 rounded-2xl p-2 flex-shrink-0">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-800 text-base mb-1 line-clamp-1">{item.name}</h3>
                                    <p className="text-indigo-600 font-black text-lg">{item.price}</p>
                                </div>

                                <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                                    <button 
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                                    >
                                        <Minus size={16} strokeWidth={3} />
                                    </button>
                                    <span className="font-black text-slate-800 min-w-[20px] text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                                    >
                                        <Plus size={16} strokeWidth={3} />
                                    </button>
                                </div>

                                <button 
                                    onClick={() => removeFromCart(item.id)} 
                                    className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-2xl transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 sticky top-10 border border-indigo-50">
                            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                <CreditCard size={22} className="text-indigo-600" /> TÓM TẮT ĐƠN HÀNG
                            </h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-slate-500 font-medium">
                                    <span>Tạm tính:</span>
                                    <span className="text-slate-900">{totalPrice.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500 font-medium">
                                    <span>Vận chuyển:</span>
                                    <span className="text-green-500 font-bold uppercase text-xs">Miễn phí</span>
                                </div>
                            </div>

                            <div className="border-t-2 border-dashed border-slate-100 pt-6 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-900 font-bold uppercase">Tổng tiền:</span>
                                    <span className="text-3xl font-black text-indigo-600 tracking-tighter">
                                        {totalPrice.toLocaleString()}đ
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-slate-900 transition-all active:scale-95 shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
                            >
                                TIẾN HÀNH THANH TOÁN
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <p className="text-center text-slate-400 text-[10px] mt-6 font-medium uppercase tracking-[0.2em]">
                                
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;