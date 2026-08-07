import React, { useState } from 'react';

export default function TelegramConnect() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111827] flex flex-col justify-center items-center px-4 antialiased">
      <div className="w-full max-w-[440px] bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.05-.75 4.12-1.8 6.87-2.98 8.25-3.56 3.93-1.64 4.75-1.92 5.28-1.93.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.38z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#111827]">Connect Telegram</h1>
            <p className="text-[12px] text-[#6B7280]">Receive instant outage alerts on Telegram</p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-6">
          <div className="p-3 bg-[#F5F5F5] rounded-lg text-[14px] text-[#111827]">
            <span className="font-semibold text-[#4F46E5] mr-2">Step 1:</span>
            Open Telegram and search for <code className="bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB] font-mono text-[12px]">@PingWatchBot</code>.
          </div>
          <div className="p-3 bg-[#F5F5F5] rounded-lg text-[14px] text-[#111827]">
            <span className="font-semibold text-[#4F46E5] mr-2">Step 2:</span>
            Send the command:
            <div className="mt-2 p-2 bg-white border border-[#E5E7EB] rounded font-mono text-[13px] text-[#111827] flex justify-between items-center">
              <span>/start connect_9f82a</span>
              <button className="text-[12px] font-medium text-[#4F46E5] hover:underline">Copy</button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsConnected(!isConnected)}
          className={`w-full h-10 flex items-center justify-center rounded-lg text-[14px] font-medium transition-colors ${
            isConnected
              ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
              : 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
          }`}
        >
          {isConnected ? '✓ Telegram Connected' : 'Verify Connection'}
        </button>
      </div>
    </div>
  );
}