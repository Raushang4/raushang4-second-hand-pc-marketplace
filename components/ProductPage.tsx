
import React, { useState, useEffect } from 'react';
import { LEGAL_DISCLAIMER, RAZORPAY_KEY } from '../constants';
import { Product, ConfirmedOrder, Variation } from '../types';
import AIImage from './AIImage';
import AdminVerificationPanel from './AdminVerificationPanel';

interface ProductPageProps {
  product: Product;
  onOrderSuccess: (order: ConfirmedOrder) => void;
  onAddToCart: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onOrderSuccess, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [localProduct, setLocalProduct] = useState(product);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    product.variations ? product.variations[0] : null
  );

  useEffect(() => {
    setActiveImage(0);
    setLocalProduct(product);
    setSelectedVariation(product.variations ? product.variations[0] : null);
  }, [product]);

  const currentPrice = selectedVariation ? selectedVariation.price : product.price;
  const currentAdvance = selectedVariation ? selectedVariation.shippingAdvance : product.shippingAdvance;
  const currentName = selectedVariation ? `${product.name} (${selectedVariation.name})` : product.name;

  const handleCheckout = async () => {
    // 1. Check if the Razorpay script is actually loaded and available
    const RazorpayConstructor = (window as any).Razorpay;
    if (!RazorpayConstructor) {
      alert("Razorpay SDK is not loaded. This usually happens due to aggressive ad-blockers or slow connection. Please disable ad-blockers and refresh.");
      return;
    }

    // 2. Validate the API Key from environment variables
    if (!RAZORPAY_KEY) {
      console.error("CRITICAL: Razorpay Key is missing. Check your .env file and ensure VITE_RAZORPAY_KEY_ID is set.");
      alert("Configuration Error: The payment gateway key is missing. Please contact the administrator.");
      return;
    }

    setIsLoading(true);
    try {
      // 3. Razorpay amount must be a strict integer in paise
      const amountInPaise = Math.round(currentAdvance * 100);

      const options = {
        key: RAZORPAY_KEY, 
        amount: amountInPaise, 
        currency: "INR",
        name: "raushang4.in",
        description: `Hybrid COD Advance for ${currentName}`,
        image: "https://cdn.shopify.com/s/files/1/0883/2735/6600/files/R4_Logo_Small.png?v=1749989227",
        handler: function (response: any) {
          onOrderSuccess({
            orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
            productName: currentName,
            totalPrice: currentPrice,
            advancePaid: currentAdvance,
            remainingBalance: currentPrice - currentAdvance,
            paymentId: response.razorpay_payment_id
          });
          setIsLoading(false);
        },
        prefill: { 
          name: "Verified Buyer",
          email: "support@raushang4.in",
          contact: "919319033249"
        },
        notes: {
          product_id: product.id,
          variation_id: selectedVariation?.id || 'standard'
        },
        theme: { color: "#10b981" },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };
      
      const rzp1 = new RazorpayConstructor(options);
      
      rzp1.on('payment.failed', function (response: any) {
        setIsLoading(false);
        console.error("Razorpay Payment Failed:", response.error);
        alert(`Payment Error: ${response.error.description}`);
      });

      rzp1.open();
    } catch (error: any) {
      setIsLoading(false);
      console.error("Gateway Exception:", error);
      alert("Internal gateway error: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16 pt-12 items-start">
      {/* Left: Gallery */}
      <div className="sticky top-24 space-y-6">
        <div className="glass-heavy rounded-[3rem] overflow-hidden aspect-square relative group border-white/5 shadow-2xl">
          <AIImage 
            src={product.images[activeImage]} 
            alt={product.name} 
            category={product.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10 text-emerald-400">
              STATUS: {localProduct.status.replace('_', ' ')}
            </span>
            {localProduct.stock <= 2 && (
              <span className="px-4 py-1.5 bg-red-500/20 backdrop-blur-xl rounded-full text-[10px] font-black tracking-widest uppercase border border-red-500/20 text-red-400">
                LOW STOCK
              </span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-5 rounded-2xl border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">🛡️</div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Warranty</p>
              <p className="text-[9px] text-gray-500 font-bold uppercase">{product.warranty}</p>
            </div>
          </div>
          <div className="glass p-5 rounded-2xl border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">✅</div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Policy</p>
              <p className="text-[9px] text-gray-500 font-bold uppercase">{product.moneyBack}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-500/10 rounded-lg text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] border border-emerald-500/10">
              {product.category} Marketplace
            </span>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">SKU: RSH-{product.id.slice(0, 4)}</span>
          </div>
          <h1 className="text-5xl font-black leading-[1.05] mb-6 tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-5">
             <span className="text-5xl font-black font-mono tracking-tighter">₹{currentPrice.toLocaleString()}</span>
             {product.originalPrice > currentPrice && (
               <span className="px-3 py-1 bg-white/5 rounded-lg text-sm font-bold text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
             )}
             <span className="text-emerald-500 text-xs font-black uppercase tracking-widest">
               {Math.round((1 - currentPrice/product.originalPrice) * 100)}% OFF
             </span>
          </div>
        </div>

        {product.variations && product.variations.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Select Configuration</p>
            <div className="flex flex-wrap gap-3">
              {product.variations.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariation(v)}
                  className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    selectedVariation?.id === v.id 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 glass rounded-2xl border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Chipset</p>
            <p className="text-xs font-bold text-white uppercase">{product.chipset}</p>
          </div>
          <div className="p-5 glass rounded-2xl border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Specifications</p>
            <p className="text-xs font-bold text-white uppercase">
              {selectedVariation ? selectedVariation.name : product.vram}
            </p>
          </div>
        </div>

        <div className="glass-heavy p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black italic">COD</div>
          <div className="grid grid-cols-2 gap-10 mb-10 relative">
            <div>
              <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-3">Hybrid COD Advance</p>
              <h2 className="text-5xl font-black font-mono tracking-tighter text-white">₹{currentAdvance}</h2>
              <p className="text-[9px] text-gray-500 font-medium leading-relaxed mt-2 italic">
                Secure shipping + Marketplace escrow. Non-refundable after dispatch.
              </p>
            </div>
            <div className="text-right flex flex-col justify-center border-l border-white/5 pl-10">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">Balance Due on COD</p>
              <p className="text-3xl font-black font-mono text-white/40">₹{(currentPrice - currentAdvance).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex gap-5 relative">
             <button onClick={onAddToCart} className="flex-1 py-7 rounded-[2rem] bg-white/5 hover:bg-white/10 text-white font-black text-[11px] uppercase tracking-[0.2em] border border-white/10 transition-all active:scale-95">
                Add to Cart
             </button>
             <button 
                disabled={isLoading} 
                onClick={handleCheckout} 
                className={`flex-[2] py-7 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 group relative overflow-hidden ${
                  isLoading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-2xl shadow-emerald-500/30'
                }`}
             >
                <span className="relative z-10">{isLoading ? 'OPENING SECURE GATEWAY...' : 'INITIATE HYBRID CHECKOUT'}</span>
                {!isLoading && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>}
             </button>
          </div>
          
          <p className="mt-8 text-[9px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider text-center">
            🔒 {LEGAL_DISCLAIMER}
          </p>
        </div>

        {(localProduct.status === 'IN_TESTING' || localProduct.status === 'AVAILABLE') && (
          <AdminVerificationPanel 
            productId={product.id} 
            price={currentPrice}
            sellerAccountId={product.sellerAccountId}
            onUpdate={() => setLocalProduct({...localProduct, status: 'VERIFIED'})} 
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
