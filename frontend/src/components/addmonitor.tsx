import React, { useState } from 'react';
import { apiBaseUrl } from '@/env';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router';

interface FormData {
  url: string;
  name: string;
  duration: number;
}

const urlSubmit = async (credentials: FormData) => {
  const response = await fetch(`${apiBaseUrl}/addUrl/monitors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Enter a valid URL and monitor name.');
  }

  return response.json();
};

export default function AddMonitor() {
  const [url, setUrl] = useState('');
  const [urlName, setUrlName] = useState('');
  const [duration, setDuration] = useState(300);

  const urlMutation = useMutation({
    mutationFn: urlSubmit,
    onSuccess: () => {
      setUrl('');
      setUrlName('');
      setDuration(300);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    urlMutation.mutate({ url, name: urlName, duration });
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans text-[#D8E0E8] flex flex-col justify-between antialiased selection:bg-[#0088CC]/20 selection:text-[#0088CC] relative">
      
      {/* Background Grid & Glow Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-b from-[#0088CC]/15 via-[#0088CC]/5 to-transparent blur-[110px] pointer-events-none -z-10 rounded-full" />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0C10]/90 border-b border-[#22252B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 bg-[#181B1F] border border-[#22252B] rounded-lg flex items-center justify-center text-[#0088CC] shadow-[0_0_15px_rgba(0,136,204,0.25)] group-hover:border-[#0088CC]/60 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 6V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V6L12 2Z" fill="#181B1F" stroke="#0088CC" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M7 12H10L12 8L14 16L16 12H17" stroke="#00E599" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-wider text-white font-mono leading-none">
                  BISARIC<span className="text-[#0088CC]">WATCH</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 tracking-widest mt-0.5 uppercase">Endpoint Uptime Sentinel</span>
              </div>
            </Link>

            <Link
              to="/dashboard"
              className="h-9 px-4 text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-[#181B1F] border border-[#22252B] rounded flex items-center justify-center transition-all uppercase"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative max-w-2xl w-full mx-auto px-4 py-12 sm:py-16">
        
        {/* Status Chip */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#181B1F] border border-[#22252B] text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#0088CC] shadow-[0_0_8px_#0088CC]"></span>
            <span>CONFIG: REGISTER_NEW_PROBE</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            ADD <span className="text-[#0088CC]">MONITOR</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-mono text-slate-400">
            Configure automated telemetry heartbeat intervals and endpoint verification.
          </p>
        </div>

        {/* Terminal / Form Card */}
        <div className="bg-[#181B1F] border border-[#22252B] rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden font-mono">
          
          {/* Card Top Terminal Bar */}
          <div className="px-4 py-2.5 bg-[#111317] border-b border-[#22252B] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 border border-[#0088CC] bg-[#0088CC]/20 rounded-sm inline-block"></span>
              <span className="text-white font-semibold uppercase tracking-wider text-[11px]">
                TARGET_REGISTRATION_PORTAL
              </span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase">PROTOCOL: HTTPS / TCP</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Target URL */}
            <div className="space-y-2">
              <label htmlFor="url" className="block text-xs uppercase tracking-wider text-slate-300">
                Target URL <span className="text-[#0088CC]">*</span>
              </label>
              <div className="relative">
                <input
                  id="url"
                  required
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.yourdomain.com/healthz"
                  className="w-full h-11 px-4 bg-[#0B0C10] border border-[#22252B] rounded text-slate-200 text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all font-mono"
                />
              </div>
            </div>

            {/* Monitor Name */}
            <div className="space-y-2">
              <label htmlFor="urlname" className="block text-xs uppercase tracking-wider text-slate-300">
                Service Identifier <span className="text-[#0088CC]">*</span>
              </label>
              <input
                id="urlname"
                required
                type="text"
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
                placeholder="Core Auth API"
                className="w-full h-11 px-4 bg-[#0B0C10] border border-[#22252B] rounded text-slate-200 text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all font-mono"
              />
            </div>

            {/* Check Duration / Frequency */}
            <div className="space-y-2">
              <label htmlFor="duration" className="block text-xs uppercase tracking-wider text-slate-300">
                Probe Frequency
              </label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-11 px-4 bg-[#0B0C10] border border-[#22252B] rounded text-slate-200 text-xs focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all font-mono cursor-pointer"
              >
                <option value="180">Every 3 Minutes (Standard)</option>
                <option value="300">Every 5 Minutes (Default)</option>
                <option value="420">Every 7 Minutes (Relaxed)</option>
              </select>
            </div>

            {/* Status Notifications */}
            {urlMutation.isSuccess && (
              <div className="p-3 bg-[#00E599]/10 border border-[#00E599]/30 rounded text-[#00E599] text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E599]"></span>
                <span>Probe successfully initialized and scheduled.</span>
              </div>
            )}

            {urlMutation.isError && (
              <div className="p-3 bg-[#F2495C]/10 border border-[#F2495C]/30 rounded text-[#F2495C] text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F2495C]"></span>
                <span>{urlMutation.error.message}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={urlMutation.isPending}
              className="w-full h-11 bg-[#0088CC] hover:bg-[#0099EE] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-mono font-bold tracking-wider uppercase rounded shadow-[0_0_20px_rgba(0,136,204,0.3)] flex items-center justify-center transition-all active:scale-[0.99]"
            >
              {urlMutation.isPending ? 'DEPLOYING PROBE...' : 'INITIALIZE MONITOR →'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22252B] bg-[#0B0C10] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E599]"></span>
            <p>© {new Date().getFullYear()} BISARICWATCH — SENTINEL v1.0.0</p>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">CONSOLE</span>
            <span className="hover:text-[#0088CC] transition-colors cursor-pointer">SYSTEM STATUS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}