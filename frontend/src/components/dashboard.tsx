import React from 'react'
import { apiBaseUrl } from '@/env'
import { useQuery } from '@tanstack/react-query'

interface MonitorStatus {
  name: string
  url: string
  http_status: number
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

function Dashboard() {
  const { data: urlStatus = [], isLoading, isError, error } = useQuery({
    queryKey: ['urlStatus'],
    queryFn: getUrlStatus,
    refetchInterval: 30000, // Optional: Poll every 30s for live monitor updates
  })

  if (isLoading) return <div>Loading monitor statuses...</div>
  if (isError) return <div>Error: {(error as Error).message}</div>

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {urlStatus.map((monitor, index) => (
          <li key={index}>
            <strong>{monitor.name}</strong> ({monitor.url}) — Status: {monitor.http_status ?? 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard