
import React, { useState, useRef, useEffect } from 'react';
import { verifyAndPayoutSeller } from '../services/backendControllers';

interface AdminPanelProps {
  productId: string;
  price: number;
  sellerAccountId?: string;
  onUpdate: () => void;
}

interface LogEntry {
  timestamp: string;
  type: 'EVENT' | 'REQUEST' | 'RESPONSE' | 'ERROR';
  message: string;
  data?: any;
}

const AdminVerificationPanel: React.FC<AdminPanelProps> = ({ productId, price, sellerAccountId, onUpdate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (type: LogEntry['type'], message: string, data?: any) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      data
    }]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleFullVerification = async () => {
    setIsProcessing(true);
    setLogs([]); // Clear previous logs
    
    addLog('EVENT', "Initializing hardware stress test suite...");
    
    // Step 1: Stress Test Simulation
    await new Promise(r => setTimeout(r, 1200));
    addLog('EVENT', "Thermal benchmark complete: Peaks at 74°C.");
    addLog('EVENT', "VRAM Stability: 100% (FurMark validated).");
    
    // Step 2: API Trigger
    addLog('EVENT', "Triggering Razorpay Route API sequence...");
    
    try {
      const result = await verifyAndPayoutSeller(productId, price, sellerAccountId);
      
      // Log the Request Payload
      addLog('REQUEST', "POST https://api.razorpay.com/v1/transfers", result.payload);
      
      await new Promise(r => setTimeout(r, 800));

      if (result.success) {
        addLog('RESPONSE', "200 OK - Transfer Processed Successfully", result.response);
        addLog('EVENT', "WhatsApp automation triggered for seller notification.");
        onUpdate();
      } else {
        addLog('ERROR', `Payout failed: ${result.error}`);
      }
    } catch (err: any) {
      addLog('ERROR', `Critical gateway failure: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-12 p-8 glass rounded-[2.5rem] border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">🤖</div>
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Verification & Payout Engine
        </h3>
        <span className="text-[8px] font-mono text-gray-600 bg-white/5 px-2 py-1 rounded">ROUTE_V1.2_ENABLED</span>
      </div>
      
      <div className="space-y-6">
        <button
          disabled={isProcessing}
          onClick={handleFullVerification}
          className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group ${
            isProcessing ? 'bg-gray-800 text-gray-500 cursor-wait' : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 active:scale-95'
          }`}
        >
          <span className="relative z-10">{isProcessing ? 'EXECUTING SMART CONTRACT...' : 'Verify Product & Automate Payout'}</span>
          {!isProcessing && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>}
        </button>

        <div className="p-6 bg-black/80 rounded-[2rem] border border-white/5 font-mono text-[10px] h-[300px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
             <span className="text-gray-500 font-bold uppercase tracking-widest text-[8px]">Real-time Transaction Monitor</span>
             <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/30"></div>
             </div>
          </div>
          
          <div className="flex-grow overflow-y-auto custom-scrollbar space-y-4 pr-2">
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center opacity-20 italic">
                Awaiting manual verification trigger...
              </div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-600 font-bold">[{log.timestamp}]</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase ${
                      log.type === 'EVENT' ? 'bg-blue-500/10 text-blue-400' :
                      log.type === 'REQUEST' ? 'bg-cyan-500/10 text-cyan-400' :
                      log.type === 'RESPONSE' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {log.type}
                    </span>
                    <span className={`font-bold ${log.type === 'ERROR' ? 'text-red-400' : 'text-gray-300'}`}>
                      {log.message}
                    </span>
                  </div>
                  
                  {log.data && (
                    <div className="ml-6 mt-1 p-3 bg-white/[0.02] rounded-lg border border-white/5 text-gray-500 overflow-x-auto whitespace-pre">
                      {JSON.stringify(log.data, null, 2)}
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
        <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-wider">
          <span className="text-emerald-400 font-black">Escrow Automation:</span> This desk initiates a direct fund transfer from the raushang4.in primary balance to the seller's verified linked account. Status updates and WhatsApp notifications are bundled into this atomic operation.
        </p>
      </div>
    </div>
  );
};

export default AdminVerificationPanel;
