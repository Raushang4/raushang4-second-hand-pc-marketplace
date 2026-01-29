
import React from 'react';
import { ConfirmedOrder } from '../types';

interface OrderConfirmationProps {
  order: ConfirmedOrder;
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onClose }) => {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto animate-in fade-in zoom-in duration-500">
      <div className="glass-heavy rounded-[3rem] border-emerald-500/20 overflow-hidden shadow-2xl shadow-emerald-500/5">
        {/* Success Header */}
        <div className="bg-emerald-500/10 p-12 text-center border-b border-emerald-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full -z-10"></div>
          
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/40 transform rotate-12">
            <svg className="w-10 h-10 text-black transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2 className="text-3xl font-black mb-2 tracking-tight">Order Secured</h2>
          <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Transaction Verified via Razorpay Escrow</p>
        </div>

        {/* Order Details Body */}
        <div className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Order ID</p>
              <p className="text-sm font-mono font-bold text-white uppercase">{order.orderId}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Payment ID</p>
              <p className="text-[10px] font-mono text-gray-400 truncate">{order.paymentId}</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01]">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Item Details</p>
            <h3 className="text-xl font-bold mb-1">{order.productName}</h3>
            <p className="text-xs text-gray-500">Verified Pre-Owned Component</p>
          </div>

          {/* Ledger Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Total Purchase Price</span>
              <span className="font-mono font-bold">₹{order.totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest">Advance Paid Now</span>
              </div>
              <span className="font-mono font-bold text-emerald-400">₹{order.advancePaid.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-lg pt-4 border-t border-white/5">
              <span className="font-bold">COD Balance</span>
              <div className="text-right">
                <span className="font-mono font-black text-white text-2xl">₹{order.remainingBalance.toLocaleString()}</span>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Pay on Delivery</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <div className="p-4 glass rounded-2xl bg-cyan-500/5 border-cyan-500/10 flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p className="text-[10px] text-cyan-300 leading-relaxed uppercase tracking-wider font-bold">
                A custom verification video for your component is being generated. You will receive a WhatsApp notification with the stress test links within 4 hours.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.2em] border border-white/10 transition-all"
            >
              Continue Browsing Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
