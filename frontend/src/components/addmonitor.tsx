import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Bell, Globe, ShieldAlert, ArrowRight, Check } from 'lucide-react';

export default function AddMonitor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    url: 'https://',
    method: 'GET',
    interval: '30',
    timeout: '5',
    notifyTelegram: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate monitor initialization
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono text-[#D8E0E8]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#22252B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 uppercase tracking-widest mb-1">
            <span>01 // TELEMETRY CONFIG</span>
            <span>/</span>
            <span className="text-[#0088CC]">PROBE SETUP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            INITIALIZE NEW MONITOR
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure target endpoint rules for continuous HTTP/HTTPS status sweeps.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#181B1F] border border-[#22252B] rounded text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
          <span>SYSTEM READY</span>
        </div>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="p-4 bg-[#00E599]/10 border border-[#00E599]/40 rounded-xl text-xs text-[#00E599] flex items-center justify-between shadow-[0_0_20px_rgba(0,229,153,0.15)]">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>MONITOR INITIALIZED SUCCESSFULLY. REDIRECTING TO CONSOLE...</span>
          </div>
        </div>
      )}

      {/* Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Config Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
          <div className="p-6 bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] space-y-5">
            
            <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22252B] pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#0088CC]" />
              Target Endpoint Parameters
            </h2>

            {/* Friendly Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Monitor Friendly Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Production API Health"
                className="w-full h-10 px-3.5 border border-[#22252B] rounded-lg text-xs text-white placeholder-slate-600 bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
              />
            </div>

            {/* Target URL & Method */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-4 sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Method
                </label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  className="w-full h-10 px-3 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="HEAD">HEAD</option>
                </select>
              </div>

              <div className="col-span-8 sm:col-span-9">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Target Endpoint URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://yourdomain.com/v1/health"
                  className="w-full h-10 px-3.5 border border-[#22252B] rounded-lg text-xs text-white placeholder-slate-600 bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
                />
              </div>
            </div>

            {/* Frequency & Timeout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Check Frequency (Interval)
                </label>
                <select
                  value={formData.interval}
                  onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
                  className="w-full h-10 px-3 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
                >
                  <option value="10">Every 10 seconds (Ultra-Fast)</option>
                  <option value="30">Every 30 seconds (Standard)</option>
                  <option value="60">Every 1 minute</option>
                  <option value="300">Every 5 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  HTTP Timeout Threshold
                </label>
                <select
                  value={formData.timeout}
                  onChange={(e) => setFormData({ ...formData, timeout: e.target.value })}
                  className="w-full h-10 px-3 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
                >
                  <option value="2">2 Seconds</option>
                  <option value="5">5 Seconds (Recommended)</option>
                  <option value="10">10 Seconds</option>
                </select>
              </div>
            </div>

            {/* Telegram Notification Toggle */}
            <div className="pt-2 border-t border-[#22252B]">
              <label className="flex items-center justify-between p-3.5 bg-[#0B0C10] border border-[#22252B] rounded-lg cursor-pointer hover:border-[#0088CC]/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#0088CC]/10 border border-[#0088CC]/30 flex items-center justify-center text-[#0088CC]">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">
                      Telegram Dispatch Alerts
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      Send instant outages to @BisaricWatchBot
                    </span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={formData.notifyTelegram}
                  onChange={(e) => setFormData({ ...formData, notifyTelegram: e.target.checked })}
                  className="w-4 h-4 rounded border-[#22252B] bg-[#181B1F] text-[#0088CC] focus:ring-[#0088CC] focus:ring-offset-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-bold tracking-wider uppercase rounded shadow-[0_0_20px_rgba(0,136,204,0.3)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span>DEPLOYING PROBE...</span>
              ) : (
                <>
                  <span>INITIALIZE TARGET MONITOR</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>
        </form>

        {/* Live Payload Preview Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 bg-[#181B1F] border border-[#22252B] rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#22252B] pb-3">
              <Activity className="w-4 h-4 text-[#00E599]" />
              Live Target Spec
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">TARGET NAME</span>
                <span className="text-white font-bold truncate block">
                  {formData.name || 'UNNAMED_PROBE'}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">ENDPOINT SPEC</span>
                <span className="text-[#0088CC] font-bold truncate block">
                  {formData.method} {formData.url || 'https://...'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#22252B]">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">SWEEP RATE</span>
                  <span className="text-white font-bold">{formData.interval}s Interval</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">TIMEOUT</span>
                  <span className="text-[#F2495C] font-bold">{formData.timeout}s Cutoff</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#22252B]">
                <span className="text-slate-500 block text-[10px] uppercase mb-1">DISPATCH ROUTE</span>
                {formData.notifyTelegram ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0088CC]/20 border border-[#0088CC]/40 text-[#0088CC] text-[10px] font-bold">
                    ✈️ TELEGRAM BOT ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                    NO BOT ALERT
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0B0C10] border border-[#22252B] rounded-xl text-xs space-y-2 text-slate-400">
            <div className="flex items-center gap-2 text-white font-bold text-[11px] uppercase">
              <ShieldAlert className="w-4 h-4 text-[#0088CC]" />
              Multi-Region Verification
            </div>
            <p className="text-[11px] leading-relaxed">
              When a probe failure occurs, BisaricWatch verifies the outage across 3 regional edge nodes before firing a dispatch alert to eliminate false positives.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}