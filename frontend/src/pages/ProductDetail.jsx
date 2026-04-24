import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, Box } from 'lucide-react';
import { useCart } from '../context/CartContext'; 
import toast from 'react-hot-toast';

import luffyImg from '../assets/20.png';
import zoroImg from '../assets/21.png';
import narutoImg from '../assets/22.png';
import gokuImg from '../assets/23.png';
import iromanImg from '../assets/24.png';
import batmanImg from '../assets/25.png';
import kamadoImg from '../assets/26.png';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart(); 

    const figures = [
        { id: 1, name: "Monkey D. Luffy - Gear 5", price: "1,250,000đ", img: luffyImg, brand: "Bandai", height: "25cm", desc: "Mô hình Luffy trạng thái Thần Mặt Trời Gear 5 (Nika) với các chi tiết khói mây bao quanh cực kỳ sống động. Chất liệu nhựa PVC cao cấp chống phai màu, phù hợp để trưng bày tủ kính." },
        { id: 2, name: "Roronoa Zoro - Wano Kuni", price: "980,000đ", img: zoroImg, brand: "Banpresto", height: "20cm", desc: "Zoro trong trang phục truyền thống tại Wano quốc. Mô hình khắc họa tư thế rút kiếm chuẩn bị tung chiêu thức 'Tam Kiếm Phái' huyền thoại. Độ chi tiết của các thanh kiếm được làm thủ công sắc sảo." },
        { id: 3, name: "Naruto Uzumaki - Sage Mode", price: "1,100,000đ", img: narutoImg, brand: "Bandai", height: "18cm", desc: "Naruto trong trạng thái Tiên Nhân Thuật (Sage Mode) với đôi mắt đặc trưng. Đi kèm là phụ kiện Rasenshuriken có thể tháo rời và nhiều khớp linh hoạt." },
        { id: 4, name: "Goku Super Saiyan Blue", price: "1,350,000đ", img: gokuImg, brand: "Banpresto", height: "23cm", desc: "Sản phẩm chính hãng mô tả Songoku ở trạng thái Super Saiyan Blue. Điểm nhấn là mái tóc xanh ánh kim và các đường gân cơ bắp được điêu khắc tỉ mỉ." },
        { id: 5, name: "Iron Man Mark 85", price: "2,400,000đ", img: iromanImg, brand: "ZDtoys", height: "18cm", desc: "Bộ giáp tối tân nhất của Tony Stark trong Avengers: Endgame. Lớp sơn Nano metallic bóng bẩy, đi kèm với các hiệu ứng tia lửa điện và giá đỡ đặc biệt." },
        { id: 6, name: "Batman - The Dark Knight", price: "2,100,000đ", img: batmanImg, brand: "McFarlane", height: "18cm", desc: "Dựa trên hình ảnh Batman của Christian Bale. Đi kèm với áo choàng vải cao cấp, súng móc móc và các bàn tay thay thế. Khớp nối cực kỳ chắc chắn." },
        { id: 7, name: "Spider-Man No Way Home", price: "1,550,000đ", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400", brand: "ZDtoys", height: "17cm", desc: "Phiên bản Integrated Suit tích hợp công nghệ từ Stark Industries. Nổi bật với các đường chỉ vàng óng ánh trên nền đỏ xanh truyền thống." },
        { id: 8, name: "Tanjiro Kamado - Hinokami", price: "890,000đ", img: kamadoImg, brand: "Aniplex", height: "16cm", desc: "Tanjiro tung ra chiêu thức Điệu nhảy của Thần Lửa. Hiệu ứng lửa rồng bao quanh lưỡi kiếm được làm từ nhựa trong suốt màu cam rực rỡ." },
    ];

    const product = figures.find(f => f.id === parseInt(id));

    if (!product) return <div className="text-center py-20 font-bold text-slate-500">Sản phẩm không tồn tại!</div>;

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`Đã thêm ${product.name} vào giỏ!`, {
            icon: '🛒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center text-slate-500 hover:text-indigo-600 transition-all mb-8 font-bold group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    TRỞ VỀ DANH SÁCH
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 flex items-center justify-center border border-slate-100 sticky top-24 shadow-sm hover:shadow-md transition-shadow">
                            <img 
                                src={product.img} 
                                alt={product.name} 
                                className="max-h-[650px] w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                {product.brand}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
                            </div>
                            <span className="text-slate-400 text-sm font-medium border-l pl-4">
                                Sản phẩm chính hãng 100%
                            </span>
                        </div>

                        <div className="bg-indigo-50/50 p-6 rounded-2xl mb-8">
                            <p className="text-5xl font-black text-indigo-600">
                                {product.price}
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl mb-8 border-2 border-slate-50 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                <Box size={18} className="text-indigo-600" /> Thông số & Mô tả
                            </h3>
                            <div className="text-slate-600 text-base leading-relaxed space-y-4">
                                <p className="flex items-start gap-2">
                                    <span className="font-bold text-slate-900 whitespace-nowrap">📏 Chiều cao:</span> 
                                    <span>{product.height}</span>
                                </p>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <p className="flex flex-col gap-1">
                                    <span className="font-bold text-slate-900 font-bold text-slate-900">✨ Chi tiết sản phẩm:</span> 
                                    <span className="leading-relaxed">{product.desc}</span>
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 mb-10">
                            <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <ShieldCheck className="text-green-600" size={24} />
                                <span>Bảo hành rơi vỡ - Đổi trả trong 7 ngày</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <Truck className="text-blue-600" size={24} />
                                <span>Giao siêu tốc - Kiểm hàng thoải mái</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleAddToCart} 
                            className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-600 shadow-2xl active:scale-95 transition-all sticky bottom-4 lg:relative"
                        >
                            <ShoppingCart size={28} /> THÊM VÀO GIỎ HÀNG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;