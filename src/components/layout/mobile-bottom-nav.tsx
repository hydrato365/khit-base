"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { 
  LayoutDashboard, 
  PlaySquare, 
  BarChart3, 
  Plus, 
  MessageSquare 
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  if (pathname === "/upload" || pathname === "/policies" || pathname === "/terms" || pathname === "/privacy") return null;

  return (
    <nav 
      aria-label="Bottom navigation"
      className="md:hidden flex items-center justify-between px-2 bg-[#121214] border-t border-zinc-800"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: "64px",
        zIndex: 50,
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      {/* 1. Dashboard */}
      <Link 
        href="/" 
        className="flex-1 flex flex-col items-center justify-center gap-1 h-full select-none"
      >
        <LayoutDashboard className={`w-5 h-5 ${pathname === "/" ? "text-[#8c1cff]" : "text-zinc-500"}`} />
        <span className={`text-[10px] font-medium leading-none ${pathname === "/" ? "text-[#8c1cff] font-semibold" : "text-zinc-500"}`}>
          {t("dashboard")}
        </span>
      </Link>

      {/* 2. Content */}
      <Link 
        href="/content" 
        className="flex-1 flex flex-col items-center justify-center gap-1 h-full select-none"
      >
        <PlaySquare className={`w-5 h-5 ${pathname.startsWith("/content") ? "text-[#8c1cff]" : "text-zinc-500"}`} />
        <span className={`text-[10px] font-medium leading-none ${pathname.startsWith("/content") ? "text-[#8c1cff] font-semibold" : "text-zinc-500"}`}>
          {t("content")}
        </span>
      </Link>

      {/* 3. Center Upload (+) Button */}
      <div className="relative flex-1 flex flex-col items-center justify-center h-full">
        <Link 
          href="/upload" 
          title="Upload"
          className="absolute -top-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg shadow-black/80 border-2 border-[#121214] active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6 text-black stroke-[3]" />
        </Link>
        <span className="text-[10px] font-medium text-zinc-400 leading-none mt-6 select-none">
          {t("upload")}
        </span>
      </div>

      {/* 4. Analytics */}
      <Link 
        href="/analytics" 
        className="flex-1 flex flex-col items-center justify-center gap-1 h-full select-none"
      >
        <BarChart3 className={`w-5 h-5 ${pathname.startsWith("/analytics") ? "text-[#8c1cff]" : "text-zinc-500"}`} />
        <span className={`text-[10px] font-medium leading-none ${pathname.startsWith("/analytics") ? "text-[#8c1cff] font-semibold" : "text-zinc-500"}`}>
          {t("analytics")}
        </span>
      </Link>

      {/* 5. Comments */}
      <Link 
        href="/comments" 
        className="flex-1 flex flex-col items-center justify-center gap-1 h-full select-none"
      >
        <MessageSquare className={`w-5 h-5 ${pathname.startsWith("/comments") ? "text-[#8c1cff]" : "text-zinc-500"}`} />
        <span className={`text-[10px] font-medium leading-none ${pathname.startsWith("/comments") ? "text-[#8c1cff] font-semibold" : "text-zinc-500"}`}>
          {t("comments")}
        </span>
      </Link>
    </nav>
  );
}