import React, { useState } from 'react'
import { apiBaseUrl } from '@/env'
import { useQuery } from '@tanstack/react-query'
import { 
  Bell, 
  RefreshCw, 
  Send, 
  Clock, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle,
  Radio
} from 'lucide-react'

interface NotificationItem {
  notification_id: string
  notification_type: 'EMAIL' | 'SMS' | 'WEBHOOK' | 'SLACK' | 'TELEGRAM'
  message: string
  sent_at: string
  monitor_name: string | null
  monitor_url: string | null
}

const getNotificationList = async (): Promise<NotificationItem[]> => {
  const response = await fetch(`${apiBaseUrl}/notification/getNotificationList`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch notification alert logs')
  }

  const result = await response.json()
  return Array.isArray(result) ? result : result.data ?? []
}

export default function Notification() {
  const [filterType, setFilterType] = useState<string>('ALL')

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotificationList,
    refetchInterval: 15000, // Poll every 15s for incoming bot dispatch events
  })

  const filteredNotifications = notifications.filter((item) => {
    if (filterType === 'ALL') return true
    return item.notification_type === filterType
  })

  const getChannelBadge = (type: string) => {
    switch (type) {
      case 'TELEGRAM':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0088CC]/15 border border-[#0088CC]/40 text-[#0088CC] text-[10px] font-bold tracking-wider uppercase">
            <Send className="w-2.5 h-2.5" />
            TELEGRAM
          </span>
        )
      case 'EMAIL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00E599]/15 border border-[#00E599]/40 text-[#00E599] text-[10px] font-bold tracking-wider uppercase">
            EMAIL
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold tracking-wider uppercase">
            {type}
          </span>
        )
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-8 font-mono text-[#D8E0E8]">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#22252B] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#181B1F] border border-[#22252B] text-[11px] text-slate-400 mb-2">
            <Radio className="w-3 h-3 text-[#00E599] animate-pulse" />
            <span>INCIDENT_DISPATCH_STREAM</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-[#0088CC]" />
            ALERT LOGS & NOTIFICATIONS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical ledger of all webhook pings, down-state alarms, and recovery messages.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Quick Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-9 px-3 bg-[#181B1F] border border-[#22252B] focus:border-[#0088CC] rounded text-xs text-slate-300 outline-none transition-colors cursor-pointer"
          >
            <option value="ALL">ALL CHANNELS</option>
            <option value="TELEGRAM">TELEGRAM</option>
            <option value="EMAIL">EMAIL</option>
            <option value="WEBHOOK">WEBHOOK</option>
          </select>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-9 px-4 bg-[#181B1F] border border-[#22252B] hover:border-[#0088CC]/60 text-slate-300 hover:text-white rounded text-xs flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-[#0088CC]' : 'text-[#00E599]'}`} />
            <span>{isFetching ? 'SYNCING...' : 'SYNC LOGS'}</span>
          </button>
        </div>
      </div>

      {/* Main Alert Log Section */}
      <div className="bg-[#181B1F] border border-[#22252B] rounded-lg shadow-xl overflow-hidden">
        
        {/* Panel Top Title */}
        <div className="px-4 py-3 bg-[#111317] border-b border-[#22252B] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 border border-[#0088CC] bg-[#0088CC]/20 rounded-sm inline-block"></span>
            <span className="text-white font-semibold uppercase tracking-wider text-[11px]">
              LOGS_LEDGER ({filteredNotifications.length} EVENTS)
            </span>
          </div>
          <span className="text-[10px] text-slate-500">AUTO-REFRESH: 15s</span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center text-xs text-slate-400">
            <span className="inline-block animate-spin mr-2">⚡</span> RETRIEVING DISPATCH AUDIT LOGS...
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-4 bg-[#F2495C]/10 border-b border-[#F2495C]/30 text-center text-xs text-[#F2495C] flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{(error as Error)?.message || 'Failed to fetch notification events'}</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredNotifications.length === 0 && (
          <div className="py-20 text-center text-xs text-slate-500">
            NO NOTIFICATION EVENTS DISPATCHED YET.
          </div>
        )}

        {/* Notification Stream List */}
        {!isLoading && !isError && filteredNotifications.length > 0 && (
          <div className="divide-y divide-[#22252B]/60">
            {filteredNotifications.map((item) => {
              const isUpMessage = item.message.includes('UP') || item.message.includes('🟢')
              const isDownMessage = item.message.includes('DOWN') || item.message.includes('🔴')

              return (
                <div 
                  key={item.notification_id} 
                  className="p-4 sm:p-5 hover:bg-[#1F232D]/40 transition-colors space-y-3"
                >
                  {/* Item Top Info Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    {/* Monitor Identity & Status Indicator */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {isUpMessage ? (
                        <CheckCircle2 className="w-4 h-4 text-[#00E599] flex-shrink-0" />
                      ) : isDownMessage ? (
                        <AlertTriangle className="w-4 h-4 text-[#F2495C] flex-shrink-0 animate-pulse" />
                      ) : (
                        <Radio className="w-4 h-4 text-[#0088CC] flex-shrink-0" />
                      )}

                      <span className="font-bold text-white text-sm">
                        {item.monitor_name || 'System Sentinel'}
                      </span>

                      {getChannelBadge(item.notification_type)}
                    </div>

                    {/* Sent At Timestamp */}
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{new Date(item.sent_at).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Target Endpoint URL */}
                  {item.monitor_url && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <span className="text-slate-600">TARGET:</span>
                      <a 
                        href={item.monitor_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0088CC] hover:underline flex items-center gap-1 truncate max-w-lg"
                      >
                        {item.monitor_url}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                  )}

                  {/* Notification Payload Body / Bot Output */}
                  <div className="p-3 bg-[#0B0C10] border border-[#22252B] rounded text-xs text-slate-300 whitespace-pre-line leading-relaxed font-mono selection:bg-[#0088CC]/30">
                    {item.message}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}