import React from 'react';

const monitorsData = [
  { name: 'Production API', url: 'api.pingwatch.io', status: 'Online', region: 'US-East (N. Virginia)', latency: '142ms', ssl: 'Valid (280d)', lastChecked: '10s ago' },
  { name: 'Marketing Website', url: 'pingwatch.io', status: 'Online', region: 'EU-West (Frankfurt)', latency: '88ms', ssl: 'Valid (120d)', lastChecked: '45s ago' },
  { name: 'Auth Gateway', url: 'auth.pingwatch.io', status: 'Offline', region: 'US-West (Oregon)', latency: '0ms', ssl: 'Expired', lastChecked: '1m ago' },
  { name: 'Documentation Portal', url: 'docs.pingwatch.io', status: 'Online', region: 'AP-Southeast (Tokyo)', latency: '210ms', ssl: 'Valid (45d)', lastChecked: '2m ago' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-sans text-[#111827] antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#E5E7EB] bg-white flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-16 px-6 flex items-center gap-2 border-b border-[#E5E7EB]">
            <div className="w-7 h-7 bg-[#111827] rounded flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-[16px] text-[#111827]">PingWatch</span>
          </div>

          <nav className="p-4 space-y-1 text-[14px] font-medium">
            <a href="#" className="flex items-center px-3 py-2 text-[#4F46E5] bg-[#F5F5F5] rounded-lg">Dashboard</a>
            <a href="#" className="flex items-center px-3 py-2 text-[#6B7280] hover:bg-[#F5F5F5] rounded-lg">Monitors</a>
            <a href="#" className="flex items-center px-3 py-2 text-[#6B7280] hover:bg-[#F5F5F5] rounded-lg">Incidents</a>
            <a href="#" className="flex items-center px-3 py-2 text-[#6B7280] hover:bg-[#F5F5F5] rounded-lg">Status Pages</a>
            <a href="#" className="flex items-center px-3 py-2 text-[#6B7280] hover:bg-[#F5F5F5] rounded-lg">SSL Monitoring</a>
            <a href="#" className="flex items-center px-3 py-2 text-[#6B7280] hover:bg-[#F5F5F5] rounded-lg">Settings</a>
          </nav>
        </div>

        <div className="p-4 border-t border-[#E5E7EB] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center font-medium text-[12px]">
            S
          </div>
          <div className="text-[12px]">
            <div className="font-medium text-[#111827]">Sajin</div>
            <div className="text-[#6B7280]">sajin@pingwatch.io</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 border-b border-[#E5E7EB] bg-white px-6 flex items-center justify-between">
          <h1 className="text-[18px] font-semibold text-[#111827]">Dashboard</h1>
          <button className="h-9 px-4 bg-[#4F46E5] text-white text-[14px] font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
            + Add Monitor
          </button>
        </header>

        <div className="p-8 space-y-8 max-w-7xl">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Total Monitors', val: '24' },
              { label: 'Online', val: '23', color: 'text-[#10B981]' },
              { label: 'Offline', val: '1', color: 'text-[#EF4444]' },
              { label: 'Avg Response Time', val: '145ms' },
              { label: 'Active Incidents', val: '1', color: 'text-[#F5B90B]' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <span className="text-[12px] font-medium text-[#6B7280]">{stat.label}</span>
                <p className={`text-[24px] font-bold mt-1 ${stat.color || 'text-[#111827]'}`}>{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Website Monitor Table */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center">
              <h2 className="text-[16px] font-semibold text-[#111827]">Monitors Overview</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-[#F5F5F5] text-[#6B7280] font-medium border-b border-[#E5E7EB]">
                  <tr>
                    <th className="py-3 px-4">Website</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Response Time</th>
                    <th className="py-3 px-4">SSL</th>
                    <th className="py-3 px-4">Last Checked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {monitorsData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#111827]">
                        {item.name}
                        <span className="block text-[12px] text-[#9CA3AF] font-normal">{item.url}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium ${
                          item.status === 'Online' 
                            ? 'bg-[#10B981]/10 text-[#10B981]' 
                            : 'bg-[#EF4444]/10 text-[#EF4444]'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B7280]">{item.region}</td>
                      <td className="py-3.5 px-4 text-[#111827] font-medium">{item.latency}</td>
                      <td className="py-3.5 px-4 text-[#6B7280]">{item.ssl}</td>
                      <td className="py-3.5 px-4 text-[#9CA3AF] text-[12px]">{item.lastChecked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}