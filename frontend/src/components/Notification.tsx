import React from 'react'
import { apiBaseUrl } from '@/env'
import { useQuery } from '@tanstack/react-query'

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
    throw new Error('Failed to fetch notification list')
  }

  const result = await response.json()
  return result.data ?? []
}

function Notification() {
  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotificationList,
  })

  if (isLoading) {
    return <div>Loading notifications...</div>
  }

  if (isError) {
    return (
      <div>
        <p>Error: {(error as Error).message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map((item) => (
            <li key={item.notification_id}>
              <span>[{item.notification_type}] </span>
              <strong>{item.monitor_name || item.monitor_url || 'System'}: </strong>
              <span>{item.message}</span>
              <small> — {new Date(item.sent_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notification