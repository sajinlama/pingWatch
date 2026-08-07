import React, { useState } from 'react';
import { Link } from 'react-router';

export default function Home({ isAuthenticated = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copySnippet = () => {
    navigator.clipboard.writeText("curl -X POST https://api.bisaricwatch.io/v1/healthz");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans text-[#D8E0E8] flex flex-col justify-between antialiased selection:bg-[#0088CC]/20 selection:text-[#0088CC]">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[300px] bg-gradient-to-b from-[#0088CC]/15 via-[#0088CC]/5 to-transparent blur-[110px] pointer-events-none -z-10 rounded-full" />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0C10]/90 border-b border-[#22252B] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo: BISARICWATCH */}
            <div className="flex items-center gap-3">
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

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-1 ml-10 font-mono text-xs tracking-wide">
                <span className="px-3 py-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181B1F] transition-colors cursor-pointer border border-transparent hover:border-[#22252B]">01 // ENDPOINTS</span>
                <span className="px-3 py-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181B1F] transition-colors cursor-pointer border border-transparent hover:border-[#22252B]">02 // ALERTS</span>
                <span className="px-3 py-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181B1F] transition-colors cursor-pointer border border-transparent hover:border-[#22252B]">03 // METRICS</span>
              </div>
            </div>

            {/* Auth Action Links (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard"
                  className="h-9 px-4 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-mono font-bold tracking-wider rounded flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,136,204,0.3)] active:scale-95 uppercase"
                >
                  CONSOLE →
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded text-slate-400 hover:text-white hover:bg-[#181B1F] focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#22252B] bg-[#0B0C10] px-4 pt-3 pb-6 space-y-3 font-mono">
            <div className="flex flex-col space-y-1">
              <span className="px-3 py-2 text-sm text-slate-300 hover:bg-[#181B1F] rounded cursor-pointer">01 // ENDPOINTS</span>
              <span className="px-3 py-2 text-sm text-slate-300 hover:bg-[#181B1F] rounded cursor-pointer">02 // ALERTS</span>
              <span className="px-3 py-2 text-sm text-slate-300 hover:bg-[#181B1F] rounded cursor-pointer">03 // METRICS</span>
            </div>
            <div className="pt-4 border-t border-[#22252B] flex flex-col gap-2">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard"
                  className="w-full h-10 bg-[#0088CC] text-white text-xs font-bold rounded flex items-center justify-center uppercase"
                >
                  CONSOLE →
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="w-full h-10 border border-[#22252B] text-slate-300 text-xs font-medium rounded flex items-center justify-center uppercase"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register"
                    className="w-full h-10 bg-[#0088CC] text-white text-xs font-bold rounded flex items-center justify-center uppercase"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-6xl mx-auto px-4 pt-12 pb-20 sm:pt-20 sm:pb-28">
        
        {/* Active Status Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded bg-[#181B1F] border border-[#22252B] text-xs font-mono text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
            <span>SYSTEM: PROBES RUNNING</span>
            <span className="text-slate-600">|</span>
            <span className="text-[#0088CC]">TARGET: yourdomain.com</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Is <span className="text-[#0088CC]">yourdomain.com</span> live? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-slate-200 to-[#0088CC] bg-clip-text text-transparent">
              Know the exact second it goes down.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Continuous health checks for your web applications and APIs. Get immediate automated alerts pushed straight to your channels when an endpoint fails.
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto h-11 px-7 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-mono font-bold tracking-wider uppercase rounded shadow-[0_0_20px_rgba(0,136,204,0.3)] flex items-center justify-center transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Monitoring Free →
            </Link>
            <div 
              onClick={copySnippet}
              className="w-full sm:w-auto h-11 px-4 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/60 text-slate-300 text-xs font-mono rounded flex items-center justify-between sm:justify-start gap-4 cursor-pointer transition-all group"
            >
              <span className="text-[#0088CC] font-bold">$</span>
              <span className="truncate">curl -X POST api.bisaricwatch.io/v1/healthz</span>
              <span className="text-[10px] text-[#00E599] font-bold uppercase">{copied ? "COPIED" : "COPY TEST"}</span>
            </div>
          </div>
        </div>

        {/* Telemetry Dashboard Panel */}
        <div className="mt-14 max-w-4xl mx-auto bg-[#181B1F] border border-[#22252B] rounded shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Panel Top Bar */}
          <div className="px-4 py-2.5 bg-[#111317] border-b border-[#22252B] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 border border-[#0088CC] bg-[#0088CC]/20 rounded-sm inline-block"></span>
              <span className="text-white font-semibold uppercase tracking-wider">PANEL: BISARICWATCH_SENTINEL</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="text-[#00E599]">● ONLINE: 3</span>
              <span className="text-[#F2495C]">● OFFLINE: 1</span>
            </div>
          </div>

          {/* Panel Telemetry Grid */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-2.5">
            <div className="grid grid-cols-12 text-slate-500 pb-2 border-b border-[#22252B] text-[11px] uppercase tracking-wider">
              <span className="col-span-6 sm:col-span-6">Target Endpoint</span>
              <span className="col-span-2 text-center">Protocol</span>
              <span className="col-span-2 text-center">Status</span>
              <span className="col-span-2 text-right">Latency</span>
            </div>

            {/* Target Row 1 */}
            <div className="grid grid-cols-12 items-center py-2 text-slate-300 border-b border-[#22252B]/40 hover:bg-[#1F232D]/50 px-1 rounded transition-colors">
              <span className="col-span-6 sm:col-span-6 truncate text-white font-medium">https://yourdomain.com</span>
              <span className="col-span-2 text-center text-slate-400 text-xs">HTTPS</span>
              <span className="col-span-2 text-center">
                <span className="px-2 py-0.5 bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] text-[10px] font-bold rounded">200 OK</span>
              </span>
              <span className="col-span-2 text-right text-[#00E599] font-bold">18 ms</span>
            </div>

            {/* Target Row 2 */}
            <div className="grid grid-cols-12 items-center py-2 text-slate-300 border-b border-[#22252B]/40 hover:bg-[#1F232D]/50 px-1 rounded transition-colors">
              <span className="col-span-6 sm:col-span-6 truncate text-white font-medium">https://api.yourdomain.com/v1/health</span>
              <span className="col-span-2 text-center text-slate-400 text-xs">gRPC</span>
              <span className="col-span-2 text-center">
                <span className="px-2 py-0.5 bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] text-[10px] font-bold rounded">200 OK</span>
              </span>
              <span className="col-span-2 text-right text-[#00E599] font-bold">32 ms</span>
            </div>

            {/* Target Row 3 (Down/Alert State) */}
            <div className="grid grid-cols-12 items-center py-2 text-slate-300 bg-[#F2495C]/10 border border-[#F2495C]/40 px-1 rounded">
              <span className="col-span-6 sm:col-span-6 truncate text-white font-medium">https://auth.yourdomain.com/login</span>
              <span className="col-span-2 text-center text-[#F2495C] text-xs">HTTPS</span>
              <span className="col-span-2 text-center">
                <span className="px-2 py-0.5 bg-[#F2495C]/20 border border-[#F2495C] text-[#F2495C] text-[10px] font-bold rounded animate-pulse">503 ERR</span>
              </span>
              <span className="col-span-2 text-right text-[#F2495C] font-bold">1420 ms</span>
            </div>

            {/* Target Row 4 */}
            <div className="grid grid-cols-12 items-center py-2 text-slate-300 hover:bg-[#1F232D]/50 px-1 rounded transition-colors">
              <span className="col-span-6 sm:col-span-6 truncate text-white font-medium">https://cdn.yourdomain.com/static</span>
              <span className="col-span-2 text-center text-slate-400 text-xs">HTTP/2</span>
              <span className="col-span-2 text-center">
                <span className="px-2 py-0.5 bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] text-[10px] font-bold rounded">200 OK</span>
              </span>
              <span className="col-span-2 text-right text-[#00E599] font-bold">12 ms</span>
            </div>
          </div>
        </div>

        {/* Feature Stat Cards */}
        <div className="mt-12 pt-8 border-t border-[#22252B] grid grid-cols-2 sm:grid-cols-3 gap-4 text-center max-w-3xl mx-auto">
          <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded text-left">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">CHECK INTERVAL</p>
            <p className="text-3xl font-extrabold text-white font-mono mt-1">5s</p>
            <span className="text-[10px] font-mono text-[#00E599]">REALTIME PROBES</span>
          </div>
          <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded text-left">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">CONFIRM QUORUM</p>
            <p className="text-3xl font-extrabold text-[#0088CC] font-mono mt-1">3 Nodes</p>
            <span className="text-[10px] font-mono text-slate-400">ZERO FALSE POSITIVES</span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-4 bg-[#181B1F] border border-[#22252B] rounded text-left">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">ALERT DISPATCH</p>
            <p className="text-3xl font-extrabold text-[#F2495C] font-mono mt-1">&lt;1.0s</p>
            <span className="text-[10px] font-mono text-slate-400">INSTANT NOTIFICATIONS</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22252B] bg-[#0B0C10] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E599]"></span>
            <p>© {new Date().getFullYear()} BISARICWATCH — SENTINEL v1.0.0</p>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
            <span className="hover:text-[#0088CC] transition-colors cursor-pointer">SYSTEM STATUS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}