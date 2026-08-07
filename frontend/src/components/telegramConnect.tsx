import React, { useState } from 'react';
import { Link } from 'react-router';

export default function TelegramConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  const command = '/start connect_9f82a';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans text-[#D8E0E8] flex flex-col justify-center items-center px-4 py-12 antialiased selection:bg-[#0088CC]/20 selection:text-[#0088CC] relative overflow-hidden">
      
      {/* Background Grid Accent & Blue Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#0088CC]/15 via-[#0088CC]/5 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* Container */}
      <div className="w-full max-w-[440px] relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-3 group mb-4">
            <div className="relative w-10 h-10 bg-[#181B1F] border border-[#22252B] rounded-lg flex items-center justify-center text-[#0088CC] shadow-[0_0_15px_rgba(0,136,204,0.25)] group-hover:border-[#0088CC]/60 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 6V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V6L12 2Z" fill="#181B1F" stroke="#0088CC" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M7 12H10L12 8L14 16L16 12H17" stroke="#00E599" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
              </span>
            </div>
            <span className="font-bold text-xl tracking-wider text-white font-mono leading-none">
              BISARIC<span className="text-[#0088CC]">WATCH</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-6 sm:p-8 font-mono">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#22252B]">
            <div className="w-10 h-10 rounded-lg bg-[#0088CC]/10 border border-[#0088CC]/30 flex items-center justify-center text-[#0088CC] shadow-[0_0_12px_rgba(0,136,204,0.2)]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.05-.75 4.12-1.8 6.87-2.98 8.25-3.56 3.93-1.64 4.75-1.92 5.28-1.93.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.38z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wider">CONNECT TELEGRAM</h1>
              <p className="text-xs text-slate-400 mt-0.5">INSTANT BOT OUTAGE NOTIFICATIONS</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-6 text-xs">
            
            {/* Step 1 */}
            <div className="p-3.5 bg-[#0B0C10] border border-[#22252B] rounded-lg text-slate-300">
              <span className="font-bold text-[#0088CC] uppercase tracking-wider block mb-1">01 // BOT SEARCH</span>
              Open Telegram and search for{' '}
              <code className="bg-[#181B1F] px-1.5 py-0.5 rounded border border-[#22252B] text-[#0088CC] font-bold">
                @BisaricWatchBot
              </code>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 bg-[#0B0C10] border border-[#22252B] rounded-lg text-slate-300">
              <span className="font-bold text-[#0088CC] uppercase tracking-wider block mb-1.5">02 // DISPATCH COMMAND</span>
              Send the initialization payload:
              <div 
                onClick={handleCopy}
                className="mt-2 p-2.5 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/50 rounded text-slate-200 flex justify-between items-center cursor-pointer transition-colors group"
              >
                <span className="text-[#00E599] font-semibold">{command}</span>
                <span className="text-[10px] font-bold text-[#0088CC] uppercase tracking-wider group-hover:underline">
                  {copied ? 'COPIED' : 'COPY'}
                </span>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`w-full h-11 flex items-center justify-center rounded text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 ${
              isConnected
                ? 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/40 shadow-[0_0_15px_rgba(0,229,153,0.15)]'
                : 'bg-[#0088CC] hover:bg-[#0099EE] text-white shadow-[0_0_20px_rgba(0,136,204,0.3)]'
            }`}
          >
            {isConnected ? '✓ TELEGRAM DISPATCHER CONNECTED' : 'VERIFY DISPATCH CONNECTION →'}
          </button>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
          <span>BOT WEBHOOK PROTOCOL ACTIVE</span>
        </div>

      </div>
    </div>
  );
}