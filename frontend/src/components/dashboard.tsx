import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Server, 
  ShieldAlert, 
  Zap, 
  Plus, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Send
} from 'lucide-react';

interface MonitorTarget {
  id: string;
  name: string;
  url: string;
  protocol: string;
  status: 'online' | 'offline' | 'degraded';
  latency: number;
  uptime: string;
  lastChecked: string;
}

const mockMonitors: MonitorTarget[] = [
  {
    id: '1',
    name: 'Production Core Web',
    url: 'https://yourdomain.com',
    protocol: 'HTTPS',
    status: 'online',
    latency: 18,
    uptime: '99.99%',
    lastChecked: '5s ago',
  },
  {
    id: '2',
    name: 'Billing & Payments API',
    url: 'https://api.yourdomain.com/v1/charge',
    protocol: 'gRPC',
    status: 'online',
    latency: 32,
    uptime: '99.95%',
    lastChecked: '8s ago',
  },
  {
    id: '3',
    name: 'OAuth Identity Sentinel',
    url: 'https://auth.yourdomain.com/healthz',
    protocol: 'HTTPS',
    status: 'offline',
    latency: 1420,
    uptime: '97.20%',
    lastChecked: '2s ago',
  },
  {
    id: '4',
    name: 'CDN Static Assets Cluster',
    url: 'https://cdn.yourdomain.com/static',
    protocol: 'HTTP/2',
    status: 'online',
    latency: 12,
    uptime: '100%',
    lastChecked: '10s ago',
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const filteredMonitors = mockMonitors.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-full space-y-8 font-mono text-[#D8E0E8] overflow-x-hidden">
      
      {/* 1. Header Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#22252B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 uppercase tracking-widest mb-1">
            <span>01 // TELEMETRY HUB</span>
            <span>/</span>
            <span className="text-[#0088CC]">REAL-TIME MONITORS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CONSOLE DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global endpoint uptime probes and active Telegram alert dispatches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2.5 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/50 text-slate-300 hover:text-white rounded-lg transition-all cursor-pointer"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 text-[#0088CC] ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          <Link
            to="/telegram-connect"
            className="h-10 px-4 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/60 text-slate-300 hover:text-white text-xs font-bold uppercase rounded-lg flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4 text-[#0088CC]" />
            <span className="hidden sm:inline">BOT READY</span>
          </Link>

          <Link
            to="/add-monitor"
            className="h-10 px-5 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-bold tracking-wider uppercase rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,136,204,0.3)] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>ADD MONITOR</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Monitors */}
        <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider">
            <span>ACTIVE PROBES</span>
            <Server className="w-4 h-4 text-[#0088CC]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">4</div>
          <div className="text-[10px] text-[#00E599] flex items-center gap-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_6px_#00E599]"></span>
            <span>ALL PROBE NODES HEALTHY</span>
          </div>
        </div>

        {/* Global Uptime */}
        <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider">
            <span>AVG UPTIME (24H)</span>
            <Activity className="w-4 h-4 text-[#00E599]" />
          </div>
          <div className="text-3xl font-extrabold text-[#00E599] font-mono">99.28%</div>
          <div className="text-[10px] text-slate-400">
            QUORUM: 3 EDGE NODES
          </div>
        </div>

        {/* Latency Average */}
        <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider">
            <span>AVG LATENCY</span>
            <Zap className="w-4 h-4 text-[#0088CC]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">20.5 ms</div>
          <div className="text-[10px] text-slate-400">
            FASTEST: CDN (12ms)
          </div>
        </div>

        {/* Active Incidents */}
        <div className="p-4 bg-[#181B1F] border border-[#F2495C]/40 bg-[#F2495C]/5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#F2495C] uppercase tracking-wider font-bold">
            <span>FIRING ALERTS</span>
            <ShieldAlert className="w-4 h-4 text-[#F2495C]" />
          </div>
          <div className="text-3xl font-extrabold text-[#F2495C] font-mono">1 CRITICAL</div>
          <div className="text-[10px] text-[#F2495C] font-bold">
            ✈️ DISPATCHED TO TELEGRAM
          </div>
        </div>

      </div>

      {/* 3. Filter & Search Controls */}
      <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Field */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search endpoint or URL..."
            className="w-full h-9 pl-9 pr-3 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] placeholder-slate-600 hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-[#0B0C10] p-1 border border-[#22252B] rounded-lg text-xs w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-none px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#181B1F] text-white border border-[#22252B]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ALL (4)
          </button>
          <button
            onClick={() => setFilter('online')}
            className={`flex-1 sm:flex-none px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              filter === 'online'
                ? 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30'
                : 'text-slate-400 hover:text-[#00E599]'
            }`}
          >
            ONLINE (3)
          </button>
          <button
            onClick={() => setFilter('offline')}
            className={`flex-1 sm:flex-none px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              filter === 'offline'
                ? 'bg-[#F2495C]/20 text-[#F2495C] border border-[#F2495C]/40'
                : 'text-slate-400 hover:text-[#F2495C]'
            }`}
          >
            CRITICAL (1)
          </button>
        </div>

      </div>

      {/* 4. Telemetry Endpoint Table */}
      <div className="bg-[#181B1F] border border-[#22252B] rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
        
        {/* Table Top Header Bar */}
        <div className="px-4 py-3 bg-[#111317] border-b border-[#22252B] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#0088CC] bg-[#0088CC]/20 rounded-sm inline-block"></span>
            <span className="text-white font-bold uppercase tracking-wider">
              PANEL: LIVE_ENDPOINT_TARGETS
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            AUTO-EVALUATION: 5s INTERVAL
          </span>
        </div>

        {/* Table Head */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-[#22252B] uppercase text-[11px] tracking-wider bg-[#0B0C10]/40">
                <th className="py-3 px-4">Target Name & URL</th>
                <th className="py-3 px-4 text-center">Protocol</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Latency</th>
                <th className="py-3 px-4 text-right">24h Uptime</th>
                <th className="py-3 px-4 text-right">Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22252B]/60">
              {filteredMonitors.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-[#1F232D]/50 transition-colors ${
                    item.status === 'offline' ? 'bg-[#F2495C]/5' : ''
                  }`}
                >
                  {/* Name & URL */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs flex items-center gap-1.5">
                        {item.name}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-[#0088CC] transition-colors"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </span>
                      <span className="text-slate-500 text-[11px] font-mono truncate max-w-[220px] sm:max-w-[320px]">
                        {item.url}
                      </span>
                    </div>
                  </td>

                  {/* Protocol */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 bg-[#0B0C10] border border-[#22252B] text-slate-400 text-[10px] rounded font-bold uppercase">
                      {item.protocol}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center">
                    {item.status === 'online' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] text-[10px] font-bold rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        200 OK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F2495C]/20 border border-[#F2495C] text-[#F2495C] text-[10px] font-bold rounded animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        503 ERR
                      </span>
                    )}
                  </td>

                  {/* Latency */}
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`font-bold ${
                        item.status === 'offline' ? 'text-[#F2495C]' : 'text-[#00E599]'
                      }`}
                    >
                      {item.status === 'offline' ? 'TIMEOUT' : `${item.latency} ms`}
                    </span>
                  </td>

                  {/* Uptime */}
                  <td className="py-3.5 px-4 text-right font-bold text-white">
                    {item.uptime}
                  </td>

                  {/* Last Checked */}
                  <td className="py-3.5 px-4 text-right text-slate-500 text-[11px]">
                    <span className="flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-slate-600" />
                      {item.lastChecked}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMonitors.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            NO ENDPOINTS MATCHED YOUR FILTER CRITERIA.
          </div>
        )}

      </div>

    </div>
  );
}