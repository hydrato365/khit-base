"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { 
  Eye, Clock, Users, Star, TrendingUp, Sparkles, PlaySquare, 
  UploadCloud, ChevronRight, Radio, Wallet, ArrowRight
} from "lucide-react";
import { PayoutModal } from "@/components/dashboard/payout-modal"; 

export default function DashboardHome() {
  const t = useTranslations("Dashboard");
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);

  return (
    <div className="max-w-[1500px] animate-fadeIn pb-12">
      
      {/* 1. Personalized Greeting Header - Minimalist */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
            {t("title")}
          </h1>
          <div className="text-sm text-zinc-400 mt-2 flex items-start gap-1.5">
            <p className="leading-snug">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <Link 
          href="/upload" 
          className="h-10 px-5 bg-[#8c1cff] hover:bg-[#7a12e6] text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md shadow-[#8c1cff]/20 transition-colors self-start md:self-auto"
        >
          <UploadCloud className="w-4 h-4 stroke-[3]" />
          <span>Upload Video</span>
        </Link>
      </div>

      {/* 2. Main Grid Layout (3 Columns on Large Screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* =========================================
            COLUMN 1: Latest Video Performance 
            ========================================= */}
        <div className="bg-[#121214] md:bg-[#0a0a0c] border border-white/10 md:border-white/5 rounded-2xl p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-white">
              {t("latestVideo")}
            </h2>
          </div>
          
          {/* Thumbnail */}
          <div className="w-full aspect-video bg-[#121214] rounded-xl border border-white/5 overflow-hidden relative group cursor-pointer mb-5">
            <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-zinc-200 rounded-md">
              1:38:20
            </span>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <PlaySquare className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-zinc-200 line-clamp-2 hover:text-white cursor-pointer transition-colors leading-relaxed mb-2">
            Next.js 15 Full Course 2026 - Build a Fullstack App
          </h3>
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-6">
            First 48 hours
          </p>

          {/* Metrics List */}
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">{t("views")}</span>
              <div className="flex items-center gap-2.5">
                <span className="font-medium text-white">1,240</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </div>
            <div className="h-px bg-white/5 w-full" />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Click-through rate</span>
              <div className="flex items-center gap-2.5">
                <span className="font-medium text-white">6.8%</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </div>
            <div className="h-px bg-white/5 w-full" />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Average view duration</span>
              <div className="flex items-center gap-2.5">
                <span className="font-medium text-white">12:45</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </div>
            <div className="h-px bg-white/5 w-full" />
            
            {/* Stars Earned directly on video */}
            <div className="flex items-center justify-between text-sm bg-white/[0.05] md:bg-white/[0.02] p-3 rounded-xl border border-white/10 md:border-white/5 mt-2">
              <span className="text-zinc-300 font-medium">
                {t("stars")}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-amber-500">120</span>
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
            </div>
          </div>
          
          <Link href="/analytics" className="text-[11px] font-semibold text-zinc-400 hover:text-white uppercase tracking-widest flex items-center gap-1.5 pt-6 transition-colors inline-flex mt-auto">
            Go to Video Analytics <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* =========================================
            COLUMN 2: Macro Health (Analytics Overview)
            ========================================= */}
        <div className="bg-[#121214] md:bg-[#0a0a0c] border border-white/10 md:border-white/5 rounded-2xl p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-white">
              Channel Analytics
            </h2>
          </div>
          
          <div className="mb-8 p-5 rounded-xl bg-white/[0.05] md:bg-white/[0.02] border border-white/10 md:border-white/5">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
              {t("followers")}
            </p>
            <div className="text-3xl sm:text-4xl font-semibold text-white mt-3 tracking-tight">
              128,450
            </div>
            <p className="text-xs text-emerald-400 font-medium mt-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> {t("inLast28Days")}
            </p>
          </div>

          <div className="space-y-5 flex-1">
            <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
              Summary (Last 28 Days)
            </h3>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">{t("views")}</span>
              <span className="font-medium text-white">4.5K</span>
            </div>
            <div className="h-px bg-white/5 w-full" />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">{t("watchTime")}</span>
              <span className="font-medium text-white">610</span>
            </div>
            <div className="h-px bg-white/5 w-full" />
            
            <div className="pt-4">
              <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Realtime
              </h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Live views (48h)</span>
                <span className="font-medium text-white">124</span>
              </div>
            </div>
          </div>

          <Link href="/analytics" className="text-[11px] font-semibold text-zinc-400 hover:text-white uppercase tracking-widest flex items-center gap-1.5 pt-6 transition-colors inline-flex mt-auto">
            Go to Channel Analytics <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* =========================================
            COLUMN 3: Wallet & Community 
            ========================================= */}
        <div className="bg-[#121214] md:bg-[#0a0a0c] border border-white/10 md:border-white/5 rounded-2xl p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-white">
              Monetization & Community
            </h2>
          </div>
          
          {/* Main Wallet Card */}
          <div className="bg-white/[0.05] md:bg-white/[0.02] border border-white/10 md:border-white/5 rounded-xl p-5 mb-8">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              Available Balance
            </p>
            <div className="text-3xl font-semibold text-amber-500 flex items-center gap-2.5 tracking-tight">
              14,500 <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <p className="text-sm text-zinc-500 mt-2 mb-5 font-medium">
              ≈ 145,000 MMK
            </p>
            
            <button 
              onClick={() => setIsPayoutOpen(true)}
              className="w-full py-2.5 bg-[#8c1cff] hover:bg-[#7a12e6] text-white text-sm font-bold rounded-lg shadow-md shadow-[#8c1cff]/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Request Payout <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          <div className="h-px bg-white/5 w-full mb-6" />

          {/* Recent Supporters (Tippers) */}
          <div className="flex-1">
             <div className="flex items-center justify-between mb-5">
                <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                  Recent Supporters
                </h3>
                <span className="text-[9px] bg-white/5 text-zinc-400 px-2 py-1 rounded-md font-semibold uppercase tracking-widest">
                  Live Feed
                </span>
             </div>
             
             <div className="space-y-1">
                {/* Supporter 1 */}
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                   <div className="flex items-center gap-3 min-w-0">
                     <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-medium text-zinc-300 shrink-0">
                       A
                     </div>
                     <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-200 truncate">Aung Myo Htet</p>
                     </div>
                   </div>
                   <div className="text-xs font-semibold text-amber-500">
                      +500
                   </div>
                </div>

                {/* Supporter 2 */}
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                   <div className="flex items-center gap-3 min-w-0">
                     <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-medium text-zinc-300 shrink-0">
                       T
                     </div>
                     <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-200 truncate">Thiri Shwe Sin</p>
                     </div>
                   </div>
                   <div className="text-xs font-semibold text-amber-500">
                      +1.2K
                   </div>
                </div>

                {/* Supporter 3 */}
                <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                   <div className="flex items-center gap-3 min-w-0">
                     <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-medium text-zinc-300 shrink-0">
                       M
                     </div>
                     <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-200 truncate">Min Thura</p>
                     </div>
                   </div>
                   <div className="text-xs font-semibold text-amber-500">
                      +300
                   </div>
                </div>
             </div>
          </div>
          
          <Link href="/earnings" className="text-[11px] font-semibold text-zinc-400 hover:text-white uppercase tracking-widest flex items-center gap-1.5 pt-6 transition-colors inline-flex mt-auto">
            View All Earnings <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      <PayoutModal 
        isOpen={isPayoutOpen} 
        onClose={() => setIsPayoutOpen(false)} 
        starsBalance={14500} 
      />
    </div>
  );
}