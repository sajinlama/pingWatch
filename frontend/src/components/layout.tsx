import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet, Link } from "react-router-dom";
import { Bell } from "lucide-react";

export default function Layout() {
  return (
    <SidebarProvider
      className="h-screen w-screen overflow-hidden bg-[#0B0C10]"
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-icon": "4.5rem",
      } as React.CSSProperties}
    >
      {/* Fixed Sticky Sidebar */}
      <AppSidebar />

      {/* Main Viewport Container */}
      <SidebarInset className="h-full flex flex-col flex-1 min-w-0 bg-[#0B0C10] font-sans text-[#D8E0E8] overflow-hidden relative">
        
        {/* Subtle Background Glows */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-gradient-to-b from-[#0088CC]/15 via-[#0088CC]/5 to-transparent blur-[110px] pointer-events-none -z-10 rounded-full" />

        {/* Sticky Header */}
        <header className="h-14 border-b border-[#22252B] bg-[#0B0C10]/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 font-mono text-xs flex-shrink-0">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="p-2 text-slate-400 hover:text-white hover:bg-[#181B1F] rounded border border-[#22252B] transition-colors cursor-pointer" />
            <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[11px]">
              <span className="text-white font-bold uppercase">BISARICWATCH</span>
              <span>/</span>
              <span className="text-[#0088CC]">TELEMETRY CONSOLE</span>
            </div>
          </div>

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

        {/* Dedicated Smooth Scrollable Body with Custom Dark Scrollbar */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

      </SidebarInset>
    </SidebarProvider>
  );
}