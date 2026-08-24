import React, { useState } from 'react'
import { apiBaseUrl } from '@/env'
import { useQuery } from '@tanstack/react-query'
import { 
  RefreshCw, 
  ExternalLink, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Globe,
  Radio
} from 'lucide-react'

interface MonitorStatus {
  name: string
  url: string
  http_status: number | null
  latency?: number
}

const getUrlStatus = async (): Promise<MonitorStatus[]> => {
  const response = await fetch(`${apiBaseUrl}/addUrl/GetAllURLStauts`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch status and URLs')
  }

  const data = await response.json()
  return Array.isArray(data) ? data : data.data || []
}

export default function Dashboard() {
  const [searchFilter, setSearchFilter] = useState('')

  const {
    data: urlStatus = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['urlStatus'],
    queryFn: getUrlStatus,
    refetchInterval: 30000,
  })

  const onlineCount = urlStatus.filter(
    (m) => m.http_status && m.http_status >= 200 && m.http_status < 400
  ).length
  const offlineCount = urlStatus.filter(
    (m) => !m.http_status || m.http_status >= 400
  ).length
  const filteredMonitors = urlStatus.filter(
    (m) =>
      m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.url.toLowerCase().includes(searchFilter.toLowerCase())
  )

  const getStatusBadge = (status: number | null | undefined) => {
    if (status === null || status === undefined) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
          PENDING
        </span>
      )
    }
    if (status >= 200 && status < 300) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] text-[10px] font-bold rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]"></span>
          {status} OK
        </span>
      )
    }
    if (status >= 300 && status < 400) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0088CC]/10 border border-[#0088CC]/30 text-[#0088CC] text-[10px] font-bold rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC]"></span>
          {status} REDIR
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F2495C]/20 border border-[#F2495C] text-[#F2495C] text-[10px] font-bold rounded animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F2495C]"></span>
        {status} ERR
      </span>
    )
  }

  return (
    <div className="space-y-6 pb-12 w-full font-mono text-[#D8E0E8]">
      
      {/* Top Header & Trigger Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#22252B] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#181B1F] border border-[#22252B] text-[10px] text-slate-400">
            <Radio className="w-3 h-3 text-[#00E599] animate-pulse" />
            <span>SENTINEL_LIVE_FEED</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0088CC]" />
            PROBE TELEMETRY
          </h1>
          <p className="text-xs text-slate-500">
            Realtime HTTP status monitor & automated endpoint health checking.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="w-full sm:w-auto h-9 px-4 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/60 text-slate-300 hover:text-white rounded text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-[#0088CC]' : 'text-[#00E599]'}`} />
          <span>{isFetching ? 'SYNCING...' : 'SYNC METRICS'}</span>
        </button>
      </div>

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-lg">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase tracking-wider">Total Monitors</span>
            <Activity className="w-4 h-4 text-[#0088CC]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{urlStatus.length}</p>
          <span className="text-[10px] text-slate-500">Active endpoints watched</span>
        </div>

        <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-lg">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase tracking-wider">Healthy Services</span>
            <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#00E599] mt-1">{onlineCount}</p>
          <span className="text-[10px] text-[#00E599]">2xx Operational</span>
        </div>

        <div className="p-4 bg-[#181B1F] border border-[#22252B] rounded-lg sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase tracking-wider">Failing / Errors</span>
            <AlertTriangle className="w-4 h-4 text-[#F2495C]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#F2495C] mt-1">{offlineCount}</p>
          <span className="text-[10px] text-[#F2495C]">Needs inspection</span>
        </div>
      </div>

      {/* Main Telemetry Table / Card Area */}
      <div className="bg-[#181B1F] border border-[#22252B] rounded-lg shadow-xl overflow-hidden">
        
        {/* Search & Action Bar */}
        <div className="p-3.5 bg-[#111317] border-b border-[#22252B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0088CC]/20 border border-[#0088CC]"></span>
            <span className="text-xs font-semibold text-white tracking-wider uppercase">
              REGISTERED ENDPOINTS ({filteredMonitors.length})
            </span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or URL..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#0B0C10] border border-[#22252B] focus:border-[#0088CC] rounded text-xs text-slate-200 placeholder:text-slate-600 outline-none transition-all"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center text-xs text-slate-400">
            <span className="inline-block animate-spin mr-2">⚡</span> INITIALIZING TARGETS & TELEMETRY...
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-6 bg-[#F2495C]/10 border-b border-[#F2495C]/30 text-center text-xs text-[#F2495C]">
            CONNECTION ERROR: {(error as Error)?.message || 'Failed to fetch monitor telemetry'}
          </div>
        )}

        {/* Content Section */}
        {!isLoading && !isError && (
          <>
            {filteredMonitors.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs">
                No matching target endpoints found.
              </div>
            ) : (
              <div className="p-3 sm:p-5">
                
                {/* 1. Mobile Card Stack (Hidden on md+ screens) */}
                <div className="block md:hidden space-y-3">
                  {filteredMonitors.map((monitor, index) => {
                    const isFailing = !monitor.http_status || monitor.http_status >= 400

                    return (
                      <div
                        key={index}
                        className={`p-3.5 rounded-lg border flex flex-col gap-2.5 transition-colors ${
                          isFailing
                            ? 'bg-[#F2495C]/10 border-[#F2495C]/30'
                            : 'bg-[#0B0C10] border-[#22252B]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                isFailing ? 'bg-[#F2495C]' : 'bg-[#00E599]'
                              }`}
                            />
                            <span className="text-white font-bold text-sm truncate">
                              {monitor.name}
                            </span>
                          </div>
                          {getStatusBadge(monitor.http_status)}
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#22252B]/60 text-xs">
                          <a
                            href={monitor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#0088CC] truncate flex items-center gap-1.5"
                          >
                            <Globe className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                            <span className="truncate">{monitor.url}</span>
                          </a>

                          <a
                            href={monitor.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white rounded bg-[#181B1F] border border-[#22252B]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 2. Desktop/Tablet Table Grid (Hidden on Mobile) */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-12 text-slate-500 pb-2.5 border-b border-[#22252B] text-[10px] uppercase tracking-widest font-bold">
                    <span className="col-span-4">Service Name</span>
                    <span className="col-span-5">Target Address</span>
                    <span className="col-span-2 text-center">Status</span>
                    <span className="col-span-1 text-right">Inspect</span>
                  </div>

                  <div className="space-y-1.5 mt-2.5">
                    {filteredMonitors.map((monitor, index) => {
                      const isFailing = !monitor.http_status || monitor.http_status >= 400

                      return (
                        <div
                          key={index}
                          className={`grid grid-cols-12 items-center py-2.5 px-3 rounded transition-colors ${
                            isFailing
                              ? 'bg-[#F2495C]/10 border border-[#F2495C]/30 hover:bg-[#F2495C]/15'
                              : 'hover:bg-[#1F232D]/60 border border-transparent hover:border-[#22252B]'
                          }`}
                        >
                          <div className="col-span-4 flex items-center gap-2 truncate pr-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                isFailing ? 'bg-[#F2495C]' : 'bg-[#00E599]'
                              }`}
                            />
                            <span className="text-white font-medium text-xs truncate">
                              {monitor.name}
                            </span>
                          </div>

                          <span className="col-span-5 truncate text-slate-400 text-xs pr-3">
                            <a
                              href={monitor.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[#0088CC] transition-colors truncate block"
                            >
                              {monitor.url}
                            </a>
                          </span>

                          <div className="col-span-2 text-center">
                            {getStatusBadge(monitor.http_status)}
                          </div>

                          <div className="col-span-1 flex justify-end">
                            <a
                              href={monitor.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-slate-500 hover:text-[#0088CC] transition-colors rounded hover:bg-[#111317]"
                              title="Open endpoint in new tab"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}