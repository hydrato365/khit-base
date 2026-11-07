"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { 
  LayoutDashboard, 
  PlaySquare, 
  BarChart3, 
  MessageSquare, 
  Star, 
  Settings, 
  HelpCircle, 
  Plus, 
  ExternalLink, 
  Globe, 
  LogOut, 
  Check, 
  UserCircle2,
  PanelLeftOpen,
  PanelLeftClose,
  FileText,
  ShieldCheck,
  Lock
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { setLocale } from "@/actions/locale";
import { useSidebar } from "@/components/layout/sidebar-context";

interface SidebarProps {
  starsBalance?: number;
}

export function Sidebar({ starsBalance = 14500 }: SidebarProps) {
  const { isExpanded, toggleExpanded } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const effectiveExpanded = isExpanded;
  
  const moreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const tHeader = useTranslations("Header");
  const [isPending, startTransition] = useTransition();

  const isAvatarActive = [
    "/profile",
    "/settings",
    "/terms",
    "/policies",
    "/privacy",
    "/help",
  ].some((p) => pathname.startsWith(p));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (nextLocale: "en" | "my") => {
    if (nextLocale === locale) return;
    startTransition(async () => {
      await setLocale(nextLocale);
      router.refresh();
    });
  };

  const handleGoToMainApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.hostname === "localhost") {
      window.location.href = "http://localhost:3000";
    } else {
      window.location.href = process.env.NEXT_PUBLIC_MAIN_URL || "https://khit.to";
    }
  };

  const mainMenuItems = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard, href: "/" },
    { id: "content", label: t("content"), icon: PlaySquare, href: "/content" },
    { id: "analytics", label: t("analytics"), icon: BarChart3, href: "/analytics" },
    { id: "comments", label: t("comments"), icon: MessageSquare, href: "/comments" },
    { id: "earnings", label: t("earnings"), icon: Star, href: "/earnings" },
  ];

  return (
    <>
      {/* Desktop Left Rail with More (...) Layout */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { 
          setIsHovered(false); 
          setIsMoreOpen(false);
          setIsProfileOpen(false);
        }}
        className={`hidden md:flex fixed left-0 top-0 bottom-0 z-50 transition-all duration-300 ease-in-out flex-col overflow-visible ${
          effectiveExpanded ? "w-64" : "w-[72px]"
        }`}
      >
        <div className="absolute inset-y-0 left-0 w-[600px] overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-none">
          <div className={`pointer-events-auto bg-[#09090b] min-h-full flex flex-col justify-between transition-all duration-300 ease-in-out ${
            effectiveExpanded ? "w-64 shadow-2xl shadow-black/90" : "w-[72px]"
          }`}>
            
            {/* Top: Logo, Upload (+), Main Nav, Stars */}
            <div className="py-5 px-3 space-y-5">
              
              {/* Logo & Expand/Collapse Toggle Button */}
              <div className="relative w-full h-11 flex items-center justify-between">
            {!effectiveExpanded ? (
              <button
                type="button"
                onClick={toggleExpanded}
                className="h-11 flex items-center rounded-xl hover:bg-white/5 transition-colors cursor-pointer px-1"
              >
                <div className="relative flex items-center">
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}>
                    <PanelLeftOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className={`transition-opacity duration-150 ${
                    isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}>
                    <BrandLogo />
                  </div>
                </div>
              </button>
            ) : (
              <div className="relative w-full h-11 flex items-center justify-between">
                <Link href="/" className="h-full flex items-center cursor-pointer group px-1">
                  <BrandLogo />
                  <span className="font-medium text-xl text-zinc-400 tracking-tight ml-1.5 whitespace-nowrap group-hover:text-white transition-colors">
                    Base
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsHovered(false);
                    toggleExpanded();
                  }}
                  title="Collapse sidebar"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                >
                  <PanelLeftClose className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="pt-1 relative group">
            <Link
              href="/upload"
              className="w-full h-11 flex items-center rounded-xl bg-[#8c1cff] hover:bg-[#7a12e6] text-white font-bold transition-all cursor-pointer shadow-md shadow-[#8c1cff]/30 relative overflow-hidden"
            >
              <div className="w-12 h-full flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5 stroke-[3]" />
              </div>
              <span 
                className={`whitespace-nowrap text-sm tracking-wide text-left transition-all duration-200 flex-1 ${
                  effectiveExpanded 
                    ? "opacity-100 w-auto translate-x-0" 
                    : "opacity-0 w-0 pointer-events-none -translate-x-2"
                }`}
              >
                {t("upload")}
              </span>
            </Link>

            {/* Tooltip when collapsed */}
            {!effectiveExpanded && (
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#18181b] border border-white/10 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                {t("upload")}
              </span>
            )}
          </div>

          <div className="h-px bg-white/5 mx-1" />

          {/* Main Navigation Items */}
          <nav className="space-y-1.5">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const isEarnings = item.id === "earnings";

              return (
                <div key={item.id} className="relative group">
                  <Link
                    href={item.href}
                    className={`w-full h-11 flex items-center rounded-xl text-sm font-semibold transition-all relative overflow-hidden cursor-pointer ${
                      isActive 
                        ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/30" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="w-12 h-full flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        isActive 
                          ? "text-white" 
                          : isEarnings 
                            ? "text-amber-400 fill-amber-400" 
                            : "text-zinc-400 group-hover:text-white"
                      }`} />
                    </div>

                    <span 
                      className={`whitespace-nowrap tracking-wide text-left transition-all duration-200 flex-1 ${
                        effectiveExpanded 
                          ? "opacity-100 w-auto translate-x-0" 
                          : "opacity-0 w-0 pointer-events-none -translate-x-2"
                      }`}
                    >
                      {item.label}
                    </span>

                    {isEarnings && effectiveExpanded && !isActive && (
                      <span className="mr-3 text-[10px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded">
                        Stars
                      </span>
                    )}
                  </Link>

                  {/* Tooltip when collapsed */}
                  {!effectiveExpanded && (
                    <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#18181b] border border-white/10 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                      {item.label}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Profile Avatar with Unified Menu */}
        <div className="p-3 border-t border-white/5">
          <div className="relative group" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-full h-12 flex items-center rounded-xl transition-all cursor-pointer ${
                isProfileOpen 
                  ? "bg-white/10" 
                  : isAvatarActive 
                    ? "bg-[#8c1cff]/15 ring-1 ring-[#8c1cff]/50" 
                    : "hover:bg-white/5"
              }`}
            >
              <div className="w-12 h-full flex items-center justify-center shrink-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-amber-700 via-rose-900 to-indigo-950 ring-1 ring-white/20">
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-1.5 h-1.5 text-black stroke-[3.5]" />
                  </span>
                </div>
              </div>

              <div 
                className={`flex flex-col text-left justify-center transition-all duration-200 overflow-hidden ${
                  effectiveExpanded ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 pointer-events-none -translate-x-2"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white truncate max-w-[110px]">Min Mahar</span>
                  <span className="w-3 h-3 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Check className="w-2 h-2 text-black stroke-[3.5]" />
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">@minmahar</span>
              </div>
            </button>

            {/* Tooltip when collapsed */}
            {!effectiveExpanded && !isProfileOpen && (
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#18181b] border border-white/10 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                Min Mahar
              </span>
            )}

            {/* Profile Popover with All More Actions */}
            {isProfileOpen && (
              <div className="absolute left-full ml-2 bottom-0 w-60 bg-[#111113] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-white space-y-1 before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-3 before:content-['']">
                
                {/* Channel Profile */}
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                    pathname.startsWith("/profile")
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <UserCircle2 className={`w-4 h-4 ${pathname.startsWith("/profile") ? "text-white" : "text-zinc-400"}`} />
                  <span>{tHeader("channelProfile")}</span>
                </Link>

                {/* Settings */}
                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                    pathname.startsWith("/settings")
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Settings className={`w-4 h-4 ${pathname.startsWith("/settings") ? "text-white" : "text-zinc-400"}`} />
                  <span>{t("settings")}</span>
                </Link>

                <div className="h-px bg-white/5 my-1" />

                {/* Terms of Service */}
                <Link
                  href="/terms"
                  onClick={() => setIsProfileOpen(false)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                    pathname.startsWith("/terms")
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileText className={`w-4 h-4 ${pathname.startsWith("/terms") ? "text-white" : "text-zinc-400"}`} />
                  <span>Terms of Service</span>
                </Link>

                {/* Community & Policies */}
                <Link
                  href="/policies"
                  onClick={() => setIsProfileOpen(false)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                    pathname.startsWith("/policies")
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${pathname.startsWith("/policies") ? "text-white" : "text-zinc-400"}`} />
                  <span>Community & Policies</span>
                </Link>

                {/* Privacy Policy */}
                <Link
                  href="/privacy"
                  onClick={() => setIsProfileOpen(false)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                    pathname.startsWith("/privacy")
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Lock className={`w-4 h-4 ${pathname.startsWith("/privacy") ? "text-white" : "text-zinc-400"}`} />
                  <span>Privacy Policy</span>
                </Link>

                {/* Help & Feedback */}
                <Link
                  href="/help"
                  onClick={() => setIsProfileOpen(false)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                    pathname.startsWith("/help")
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <HelpCircle className={`w-4 h-4 ${pathname.startsWith("/help") ? "text-white" : "text-zinc-400"}`} />
                  <span>Help & Feedback</span>
                </Link>

                <div className="h-px bg-white/5 my-1" />

                {/* Watch Khit.to */}
                <button
                  type="button"
                  onClick={(e) => {
                    setIsProfileOpen(false);
                    handleGoToMainApp(e);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors text-xs font-semibold text-zinc-200 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-zinc-400" />
                    <span>{tHeader("watchKhit")}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">khit.to</span>
                </button>

                <div className="h-px bg-white/5 my-1" />

                {/* Language Switcher */}
                <div className="px-2.5 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{tHeader("language")}</span>
                  </div>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("en")}
                      disabled={isPending}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        locale === "en" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("my")}
                      disabled={isPending}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        locale === "my" ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      မြန်မာ
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/5 my-1" />

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{tHeader("signOut")}</span>
                </button>
              </div>
            )}
          </div>

        </div>
          </div>
        </div>
      </aside>

      </>
  );
}