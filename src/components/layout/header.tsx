"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Upload, ChevronDown, Check, Star, ExternalLink, PlaySquare, Globe, LogOut, Settings, HelpCircle, FileText, ShieldCheck, ArrowLeft, Printer, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { setLocale } from "@/actions/locale";

interface HeaderProps {
  starsBalance?: number;
}

export function Header({ starsBalance = 14500 }: HeaderProps) {
  const locale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDocMenuOpen, setIsDocMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const isAvatarActive = [
    "/profile",
    "/settings",
    "/terms",
    "/policies",
    "/privacy",
    "/help",
  ].some((p) => pathname.startsWith(p));

  const handleLanguageChange = (nextLocale: "en" | "my") => {
    if (nextLocale === locale) return;
    startTransition(async () => {
      await setLocale(nextLocale);
      router.refresh();
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGoToMainApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.hostname === "localhost") {
      window.location.href = "http://localhost:3000";
    } else {
      window.location.href = process.env.NEXT_PUBLIC_MAIN_URL || "https://khit.to";
    }
  };

  if (pathname === "/policies" || pathname === "/terms" || pathname === "/privacy") {
    return (
      <>
        {/* Backdrop for closing dropdown */}
        {isDocMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsDocMenuOpen(false)} 
          />
        )}

        <header className="md:hidden sticky top-0 left-0 right-0 h-14 bg-[#09090b]/95 backdrop-blur-md border-b border-white/5 z-50 px-3 sm:px-4 flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-zinc-200 hover:text-white active:scale-95 transition-all text-xs font-semibold py-1.5 px-2 rounded-lg active:bg-zinc-800"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Back</span>
          </Link>

          {/* Center: Legal Docs Dropdown Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDocMenuOpen(!isDocMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 active:bg-zinc-800 transition-colors cursor-pointer"
            >
              <span>
                {pathname === "/policies"
                  ? "Policies"
                  : pathname === "/terms"
                    ? "Terms"
                    : "Privacy"}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isDocMenuOpen ? "rotate-180 text-white" : ""}`} />
            </button>

            {/* Dropdown Flyout */}
            {isDocMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 bg-[#18181A] border border-zinc-800 rounded-2xl p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                <Link
                  href="/policies"
                  onClick={() => setIsDocMenuOpen(false)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/policies"
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Community & Policies</span>
                  </div>
                  {pathname === "/policies" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </Link>

                <Link
                  href="/terms"
                  onClick={() => setIsDocMenuOpen(false)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/terms"
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Terms of Service</span>
                  </div>
                  {pathname === "/terms" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </Link>

                <Link
                  href="/privacy"
                  onClick={() => setIsDocMenuOpen(false)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/privacy"
                      ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Privacy Policy</span>
                  </div>
                  {pathname === "/privacy" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </Link>
              </div>
            )}
          </div>

          {/* Print Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="p-2 rounded-lg text-zinc-400 hover:text-white active:bg-zinc-800 transition-colors cursor-pointer"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>
        </header>
      </>
    );
  }

  return (
    <header className={`md:hidden sticky top-0 left-0 right-0 h-14 bg-[#09090b] border-b border-white/5 z-40 px-3 sm:px-4 ${pathname === "/upload" ? "hidden" : "flex"} items-center justify-between gap-2`}>
      {/* Brand Logo & Back to Khit Link */}
      <div className="flex items-center gap-3">
        <button 
          type="button"
          onClick={handleGoToMainApp}
          title="Return to Khit Streaming"
          className="flex items-center gap-1 cursor-pointer select-none shrink-0 group bg-transparent border-0 p-0 text-left hover:opacity-80 transition-opacity"
        >
          <BrandLogo />
          <span className="font-medium text-xl text-zinc-400 tracking-tight mt-0.5 ml-0.5 group-hover:text-white transition-colors">
            Base
          </span>
        </button>

        {/* Main App သို့ ကူးမည့် ခလုတ် */}
        <button
          type="button"
          onClick={handleGoToMainApp}
          className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <PlaySquare className="w-3.5 h-3.5 text-red-500" />
          <span>{t("watchKhit")}</span>
          <ExternalLink className="w-3 h-3 text-zinc-500 ml-0.5" />
        </button>
      </div>

      {/* ညာဘက်ခြမ်း Controls (Compact Star & Clean Profile Avatar) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        {/* ⭐ Stars Balance Pill (Compact 14.5k format) */}
        <Link
          href="/earnings"
          title="Stars Balance"
          className="h-8 sm:h-10 px-2.5 sm:px-3 rounded-full bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 transition-all text-amber-400 flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 shrink-0" />
          <span className="text-xs sm:text-sm font-black tracking-wide">
            {starsBalance >= 1000 ? `${(starsBalance / 1000).toFixed(1).replace(/\.0$/, "")}k` : starsBalance}
          </span>
        </Link>

        {/* Upload Video Button (Desktop တွင်သာ Header ၌ ပြသမည်) */}
        <Link 
          href="/upload"
          title="Upload Video"
          className="hidden md:flex h-10 px-4 bg-[#8c1cff] hover:bg-[#7a12e6] text-white text-sm font-bold rounded-xl items-center gap-2 shadow-md shadow-[#8c1cff]/20 transition-colors"
        >
          <Upload className="w-4 h-4 stroke-[2.5]" />
          <span>{t("upload")}</span>
        </Link>

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            title="Account Menu"
            className={`h-8 sm:h-10 p-0.5 sm:px-3 rounded-full sm:rounded-xl bg-transparent sm:bg-[#181818] hover:bg-zinc-800 border-0 sm:border border-zinc-800 transition-all flex items-center gap-2 cursor-pointer group shrink-0 ${
              isAvatarActive ? "ring-2 ring-[#8c1cff]" : ""
            }`}
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-red-600 overflow-hidden bg-gradient-to-tr from-amber-700 via-rose-900 to-indigo-950 shrink-0" />
            <div className="hidden lg:flex flex-col text-left leading-none justify-center">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm font-bold text-zinc-100 group-hover:text-white">
                  Min Mahar
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-black stroke-[3.5]" />
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                @minmahar_tech
              </span>
            </div>
          </button>

          {/* 🌟 Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-10 sm:top-12 w-60 bg-[#18181A] border border-zinc-800 rounded-2xl p-2 shadow-2xl shadow-black/90 z-50 animate-in fade-in zoom-in-95 duration-150 text-white">
              
              {/* Profile Link */}
              <Link
                href="/profile"
                onClick={() => setIsProfileOpen(false)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors group cursor-pointer ${
                  pathname.startsWith("/profile")
                    ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                    : "hover:bg-zinc-800 text-zinc-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-700 via-rose-900 to-indigo-950 shrink-0 border border-zinc-700" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {t("channelProfile")}
                  </span>
                  <span className={`text-[11px] ${pathname.startsWith("/profile") ? "text-white/80" : "text-zinc-400"}`}>@minmahar_tech</span>
                </div>
              </Link>

              <div className="h-px bg-zinc-800 my-1 mx-1" />

              {/* Settings */}
              <Link
                href="/settings"
                onClick={() => setIsProfileOpen(false)}
                className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                  pathname.startsWith("/settings")
                    ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Settings className={`w-4 h-4 ${pathname.startsWith("/settings") ? "text-white" : "text-zinc-400"}`} />
                <span>Settings</span>
              </Link>

              <div className="h-px bg-zinc-800 my-1 mx-1" />

              {/* Terms of Service */}
              <Link
                href="/terms"
                onClick={() => setIsProfileOpen(false)}
                className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-xs font-semibold ${
                  pathname.startsWith("/terms")
                    ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
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
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
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
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
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
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <HelpCircle className={`w-4 h-4 ${pathname.startsWith("/help") ? "text-white" : "text-zinc-400"}`} />
                <span>Help & Feedback</span>
              </Link>

              <div className="h-px bg-zinc-800 my-1 mx-1" />

              {/* Watch Khit.to */}
              <button
                type="button"
                onClick={(e) => {
                  setIsProfileOpen(false);
                  handleGoToMainApp(e);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-zinc-800 transition-colors text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                  <span>{t("watchKhit")}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">khit.to</span>
              </button>

              <div className="h-px bg-zinc-800 my-1 mx-1" />

              {/* Language Switcher */}
              <div className="px-2.5 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-zinc-300">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span>{t("language")}</span>
                </div>
                <div className="flex items-center bg-zinc-900 border border-zinc-700/50 rounded-lg p-0.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleLanguageChange("en"); }}
                    disabled={isPending}
                    className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                      locale === "en"
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                  <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleLanguageChange("my"); }}
                        disabled={isPending}
                        className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          locale === "my"
                            ? "bg-white text-black font-semibold"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        မြန်မာ
                      </button>
                </div>
              </div>

              <div className="h-px bg-zinc-800 my-2 mx-1" />

              {/* Sign Out */}
              <button 
                onClick={() => setIsProfileOpen(false)} 
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{t("signOut")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}