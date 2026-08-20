import { apiBaseUrl } from '@/env';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Play, Pause, RefreshCw, AlertCircle, ShieldCheck, ShieldAlert } from 'lucide-react';

interface Monitor {
  id: string;
  name: string;
  url: string;
  https_status?: number;
  status?: 'UP'| 'DOWN'| 'UNKNOWN'| 'PAUSED';
}

const fetchMonitors = async (): Promise<Monitor[]> => {
  const response = await fetch(`${apiBaseUrl}/addUrl/getMonitors`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch monitor target list from Sentinel backend.');
  }

  const result = await response.json();
  return Array.isArray(result) ? result : result.data || [];
};

const toggleMonitorStatus = async ({ monitorId }: { monitorId: string}) => {
    console.log(monitorId,"this is monitor id")


  const response = await fetch(`${apiBaseUrl}/pingUrl/check-Status/${monitorId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ monitorId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message );
  }

  return response.json();
};

export default function StartMonitoring() {
  const queryClient = useQueryClient();

  // TanStack Query for fetching monitor list
  const {
    data: urls = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['monitors'],
    queryFn: fetchMonitors,
    // refetchInterval: 10000, // Polls every 10 seconds to keep telemetry status updated
  });

  // TanStack Mutation for starting/stopping probes
  const toggleMutation = useMutation({
    mutationFn: toggleMonitorStatus,
    onSuccess: () => {
      // Refresh monitors query cache immediately after toggle action
      queryClient.invalidateQueries({ queryKey: ['monitors'] });
    },
  });

  const handleToggle = (monitorId: string) => {
    toggleMutation.mutate({
      monitorId,
    });
  };

  return (
    <div className="max-h-screen bg-[#0B0C10] font-mono text-[#D8E0E8] flex flex-col justify-between antialiased selection:bg-[#0088CC]/20 selection:text-[#0088CC] relative">
      
      {/* Background Grid & Glow Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-b from-[#00E599]/15 via-[#00E599]/5 to-transparent blur-[110px] pointer-events-none -z-10 rounded-full" />

      {/* Main Content Area */}
      <main className="relative max-w-4xl w-full mx-auto px-4 py-12 sm:py-16">
        
        {/* Status Chip */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#181B1F] border border-[#22252B] text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
            <span>EXECUTION_CONTROL_ROOM</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            START <span className="text-[#00E599]">MONITORS</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Dispatch heartbeat runners and view live endpoint health status.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="bg-[#181B1F] border border-[#22252B] rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Top Bar */}
          <div className="px-4 py-3 bg-[#111317] border-b border-[#22252B] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 border border-[#00E599] bg-[#00E599]/20 rounded-sm inline-block"></span>
              <span className="text-white font-semibold uppercase tracking-wider text-[11px]">
                TARGET_SERVICE_QUEUE
              </span>
            </div>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isFetching ? 'animate-spin text-[#00E599]' : ''}`} />
              <span>SYNC QUEUE</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-4">
            {isLoading ? (
              <div className="py-12 text-center text-xs text-slate-500 animate-pulse font-mono">
                INITIALIZING TELEMETRY PIPELINE...
              </div>
            ) : isError ? (
              <div className="p-4 bg-[#F2495C]/10 border border-[#F2495C]/30 rounded text-[#F2495C] text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{(error as Error)?.message || 'Failed to sync with backend.'}</span>
              </div>
            ) : urls.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-[#22252B] rounded-lg">
                NO MONITORS FOUND. REGISTER TARGET URLs FIRST.
              </div>
            ) : (
              urls.map((item, index) => {
                const isActive = item.status === 'UP';
                const statusCode = item.https_status;
                const isHealthy = statusCode && statusCode >= 200 && statusCode < 300;

                return (
                  <div
                    key={item.id || index}
                    className="p-4 bg-[#0B0C10] border border-[#22252B] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#0088CC]/40 transition-all"
                  >
                    {/* Monitor Info */}
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive ? 'bg-[#00E599] shadow-[0_0_8px_#00E599]' : 'bg-slate-600'
                          }`}
                        />
                        <h3 className="text-sm font-bold text-white truncate">
                          {item.name || `Target Endpoint #${index + 1}`}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 font-mono truncate">{item.url}</p>
                    </div>

                    {/* Status Badge & Action Controls */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      
                      {/* HTTP Status Code Badge */}
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded border bg-[#181B1F] border-[#22252B]">
                        {statusCode ? (
                          <>
                            {isHealthy ? (
                              <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                            ) : (
                              <ShieldAlert className="w-3.5 h-3.5 text-[#F2495C]" />
                            )}
                            <span
                              className={`text-xs font-bold font-mono ${
                                isHealthy ? 'text-[#00E599]' : 'text-[#F2495C]'
                              }`}
                            >
                              HTTP {statusCode}
                            </span>
                          </>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            NO STATUS
                          </span>
                        )}
                      </div>

                      {/* Start / Stop Button */}
                      <button
                        onClick={() => handleToggle(item.id)}
                        disabled={toggleMutation.isPending}
                        className={`px-4 h-9 rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 disabled:opacity-50 ${
                          isActive
                            ? 'bg-[#F2495C]/20 border border-[#F2495C]/50 text-[#F2495C] hover:bg-[#F2495C]/30'
                            : 'bg-[#00E599] hover:bg-[#00FFAB] text-[#0B0C10] shadow-[0_0_15px_rgba(0,229,153,0.2)]'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Pause className="w-3.5 h-3.5" /> STOP PROBE
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" /> START RUNNER
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22252B] bg-[#0B0C10] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E599]"></span>
            <p>© {new Date().getFullYear()} BISARICWATCH — SENTINEL v1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}