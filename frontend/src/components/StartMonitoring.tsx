import { apiBaseUrl } from '@/env';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Play, RefreshCw, AlertCircle, ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Monitor {
  id: string;
  name: string;
  url: string;
  http_status?: number | null;
  https_status?: number | null;
  status?: 'UP' | 'DOWN' | 'UNKNOWN' | 'PAUSED';
  is_active?: boolean;
  last_checked?: string | null;
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

const toggleMonitorStatus = async ({ monitorId }: { monitorId: string }) => {
  const response = await fetch(`${apiBaseUrl}/pingUrl/check-Status/${monitorId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ monitorId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to start monitor');
  }

  return response.json();
};

export default function StartMonitoring() {
  const queryClient = useQueryClient();

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
  });

  const toggleMutation = useMutation({
    mutationFn: toggleMonitorStatus,
    onSuccess: () => {
      // Refresh the query so the server status updates the item directly
      queryClient.invalidateQueries({ queryKey: ['monitors'] });
    },
  });

  const handleToggle = (monitorId: string) => {
    toggleMutation.mutate({ monitorId });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-8 font-mono text-[#D8E0E8]">
      
      {/* Centered Pill Banner */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#181B1F] border border-[#22252B] text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
          <span>EXECUTION_CONTROL_ROOM</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          START <span className="text-[#00E599]">MONITORS</span>
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Dispatch heartbeat runners for newly added target endpoints.
        </p>
      </div>

      {/* Target List Container */}
      <div className="bg-[#181B1F] border border-[#22252B] rounded-lg shadow-xl overflow-hidden">
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
            className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isFetching ? 'animate-spin text-[#00E599]' : ''}`} />
            <span>SYNC QUEUE</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-500 animate-pulse">
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
              const isItemLoading =
                toggleMutation.isPending &&
                toggleMutation.variables?.monitorId === item.id;

              const statusCode = item.http_status ?? item.https_status;
              const isHealthy = statusCode !== null && statusCode !== undefined && statusCode >= 200 && statusCode < 300;

              // A monitor is considered already running/started if:
              // 1. It has been checked previously (last_checked exists), OR
              // 2. Its status is already resolved (UP, DOWN, or PAUSED), OR
              // 3. A mutation just completed for it
              const isAlreadyStarted = 
                item.last_checked !== null && 
                item.last_checked !== undefined || 
                (item.status && item.status !== 'UNKNOWN');

              return (
                <div
                  key={item.id || index}
                  className="p-4 bg-[#0B0C10] border border-[#22252B] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#0088CC]/40 transition-all"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          isAlreadyStarted ? 'bg-[#00E599] shadow-[0_0_8px_#00E599]' : 'bg-yellow-500'
                        }`}
                      />
                      <h3 className="text-sm font-bold text-white truncate">
                        {item.name || `Target Endpoint #${index + 1}`}
                      </h3>
                      {!isAlreadyStarted && (
                        <span className="px-1.5 py-0.2 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[9px] font-bold">
                          NEW / UNCHECKED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{item.url}</p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 justify-between sm:justify-end">
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded border bg-[#181B1F] border-[#22252B]">
                      {statusCode ? (
                        <>
                          {isHealthy ? (
                            <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                          ) : (
                            <ShieldAlert className="w-3.5 h-3.5 text-[#F2495C]" />
                          )}
                          <span
                            className={`text-xs font-bold ${
                              isHealthy ? 'text-[#00E599]' : 'text-[#F2495C]'
                            }`}
                          >
                            HTTP {statusCode}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          {item.status || 'PENDING'}
                        </span>
                      )}
                    </div>

                    {/* Button: Only allows action if this is a newly added/uninitialized monitor */}
                    <button
                      onClick={() => handleToggle(item.id)}
                      disabled={isAlreadyStarted || isItemLoading}
                      className={`px-4 h-9 rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                        isAlreadyStarted
                          ? 'bg-[#181B1F] border border-[#00E599]/30 text-[#00E599] opacity-70 cursor-default pointer-events-none'
                          : isItemLoading
                          ? 'bg-[#00E599]/50 text-[#0B0C10] cursor-wait pointer-events-none'
                          : 'bg-[#00E599] hover:bg-[#00FFAB] text-[#0B0C10] shadow-[0_0_15px_rgba(0,229,153,0.25)] active:scale-95 cursor-pointer'
                      }`}
                    >
                      {isItemLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          STARTING...
                        </>
                      ) : isAlreadyStarted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                          RUNNING
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          START RUNNER
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
    </div>
  );
}