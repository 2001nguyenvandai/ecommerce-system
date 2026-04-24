import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, LogOut, Star, PackageX, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import toast from 'react-hot-toast'; 

import luffyImg from '../assets/20.png';
import zoroImg from '../assets/21.png';
import narutoImg from '../assets/22.png';
import gokuImg from '../assets/23.png';
import iromanImg from '../assets/24.png';
import batmanImg from '../assets/25.png';
import kamadoImg from '../assets/26.png';

const Home = () => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart(); 
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("default"); // Trạng thái sắp xếp

    const figures = [
        { id: 1, name: "Monkey D. Luffy - Gear 5", price: "1,250,000đ", img: luffyImg, tag: "Hot", rating: 5 },
        { id: 2, name: "Roronoa Zoro - Wano Kuni", price: "980,000đ", img: zoroImg, tag: "New", rating: 5 },
        { id: 3, name: "Naruto Uzumaki - Sage Mode", price: "1,100,000đ", img: narutoImg, tag: "Sale", rating: 5 },
        { id: 4, name: "Goku Super Saiyan Blue", price: "1,350,000đ", img: gokuImg, tag: "Hot", rating: 5 },
        { id: 5, name: "Iron Man Mark 85", price: "2,400,000đ", img: iromanImg, tag: "Limited", rating: 5 },
        { id: 6, name: "Batman - The Dark Knight", price: "2,100,000đ", img: batmanImg, tag: "New", rating: 4 },
        { id: 7, name: "Spider-Man No Way Home", price: "1,550,000đ", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400", tag: "Hot", rating: 5 },
        { id: 8, name: "Tanjiro Kamado - Hinokami", price: "890,000đ", img: kamadoImg, tag: "Sale", rating: 5 },
    ];

    const parsePrice = (priceStr) => {
        return parseInt(priceStr.replace(/,/g, '').replace('đ', ''));
    };

    const filteredFigures = figures
        .filter(fig => fig.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortType === "priceAsc") return parsePrice(a.price) - parsePrice(b.price);
            if (sortType === "priceDesc") return parsePrice(b.price) - parsePrice(a.price);
            return 0; // Mặc định
        });

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation(); 
        addToCart(product);
        toast.success(`Đã thêm ${product.name} vào giỏ!`, {
            style: { borderRadius: '10px', background: '#333', color: '#fff' },
            iconTheme: { primary: '#4f46e5', secondary: '#fff' },
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                            <ShoppingCart className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-black text-indigo-600 tracking-tighter italic">FIG-STORE</span>
                    </div>

                    <div className="hidden md:flex flex-1 mx-12 relative">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm mô hình..." 
                            className="w-full bg-slate-100 border-2 border-transparent rounded-full py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-indigo-400 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>

                    <div className="flex items-center gap-5">
                        <div onClick={() => navigate('/cart')} className="relative cursor-pointer group">
                            <ShoppingCart className="text-slate-600 group-hover:text-indigo-600 transition-colors" size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold border-2 border-white animate-bounce">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-1.5 text-slate-600 hover:text-red-500 font-bold transition-colors text-sm border-l pl-5">
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Thoát</span>
                        </button>
                    </div>
                </div>
            </nav>

            <header className="bg-indigo-600 py-6 px-4 text-center text-white overflow-hidden relative">
                <div className="max-w-6xl mx-auto bg-white/10 p-5 rounded-[2rem] backdrop-blur-md border border-white/20 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
                        THẾ GIỚI FIGURE CHÍNH HÃNG
                    </h2>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div className="relative">
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                            {searchTerm ? `Kết quả: "${searchTerm}"` : "Sản phẩm mới nhất"}
                        </h3>
                        <div className="h-1.5 w-20 bg-indigo-600 mt-2 rounded-full"></div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sắp xếp theo:</label>
                        <div className="relative">
                            <select 
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="appearance-none bg-white border-2 border-slate-100 text-slate-700 text-sm font-bold py-2 pl-4 pr-10 rounded-2xl outline-none focus:border-indigo-600 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="default">Mặc định</option>
                                <option value="priceAsc">Giá: Thấp đến Cao ↑</option>
                                <option value="priceDesc">Giá: Cao đến Thấp ↓</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {filteredFigures.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <PackageX size={64} strokeWidth={1} className="mb-4" />
                        <p className="text-lg font-medium">Không tìm thấy mô hình phù hợp.</p>
                        <button onClick={() => setSearchTerm("")} className="mt-4 text-indigo-600 font-bold hover:underline">Xem tất cả</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredFigures.map((fig) => (
                            <div 
                                key={fig.id} 
                                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 group flex flex-col h-full cursor-pointer"
                                onClick={() => navigate(`/product/${fig.id}`)}
                            >
                                <div className="relative h-64 overflow-hidden bg-slate-100 p-4">
                                    <img src={fig.img} alt={fig.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4">
                                        <span className={`text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider
                                            ${fig.tag === 'Hot' ? 'bg-orange-500' : fig.tag === 'New' ? 'bg-green-500' : 'bg-indigo-600'}`}>
                                            {fig.tag}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex text-yellow-400 mb-2 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < fig.rating ? "currentColor" : "none"} className={i < fig.rating ? "" : "text-slate-300"} />
                                        ))}
                                    </div>
                                    <h4 className="text-slate-800 font-bold text-base mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2 h-12">
                                        {fig.name}
                                    </h4>
                                    <p className="text-indigo-600 font-black text-xl mb-5">{fig.price}</p>
                                    
                                    <button 
                                        onClick={(e) => handleAddToCart(e, fig)}
                                        className="mt-auto w-full bg-slate-900 text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95"
                                    >
                                        <ShoppingCart size={18} /> Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-slate-900 text-slate-500 py-10">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
                    <span className="text-lg font-black tracking-tighter italic text-indigo-400">FIG-STORE</span>
                    <p className="text-center text-[12px] tracking-widest uppercase">© 2026 FIGURE STORE - Nơi các dân chơi kết nối đam mê</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;