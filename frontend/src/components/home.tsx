import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Terminal, ShieldAlert, CheckCircle2, Copy, Check, Menu, X, ArrowRight } from 'lucide-react';

export default function Home({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copySnippet = () => {
    navigator.clipboard.writeText("curl -X POST https://api.bisaricwatch.io/v1/healthz");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleTelemetry = [
    { url: 'https://yourdomain.com', proto: 'HTTPS', status: '200 OK', latency: '18 ms', isErr: false },
    { url: 'https://api.yourdomain.com/v1/health', proto: 'gRPC', status: '200 OK', latency: '32 ms', isErr: false },
    { url: 'https://auth.yourdomain.com/login', proto: 'HTTPS', status: '503 ERR', latency: '1420 ms', isErr: true },
    { url: 'https://cdn.yourdomain.com/static', proto: 'HTTP/2', status: '200 OK', latency: '12 ms', isErr: false },
  ];

  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans text-[#D8E0E8] flex flex-col justify-between antialiased selection:bg-[#0088CC]/20 selection:text-[#0088CC] overflow-x-hidden relative">
      
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[750px] h-[220px] sm:h-[300px] bg-gradient-to-b from-[#0088CC]/15 via-[#0088CC]/5 to-transparent blur-[90px] sm:blur-[110px] pointer-events-none -z-10 rounded-full" />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0C10]/90 border-b border-[#22252B] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-[#181B1F] border border-[#22252B] rounded-lg flex items-center justify-center text-[#0088CC] shadow-[0_0_15px_rgba(0,136,204,0.25)] group-hover:border-[#0088CC]/60 transition-all flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 6V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V6L12 2Z" fill="#181B1F" stroke="#0088CC" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M7 12H10L12 8L14 16L16 12H17" stroke="#00E599" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm sm:text-base tracking-wider text-white font-mono leading-none">
                    BISARIC<span className="text-[#0088CC]">WATCH</span>
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-mono text-slate-500 tracking-widest mt-0.5 uppercase">
                    Endpoint Uptime Sentinel
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-1 ml-8 font-mono text-xs tracking-wide">
                <span className="px-3 py-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181B1F] transition-colors cursor-pointer border border-transparent hover:border-[#22252B]">01 // ENDPOINTS</span>
                <span className="px-3 py-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181B1F] transition-colors cursor-pointer border border-transparent hover:border-[#22252B]">02 // ALERTS</span>
                <span className="px-3 py-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181B1F] transition-colors cursor-pointer border border-transparent hover:border-[#22252B]">03 // METRICS</span>
              </div>
            </div>

            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard"
                  className="h-9 px-4 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-mono font-bold tracking-wider rounded flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,136,204,0.3)] active:scale-95 uppercase"
                >
                  CONSOLE <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="h-9 px-4 text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-[#181B1F] rounded flex items-center justify-center transition-colors border border-transparent hover:border-[#22252B]"
                  >
                    LOG IN
                  </Link>
                  <Link 
                    to="/register"
                    className="h-9 px-4 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-mono font-bold tracking-wider rounded flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,136,204,0.3)] active:scale-95 uppercase"
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded text-slate-400 hover:text-white hover:bg-[#181B1F] border border-[#22252B] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#22252B] bg-[#0B0C10] px-4 pt-3 pb-6 space-y-4 font-mono">
            <div className="flex flex-col space-y-1">
              <span className="px-3 py-2 text-xs text-slate-300 hover:bg-[#181B1F] rounded cursor-pointer">01 // ENDPOINTS</span>
              <span className="px-3 py-2 text-xs text-slate-300 hover:bg-[#181B1F] rounded cursor-pointer">02 // ALERTS</span>
              <span className="px-3 py-2 text-xs text-slate-300 hover:bg-[#181B1F] rounded cursor-pointer">03 // METRICS</span>
            </div>
            <div className="pt-3 border-t border-[#22252B] flex flex-col gap-2">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard"
                  className="w-full h-10 bg-[#0088CC] text-white text-xs font-bold rounded flex items-center justify-center uppercase tracking-wider"
                >
                  CONSOLE →
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="w-full h-10 border border-[#22252B] text-slate-300 text-xs font-medium rounded flex items-center justify-center uppercase hover:bg-[#181B1F]"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register"
                    className="w-full h-10 bg-[#0088CC] text-white text-xs font-bold rounded flex items-center justify-center uppercase tracking-wider shadow-[0_0_15px_rgba(0,136,204,0.3)]"
                  >
                    Register Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Body */}
      <main className="relative max-w-6xl mx-auto px-4 pt-8 pb-16 sm:pt-16 sm:pb-24 w-full">
        
        {/* Status Pill Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#181B1F] border border-[#22252B] text-[11px] sm:text-xs font-mono text-slate-300 shadow-sm max-w-full truncate">
            <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599] flex-shrink-0"></span>
            <span className="truncate">SYSTEM: PROBES RUNNING</span>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <span className="text-[#0088CC] hidden xs:inline truncate">TARGET: yourdomain.com</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
            Is <span className="text-[#0088CC]">yourdomain.com</span> live? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-slate-200 to-[#0088CC] bg-clip-text text-transparent">
              Know the exact second it goes down.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Continuous health checks for your web applications and APIs. Get immediate automated alerts pushed straight to your channels when an endpoint fails.
          </p>

          {/* Action Row */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <Link 
              to="/register" 
              className="h-11 px-7 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-mono font-bold tracking-wider uppercase rounded shadow-[0_0_20px_rgba(0,136,204,0.3)] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
            >
              Start Monitoring Free <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div 
              onClick={copySnippet}
              className="h-11 px-3.5 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/60 text-slate-300 text-xs font-mono rounded flex items-center justify-between gap-3 cursor-pointer transition-all group overflow-hidden"
              title="Click to copy curl command"
            >
              <div className="flex items-center gap-2 truncate">
                <Terminal className="w-3.5 h-3.5 text-[#0088CC] flex-shrink-0" />
                <span className="truncate text-slate-400 font-mono text-[11px] sm:text-xs">
                  curl -X POST api.bisaricwatch.io/v1/healthz
                </span>
              </div>
              <span className="text-[10px] text-[#00E599] font-bold uppercase flex-shrink-0 flex items-center gap-1">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "COPIED" : "COPY"}
              </span>
            </div>
          </div>
        </div>

        {/* Responsive Telemetry Panel */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto bg-[#181B1F] border border-[#22252B] rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Panel Header */}
          <div className="px-3.5 py-2.5 bg-[#111317] border-b border-[#22252B] flex flex-col xs:flex-row xs:items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 border border-[#0088CC] bg-[#0088CC]/20 rounded-sm inline-block"></span>
              <span className="text-white font-semibold uppercase tracking-wider text-[11px]">
                PANEL: BISARICWATCH_SENTINEL
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px]">
              <span className="text-[#00E599] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]"></span> ONLINE: 3
              </span>
              <span className="text-[#F2495C] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2495C]"></span> OFFLINE: 1
              </span>
            </div>
          </div>

          {/* 1. Mobile Cards View (Hidden on sm+) */}
          <div className="block sm:hidden p-3 space-y-2.5 font-mono text-xs">
            {sampleTelemetry.map((row, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded border flex flex-col gap-2 ${
                  row.isErr 
                    ? 'bg-[#F2495C]/10 border-[#F2495C]/30' 
                    : 'bg-[#0B0C10] border-[#22252B]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white font-medium truncate max-w-[200px]">{row.url}</span>
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                    row.isErr 
                      ? 'bg-[#F2495C]/20 text-[#F2495C] border border-[#F2495C]' 
                      : 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30'
                  }`}>
                    {row.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#22252B]/60">
                  <span>PROTO: {row.proto}</span>
                  <span className={row.isErr ? 'text-[#F2495C] font-bold' : 'text-[#00E599] font-bold'}>
                    LATENCY: {row.latency}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Desktop/Tablet Grid View (Hidden on Mobile) */}
          <div className="hidden sm:block p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-2">
            <div className="grid grid-cols-12 text-slate-500 pb-2 border-b border-[#22252B] text-[10px] uppercase tracking-wider">
              <span className="col-span-6">Target Endpoint</span>
              <span className="col-span-2 text-center">Protocol</span>
              <span className="col-span-2 text-center">Status</span>
              <span className="col-span-2 text-right">Latency</span>
            </div>

            {sampleTelemetry.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 items-center py-2 px-2 text-slate-300 rounded border transition-colors ${
                  row.isErr
                    ? 'bg-[#F2495C]/10 border-[#F2495C]/40'
                    : 'border-transparent hover:border-[#22252B] hover:bg-[#1F232D]/50'
                }`}
              >
                <span className="col-span-6 truncate text-white font-medium pr-2">
                  {row.url}
                </span>
                <span className="col-span-2 text-center text-slate-400 text-xs">
                  {row.proto}
                </span>
                <div className="col-span-2 text-center">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    row.isErr
                      ? 'bg-[#F2495C]/20 border border-[#F2495C] text-[#F2495C] animate-pulse'
                      : 'bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599]'
                  }`}>
                    {row.status}
                  </span>
                </div>
                <span className={`col-span-2 text-right font-bold ${
                  row.isErr ? 'text-[#F2495C]' : 'text-[#00E599]'
                }`}>
                  {row.latency}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Feature Stat Cards */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#22252B] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
          <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-lg text-left">
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">CHECK INTERVAL</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">5s</p>
            <span className="text-[10px] font-mono text-[#00E599]">REALTIME PROBES</span>
          </div>

          <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-lg text-left">
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">CONFIRM QUORUM</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0088CC] font-mono mt-1">3 Nodes</p>
            <span className="text-[10px] font-mono text-slate-400">ZERO FALSE POSITIVES</span>
          </div>

          <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-lg text-left xs:col-span-2 sm:col-span-1">
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">ALERT DISPATCH</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#F2495C] font-mono mt-1">&lt;1.0s</p>
            <span className="text-[10px] font-mono text-slate-400">INSTANT NOTIFICATIONS</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22252B] bg-[#0B0C10] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-[#00E599]"></span>
            <p>© {new Date().getFullYear()} BISARICWATCH — SENTINEL v1.0.0</p>
          </div>
          <div className="flex gap-6 justify-center">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
            <span className="hover:text-[#0088CC] transition-colors cursor-pointer">SYSTEM STATUS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}