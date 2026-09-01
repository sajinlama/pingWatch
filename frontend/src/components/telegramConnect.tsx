import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { TelegramQRCode } from './TelegramQRCode';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const BOT_USERNAME = 'Url_ping_notification_bot';
const POLL_INTERVAL_MS = 15000; // 4 times per minute (60s / 4 = 15s)

interface GetCodeResponse {
  success: boolean;
  code?: string;
  message?: string;
}

export default function TelegramConnect() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    mutate: generateCode,
    isPending: isGeneratingCode,
    isError: isCodeError,
    error: codeError,
  } = useMutation({
    mutationFn: async (): Promise<GetCodeResponse> => {
      const res = await fetch(`${API_BASE}/tel/getCode`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Server responded ${res.status}`);
      }

      const data: GetCodeResponse = await res.json();
      if (!data.success || !data.code) {
        throw new Error(data.message || 'No code returned');
      }

      return data;
    },
    onSuccess: (data) => {
      if (data.code) {
        setCode(data.code);
      }
    },
  });

  const deepLink = code ? `https://t.me/${BOT_USERNAME}` : '';
  const command = code ? `/start ${code}` : '';

  useEffect(() => {
    generateCode();
    return () => stopPolling();
  }, [generateCode]);

  useEffect(() => {
    if (code && !isConnected) {
      startPolling();
    }
    return () => stopPolling();
  }, [code, isConnected]);

  const checkStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/tel/status`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) return;

      const data = await res.json();

      if (data.success && data.connected) {
        setIsConnected(true);
        stopPolling();

        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      }
    } catch (err) {
      console.error('Status check failed:', err);
    }
  };

  const startPolling = () => {
    stopPolling();
    pollRef.current = setInterval(checkStatus, POLL_INTERVAL_MS);
  };

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const handleCopy = () => {
    if (!command) return;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans text-[#D8E0E8] flex flex-col justify-center items-center px-4 py-12 antialiased relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#0088CC]/15 via-[#0088CC]/5 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-[460px] relative z-10">
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-[#181B1F] border border-[#22252B] rounded-lg flex items-center justify-center text-[#0088CC] shadow-[0_0_15px_rgba(0,136,204,0.25)] group-hover:border-[#0088CC]/60 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 6V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V6L12 2Z" fill="#181B1F" stroke="#0088CC" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M7 12H10L12 8L14 16L16 12H17" stroke="#00E599" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-xl tracking-wider text-white font-mono leading-none">
              BISARIC<span className="text-[#0088CC]">WATCH</span>
            </span>
          </Link>
        </div>

        <div className="bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-6 sm:p-8 font-mono">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#22252B]">
            <div className="w-10 h-10 rounded-lg bg-[#0088CC]/10 border border-[#0088CC]/30 flex items-center justify-center text-[#0088CC]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.05-.75 4.12-1.8 6.87-2.98 8.25-3.56 3.93-1.64 4.75-1.92 5.28-1.93.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.38z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wider">CONNECT TELEGRAM</h1>
              <p className="text-xs text-slate-400 mt-0.5">SCAN QR OR SEND COMMAND</p>
            </div>
          </div>

          {isCodeError && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-300 flex justify-between items-center">
              <span>{codeError instanceof Error ? codeError.message : 'Error generating link code.'}</span>
              <button onClick={() => generateCode()} className="underline font-bold hover:text-red-200">
                Retry
              </button>
            </div>
          )}

          {isGeneratingCode && (
            <div className="mb-6 p-6 bg-[#0B0C10] border border-[#22252B] rounded-lg text-xs text-slate-400 animate-pulse text-center">
              Generating your unique link payload…
            </div>
          )}

          {!isGeneratingCode && !isCodeError && code && (
            <div className="space-y-5 mb-6 text-xs">
              {/* QR Code Section */}
              <div className="p-4 bg-[#0B0C10] border border-[#22252B] rounded-lg flex flex-col items-center">
                <span className="font-bold text-[#0088CC] uppercase tracking-wider block mb-3 text-center">
                  SCAN TO QUICK-CONNECT
                </span>
                <TelegramQRCode deepLink={deepLink} size={150} />
              </div>

              {/* Manual Command Section */}
              <div className="p-3.5 bg-[#0B0C10] border border-[#22252B] rounded-lg text-slate-300">
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  MANUAL DISPATCH OPTION
                </span>
                Send to <code className="text-[#0088CC]">@{BOT_USERNAME}</code>:
                <div
                  onClick={handleCopy}
                  className="mt-2 p-2.5 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/50 rounded text-slate-200 flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span className="text-[#00E599] font-semibold">{command}</span>
                  <span className="text-[10px] font-bold text-[#0088CC] uppercase tracking-wider">
                    {copied ? 'COPIED' : 'COPY'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div
            className={`w-full h-11 flex items-center justify-center rounded text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md ${
              isConnected
                ? 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/40 shadow-[0_0_15px_rgba(0,229,153,0.15)]'
                : 'bg-[#0088CC]/10 text-[#0088CC] border border-[#0088CC]/30'
            }`}
          >
            {isConnected
              ? '✓ CONNECTED — REDIRECTING…'
              : code
              ? 'WAITING FOR CONFIRMATION (POLLING: 4x/MIN)…'
              : 'STANDBY'}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#00E599] shadow-[0_0_8px_#00E599]' : 'bg-slate-600'}`} />
          <span>{isConnected ? 'BOT WEBHOOK PROTOCOL ACTIVE' : 'AWAITING LINK'}</span>
        </div>
      </div>
    </div>
  );
}