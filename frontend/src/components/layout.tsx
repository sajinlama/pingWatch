import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet, Link } from "react-router-dom";
import { Bell } from "lucide-react";

export default function Layout() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-icon": "4.5rem",
      } as React.CSSProperties}
    >
      {/* AppSidebar handles its own fixed/off-canvas positioning */}
      <AppSidebar />

      {/* SidebarInset smoothly occupies only the remaining viewport space */}
      <SidebarInset className="min-h-screen bg-[#0B0C10] font-sans text-[#D8E0E8] flex flex-col min-w-0 flex-1">
        
        {/* Top Header Bar */}
        <header className="h-14 border-b border-[#22252B] bg-[#0B0C10]/90 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-40 font-mono text-xs">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="p-2 text-slate-400 hover:text-white hover:bg-[#181B1F] rounded border border-[#22252B] transition-colors cursor-pointer" />
            <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[11px]">
              <span className="text-white font-bold uppercase">BISARICWATCH</span>
              <span>/</span>
              <span className="text-[#0088CC]">TELEMETRY CONSOLE</span>
            </div>
          </div>

          {/* Status & Quick Action */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-[#181B1F] border border-[#22252B] rounded text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
              <span>PROBES: RUNNING</span>
            </div>
            <Link 
              to="/telegram-connect"
              className="h-8 px-3 bg-[#0088CC]/10 border border-[#0088CC]/40 text-[#0088CC] hover:bg-[#0088CC]/20 rounded flex items-center gap-2 transition-all font-bold text-[11px] uppercase"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>BOT READY</span>
            </Link>
          </div>
        </header>

        {/* Page Outlet Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#0B0C10]">
          <Outlet />
        </main>

      </SidebarInset>
    </SidebarProvider>
  );
}