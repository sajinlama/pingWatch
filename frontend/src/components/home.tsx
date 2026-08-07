import React from 'react';

export default function Home({ userName = "Sajin" }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111827] flex flex-col justify-between antialiased">
      {/* Top Bar */}
      <header className="h-16 border-b border-[#E5E7EB] bg-white px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#111827] rounded flex items-center justify-center text-white">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-[16px]">PingWatch</span>
        </div>
        <a href="#dashboard" className="h-9 px-4 bg-[#111827] text-white rounded-lg text-[14px] font-medium flex items-center justify-center hover:bg-[#111827]/90 transition-colors">
          Go to Dashboard
        </a>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto text-center px-4 py-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[12px] font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
          Welcome back, {userName}
        </span>
        <h1 className="text-[40px] font-bold tracking-tight text-[#111827] sm:text-[48px] leading-tight">
          Uptime monitoring built for mission-critical software.
        </h1>
        <p className="mt-4 text-[18px] text-[#6B7280] max-w-2xl mx-auto">
          PingWatch checks your endpoints every 30 seconds from 12 global regions. Get notified instantly via Telegram, Slack, or SMS before your users notice.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a href="#dashboard" className="h-11 px-6 bg-[#4F46E5] text-white text-[14px] font-medium rounded-lg hover:bg-[#4338CA] flex items-center transition-colors">
            View Live Status
          </a>
          <a href="#docs" className="h-11 px-6 bg-white border border-[#E5E7EB] text-[#111827] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] flex items-center transition-colors">
            Documentation
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white py-6 text-center text-[12px] text-[#9CA3AF]">
        © {new Date().getFullYear()} PingWatch, Inc. All rights reserved.
      </footer>
    </div>
  );
}