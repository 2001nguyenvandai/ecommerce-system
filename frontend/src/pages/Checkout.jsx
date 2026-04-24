import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Package, Plus, Minus, ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const { cartItems, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const handleOrder = () => {
    const confirmOrder = window.confirm("Bạn xác nhận đặt hàng với hình thức Thanh toán khi nhận hàng?");
    
    if (confirmOrder) {
      alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      clearCart(); 
      navigate('/'); 
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl text-center border border-slate-100 max-w-md">
          <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-indigo-600" size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Chưa có sản phẩm nào!</h2>
          <p className="text-slate-500 mb-8">Vui lòng chọn mô hình bạn thích trước khi thanh toán.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg"
          >
            QUAY LẠI CỬA HÀNG
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Nút quay lại */}
        <button 
          onClick={() => navigate('/cart')} 
          className="flex items-center text-slate-500 mb-8 font-bold hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          QUAY LẠI GIỎ HÀNG
        </button>

        <h1 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tight">Xác nhận đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase text-slate-800">
              <Package className="text-indigo-600" size={24} /> Kiểm tra sản phẩm
            </h2>
            
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-5 border-b border-slate-50 pb-6 last:border-0">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 flex-shrink-0">
                    <img src={item.img} className="w-full h-full object-contain" alt={item.name} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm line-clamp-2 mb-1">{item.name}</h4>
                    <p className="text-indigo-600 font-black">{item.price}</p>
                    
                    <div className="flex items-center gap-4 mt-3 bg-slate-50 w-fit px-3 py-1.5 rounded-xl border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)} 
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="font-black text-slate-800 text-sm min-w-[12px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)} 
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-5 uppercase text-slate-800">Phương thức thanh toán</h2>
              <div className="flex items-center gap-4 p-5 bg-green-50 border-2 border-green-500 rounded-3xl">
                <div className="bg-green-500 p-2 rounded-full text-white">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-xs text-green-700 font-medium italic">Miễn phí vận chuyển toàn quốc</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-200">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center opacity-60 font-medium">
                  <span>Tạm tính:</span>
                  <span>{totalPrice.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between items-center opacity-60 font-medium">
                  <span>Vận chuyển:</span>
                  <span className="text-green-400 font-bold italic">MIỄN PHÍ</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-2xl font-black border-t border-white/10 pt-6 mb-10">
                <span>TỔNG CỘNG:</span>
                <span className="text-indigo-400 tracking-tighter">
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>

              <button 
                onClick={handleOrder}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-[1.5rem] font-black text-xl transition-all active:scale-95 shadow-xl shadow-indigo-900/50 uppercase tracking-widest"
              >
                Xác nhận đặt hàng
              </button>
              
              <p className="text-center text-[10px] text-slate-500 mt-6 uppercase tracking-[0.3em]">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;