"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { 
  ArrowLeft, 
  Eye, 
  Crown, 
  Star, 
  MousePointerClick, 
  Clock, 
  TrendingUp,
  PlaySquare
} from "lucide-react";

interface VideoAnalyticsProps {
  videoId: string;
}

export function VideoAnalyticsView({ videoId }: VideoAnalyticsProps) {
  const t = useTranslations("VideoAnalytics");

  // In a real app, you would fetch data using the videoId.
  // Using Mock Data here for UI demonstration.
  const videoData = {
    title: "Next.js 15 Full Course 2026 - Build a Fullstack App",
    published: "Oct 12, 2026",
    duration: "1:38:20",
    thumbGradient: "from-amber-900/60 via-zinc-900 to-stone-900",
    metrics: {
      views: "12,450",
      premiumViews: "4,150",
      stars: "850",
      ctr: "6.8%",
      avgViewDuration: "12:45",
      retentionPct: "42%"
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] text-zinc-100 animate-fadeIn pb-12">
      
      {/* 1. Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-start gap-4">
          <Link 
            href="/content"
            className="mt-1 p-2 rounded-xl bg-[#18181A] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            title={t("backToContent")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {t("title")}
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400">
                ID: {videoId}
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Video Context Card */}
      <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 flex flex-col md:flex-row gap-5 items-start">
        <div className={`relative w-full md:w-56 aspect-video rounded-xl bg-gradient-to-tr ${videoData.thumbGradient} border border-zinc-700/50 shrink-0 flex items-center justify-center overflow-hidden shadow-inner`}>
          <PlaySquare className="w-10 h-10 text-white/50" />
          <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
            {videoData.duration}
          </span>
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-lg font-bold text-white leading-snug">
            {videoData.title}
          </h2>
          <p className="text-xs font-semibold text-zinc-500">
            Published on {videoData.published}
          </p>
        </div>
      </div>

      {/* 3. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Views */}
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-400 mb-3">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t("views")}</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {videoData.metrics.views}
          </div>
        </div>

        {/* Premium Views */}
        <div className="bg-[#121214] border border-purple-500/20 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center gap-2 text-purple-400 mb-3 relative z-10">
            <Crown className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t("premiumViews")}</span>
          </div>
          <div className="text-2xl font-bold text-white relative z-10">
            {videoData.metrics.premiumViews}
          </div>
        </div>

        {/* Stars Earned */}
        <div className="bg-[#121214] border border-amber-500/20 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center gap-2 text-amber-500 mb-3 relative z-10">
            <Star className="w-4 h-4 fill-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest">{t("stars")}</span>
          </div>
          <div className="text-2xl font-bold text-white relative z-10">
            {videoData.metrics.stars}
          </div>
        </div>

        {/* Click-Through Rate */}
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <MousePointerClick className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t("ctr")}</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-2">
            {videoData.metrics.ctr}
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

      </div>

      {/* 4. Audience Retention Details */}
      <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            {t("retention")}
          </h3>
          <div className="text-sm font-medium text-zinc-300">
            Avg. View: <span className="text-white font-bold">{videoData.metrics.avgViewDuration}</span> <span className="text-zinc-500">({videoData.metrics.retentionPct})</span>
          </div>
        </div>

        {/* Mock Retention Graph specific to this video */}
        <div className="w-full h-48 relative border-b border-l border-zinc-800/80 pt-4 pr-2">
          {/* Grid lines */}
          <div className="absolute left-0 right-0 top-1/4 border-b border-zinc-800/50 border-dashed" />
          <div className="absolute left-0 right-0 top-2/4 border-b border-zinc-800/50 border-dashed" />
          <div className="absolute left-0 right-0 top-3/4 border-b border-zinc-800/50 border-dashed" />
          
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
            {/* Gradient Area */}
            <defs>
              <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M 0,10 C 15,12 20,45 40,50 C 100,55 200,65 400,75 L 400,100 L 0,100 Z" 
              fill="url(#retentionGrad)" 
            />
            {/* The Line */}
            <path 
              d="M 0,10 C 15,12 20,45 40,50 C 100,55 200,65 400,75" 
              fill="none" 
              stroke="#3B82F6" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
          </svg>
          
          <div className="absolute -bottom-6 left-0 text-[10px] text-zinc-500 font-medium">0:00</div>
          <div className="absolute -bottom-6 right-0 text-[10px] text-zinc-500 font-medium">{videoData.duration}</div>
        </div>
      </div>

    </div>
  );
}