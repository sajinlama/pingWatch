import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Play,
  Bell,
  Settings,
  ExternalLink,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  const navItems = [
    {
      title: "ADD MONITOR",
      path: "/add-monitor",
      icon: PlusCircle,
      badge: "NEW",
      badgeColor: "bg-[#0088CC]/20 border-[#0088CC]/40 text-[#0088CC]",
    },
    {
      title: "START MONITOR",
      path: "/start-monitoring",
      icon: Play,
      badge: "RUN",
      badgeColor: "bg-[#00E599]/20 border-[#00E599]/40 text-[#00E599]",
    },
    {
      title: "DASHBOARD",
      path: "/dashboard",
      icon: LayoutDashboard,
      badge: "LIVE",
      badgeColor: "bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599]",
    },
    {
      title: "NOTIFICATION",
      path: "/notification",
      icon: Bell,
    },
    {
      title: "SETTINGS",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handleNavClick = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-[#22252B] bg-[#0B0C10] font-mono text-[#D8E0E8] relative"
    >
      {/* 1. Header: Brand Logo */}
      <SidebarHeader className="border-b border-[#22252B] p-4 bg-[#0B0C10]">
        <NavLink to="/dashboard" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 bg-[#181B1F] border border-[#22252B] rounded-lg flex items-center justify-center text-[#0088CC] shadow-[0_0_15px_rgba(0,136,204,0.25)] group-hover:border-[#0088CC]/60 transition-all flex-shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 6V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V6L12 2Z" fill="#181B1F" stroke="#0088CC" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M7 12H10L12 8L14 16L16 12H17" stroke="#00E599" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
            </span>
          </div>

          <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm tracking-wider text-white leading-none">
              BISARIC<span className="text-[#0088CC]">WATCH</span>
            </span>
            <span className="text-[9px] text-slate-500 tracking-widest mt-1 uppercase">
              UPTIME SENTINEL v1.0
            </span>
          </div>
        </NavLink>
      </SidebarHeader>

      {/* 2. Navigation Content */}
      <SidebarContent className="bg-[#0B0C10] px-2 py-3 space-y-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">
            01 // NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      className={`w-full h-10 px-3 rounded text-xs font-mono tracking-wide transition-all ${
                        isActive
                          ? "bg-[#181B1F] text-white border border-[#0088CC]/40 shadow-[0_0_12px_rgba(0,136,204,0.15)]"
                          : "text-slate-400 hover:text-white hover:bg-[#181B1F]/60"
                      }`}
                      onClick={handleNavClick}
                    >
                      <NavLink to={item.path} className="flex items-center gap-3 w-full">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#0088CC]" : "text-slate-400"}`} />
                        <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
                        {item.badge && (
                          <SidebarMenuBadge
                            className={`px-1.5 py-0.5 border text-[9px] font-bold rounded group-data-[collapsible=icon]:hidden ${item.badgeColor}`}
                          >
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Active Status Widget Box */}
        <div className="px-3 pt-2 group-data-[collapsible=icon]:hidden">
          <div className="p-3 bg-[#181B1F] border border-[#22252B] rounded-lg space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_6px_#00E599]"></span>
                PROBES ACTIVE
              </span>
              <span className="text-[#00E599] font-bold">100%</span>
            </div>
            <div className="w-full bg-[#0B0C10] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00E599] h-full w-full"></div>
            </div>
            <span className="text-[9px] text-slate-500 block truncate">
              DISPATCH: @BisaricWatchBot
            </span>
          </div>
        </div>
      </SidebarContent>

      {/* 3. Footer */}
      <SidebarFooter className="border-t border-[#22252B] p-3 bg-[#0B0C10]">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded bg-[#181B1F] border border-[#22252B] flex items-center justify-center text-[#0088CC] font-bold text-xs flex-shrink-0">
              OP
            </div>
            <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
              <span className="text-white text-xs font-bold truncate">OPERATOR</span>
              <span className="text-[10px] text-slate-500 truncate">ONLINE</span>
            </div>
          </div>

          <NavLink
            to="/"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#181B1F] rounded transition-colors group-data-[collapsible=icon]:hidden"
            title="Landing Page"
          >
            <ExternalLink className="w-4 h-4" />
          </NavLink>
        </div>
      </SidebarFooter>

      {/* Hover / Drag edge rail */}
      <SidebarRail />
    </Sidebar>
  );
}