import React, { useState } from 'react';
import { 
  User, 
  Key, 
  Bell, 
  Terminal, 
  Check, 
  Copy, 
  RefreshCw, 
  Lock,
  Save
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'telegram'>('profile');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiKey, setApiKey] = useState('bw_live_9f82a47e10b981c2d3e4f5a6b7c8d9e0');

  // Form states
  const [profile, setProfile] = useState({
    name: 'Operator Sajin',
    email: 'operator@bisaricwatch.io',
    timezone: 'UTC (+00:00)',
  });

  const [botConfig, setBotConfig] = useState({
    chatId: '-100198273645',
    botToken: '689234101:AAHk1_BisaricWatchBotKey_9a8b',
    alertThreshold: '1',
  });

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNewKey = () => {
    const randomHex = Array.from({ length: 32 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setApiKey(`bw_live_${randomHex}`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-mono text-[#D8E0E8]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#22252B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 uppercase tracking-widest mb-1">
            <span>02 // SYSTEM CONTROL</span>
            <span>/</span>
            <span className="text-[#0088CC]">PREFERENCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            OPERATOR SETTINGS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage account credentials, API tokens, and Telegram bot alert routing.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00E599]/10 border border-[#00E599]/40 rounded text-xs text-[#00E599] shadow-[0_0_12px_rgba(0,229,153,0.15)] animate-fade-in">
            <Check className="w-4 h-4" />
            <span>PREFERENCES SAVED</span>
          </div>
        )}
      </div>

      {/* Settings Tab Navigation */}
      <div className="flex border-b border-[#22252B] gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#0088CC] text-[#0088CC] bg-[#0088CC]/5'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-[#181B1F]/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>01 // PROFILE</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-[#0088CC] text-[#0088CC] bg-[#0088CC]/5'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-[#181B1F]/50'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>02 // API TOKENS & SECURITY</span>
        </button>

        <button
          onClick={() => setActiveTab('telegram')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'telegram'
              ? 'border-[#0088CC] text-[#0088CC] bg-[#0088CC]/5'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-[#181B1F]/50'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>03 // TELEGRAM DISPATCHER</span>
        </button>
      </div>

      {/* Tab Content 1: Profile Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-6 bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] space-y-5">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22252B] pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#0088CC]" />
              Operator Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Operator Name
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full h-10 px-3.5 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-10 px-3.5 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Console Timezone
              </label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full h-10 px-3 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
              >
                <option value="UTC (+00:00)">UTC (+00:00) Universal Standard</option>
                <option value="EST (-05:00)">EST (-05:00) Eastern Time</option>
                <option value="PST (-08:00)">PST (-08:00) Pacific Time</option>
                <option value="IST (+05:30)">IST (+05:30) India Standard Time</option>
              </select>
            </div>

            <div className="pt-3 border-t border-[#22252B] flex justify-end">
              <button
                type="submit"
                className="h-10 px-6 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-bold tracking-wider uppercase rounded shadow-[0_0_15px_rgba(0,136,204,0.25)] flex items-center gap-2 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>SAVE CHANGES</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab Content 2: API Keys & Security */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] space-y-5">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22252B] pb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#0088CC]" />
              Live Ingestion API Token
            </h2>

            <p className="text-xs text-slate-400">
              Use this bearer token to push custom health checks or query telemetry status programmatically via cURL or SDKs.
            </p>

            <div className="p-3 bg-[#0B0C10] border border-[#22252B] rounded-lg flex items-center justify-between gap-3">
              <span className="text-xs text-[#00E599] font-bold truncate">
                {apiKey}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="px-3 py-1.5 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/50 text-slate-300 text-xs rounded flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-[#0088CC]" />
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleGenerateNewKey}
                  className="p-1.5 bg-[#181B1F] border border-[#22252B] hover:border-[#F2495C]/50 text-slate-400 hover:text-[#F2495C] rounded transition-colors"
                  title="Rotate API Key"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#22252B]">
              <div className="p-3 bg-[#0B0C10] border border-[#22252B] rounded-lg text-xs space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">EXAMPLE REQUEST:</span>
                <code className="text-slate-300 block text-[11px] overflow-x-auto whitespace-nowrap py-1">
                  curl -H "Authorization: Bearer {apiKey}" https://api.bisaricwatch.io/v1/healthz
                </code>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22252B] pb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#F2495C]" />
              Password & Authentication
            </h2>
            <p className="text-xs text-slate-400">
              Update your console login password. Re-authentication will be required across active sessions.
            </p>
            <button
              type="button"
              className="h-9 px-4 border border-[#22252B] bg-[#0B0C10] hover:border-[#0088CC]/40 text-slate-300 hover:text-white text-xs font-bold uppercase rounded transition-colors"
            >
              CHANGE PASSWORD →
            </button>
          </div>
        </div>
      )}

      {/* Tab Content 3: Telegram Bot Config */}
      {activeTab === 'telegram' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-6 bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] space-y-5">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22252B] pb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#0088CC]" />
              Telegram Dispatcher Configuration
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Telegram Chat ID / Group ID
              </label>
              <input
                type="text"
                required
                value={botConfig.chatId}
                onChange={(e) => setBotConfig({ ...botConfig, chatId: e.target.value })}
                className="w-full h-10 px-3.5 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Bot Token (@BisaricWatchBot)
              </label>
              <input
                type="password"
                required
                value={botConfig.botToken}
                onChange={(e) => setBotConfig({ ...botConfig, botToken: e.target.value })}
                className="w-full h-10 px-3.5 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Consecutive Failures Before Alerting
              </label>
              <select
                value={botConfig.alertThreshold}
                onChange={(e) => setBotConfig({ ...botConfig, alertThreshold: e.target.value })}
                className="w-full h-10 px-3 border border-[#22252B] rounded-lg text-xs text-white bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
              >
                <option value="1">1 Failed Check (Instant Alert)</option>
                <option value="2">2 Failed Checks (2x Confirmation Quorum)</option>
                <option value="3">3 Failed Checks (Recommended to eliminate noise)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-[#22252B] flex items-center justify-between">
              <span className="text-[11px] text-[#00E599] font-bold">
                ✓ BOT WEBHOOK ACTIVE
              </span>
              <button
                type="submit"
                className="h-10 px-6 bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-bold tracking-wider uppercase rounded shadow-[0_0_15px_rgba(0,136,204,0.25)] flex items-center gap-2 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>SAVE BOT DISPATCHER</span>
              </button>
            </div>
          </div>
        </form>
      )}

    </div>
  );
}