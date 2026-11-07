"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { 
  timeRangeOptions, 
  statsByRange, 
  metricConfigs, 
  generateChartData, 
  realtimeBars, 
  type TimeRange, 
  type MetricType 
} from "@/data/analytics";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Clock, 
  Users, 
  Star, 
  ChevronDown, 
  Globe2, 
  Radio, 
  Calendar,
  Activity,
  Filter,
  MousePointerClick,
  Crown
} from "lucide-react";

export function AnalyticsView() {
  const t = useTranslations("Analytics");
  const [timeRange, setTimeRange] = useState<TimeRange>("Last 28 days");
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState<MetricType>("views");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  
  // Live Data States
  const [liveViews, setLiveViews] = useState(32450);
  const [isLivePulsing, setIsLivePulsing] = useState(false);
  // Bar များကို အသေမထားတော့ဘဲ State ထဲထည့်ကာ ညာဘက်အစွန်ဆုံးကို 60% အမြင့်မှ စတင်ထားသည် (တက်လာစေရန်)
  const [liveBars, setLiveBars] = useState<number[]>([
    35, 42, 28, 55, 68, 48, 72, 85, 64, 52, 78, 92, 45, 60, 74, 88, 62, 54, 82, 95, 76, 84, 91, 60
  ]);

  // Realtime Live Counter & Bar Growth Engine
  useEffect(() => {
    const interval = setInterval(() => {
      // Views ၃ ခုမှ ၇ ခုကြား ကျပန်းတက်မည်
      const newViews = Math.floor(Math.random() * 5) + 3;
      
      setLiveViews((prev) => prev + newViews);
      setIsLivePulsing(true);

      // Views တက်သည်နှင့်အမျှ ညာဘက်အစွန်ဆုံး Bar လေးကိုပါ အမြင့် (Height) လိုက်တက်စေခြင်း
      setLiveBars((prevBars) => {
        const newBars = [...prevBars];
        const lastIndex = newBars.length - 1;
        // အများဆုံး 100% အထိသာ တက်ခွင့်ပြုမည်
        newBars[lastIndex] = Math.min(100, newBars[lastIndex] + (newViews * 0.4));
        return newBars;
      });

      setTimeout(() => setIsLivePulsing(false), 800);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const currentStats = statsByRange[timeRange];
  const currentMetricConfig = metricConfigs[activeMetric];
  const chartData = useMemo(() => generateChartData(activeMetric, timeRange), [activeMetric, timeRange]);

  // ဖုန်း (Touch) နှင့် ကွန်ပျူတာ (Mouse) နှစ်မျိုးစလုံးအတွက် Scrubber Engine
  const handleChartInteraction = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = 0;
    
    // ဖုန်းစခရင်ပေါ်မှ လက်ချောင်း (Touch) သို့မဟုတ် Mouse ၏ နေရာကို ခွဲခြားယူခြင်း
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    
    const mouseX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
    const idx = Math.min(
      chartData.points.length - 1,
      Math.max(0, Math.round(ratio * (chartData.points.length - 1)))
    );
    setHoveredPointIndex(idx);
  };

  const activeHoverPoint = hoveredPointIndex !== null ? chartData.points[hoveredPointIndex] : null;

  return (
    <div className="space-y-5 max-w-[1500px] text-zinc-100 animate-fadeIn pb-32 md:pb-24">
      
      {/* 1. Header Title (Non-sticky) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08] mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
                {t("title")}
              </h1>
              <p className="text-sm text-zinc-400 mt-2">
                {t("subtitle")}
              </p>
        </div>
      </div>

      {/* Floating Global Time Filter Pill (Sticky ညာဘက်အောက်ထောင့်) */}
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 flex flex-col items-end">
        {/* Dropdown Menu (အပေါ်သို့ ပွင့်မည်) */}
        {isTimeDropdownOpen && (
          <div className="mb-2 w-48 bg-[#141416]/95 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
            {timeRangeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setTimeRange(opt);
                  setIsTimeDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                  timeRange === opt 
                    ? "bg-white/10 text-white font-bold" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{opt}</span>
                {timeRange === opt && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </button>
            ))}
          </div>
        )}

        {/* Floating Button */}
        <button 
          type="button"
          onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
          className="h-11 px-4 rounded-full bg-[#18181b]/95 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-[#27272a] text-sm font-medium text-zinc-200 flex items-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-black/50"
        >
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>{timeRange}</span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isTimeDropdownOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* 2. Unified Metric Tabs & Main Area Chart (Enterprise Style) */}
      <div className="bg-[#121214] md:bg-[#09090b] border border-white/10 rounded-xl flex flex-col mb-4 overflow-hidden">
        
        {/* Tabs Row - Calendar အလိုက် တိုက်ရိုက် Data များ ပြောင်းလဲသွားမည် */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/10 bg-[#0a0a0c] md:bg-[#000000]">
          {/* Views Tab */}
          <button 
            type="button"
            onClick={() => setActiveMetric("views")}
            className={`relative p-5 md:p-6 text-left transition-all cursor-pointer border-r border-white/5 ${
              activeMetric === "views" ? "bg-[#121214] md:bg-[#09090b]" : "bg-transparent hover:bg-white/[0.04]"
            }`}
          >
            {activeMetric === "views" && <div className="absolute top-0 left-0 w-full h-[3px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />}
                    <span className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 block ${activeMetric === "views" ? "text-zinc-200" : "text-zinc-600"}`}>{t("tabViews")}</span>
                    <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${activeMetric === "views" ? "text-white" : "text-zinc-600"}`}>
              {currentStats.views.total}
            </div>
            <p className={`text-xs font-medium mt-1 ${activeMetric === "views" ? "text-emerald-400" : "text-zinc-700"}`}>
              {currentStats.views.change}
            </p>
          </button>

          {/* Watch Time Tab */}
          <button 
            type="button"
            onClick={() => setActiveMetric("watchTime")}
            className={`relative p-5 md:p-6 text-left transition-all cursor-pointer border-r border-white/5 ${
              activeMetric === "watchTime" ? "bg-[#121214] md:bg-[#09090b]" : "bg-transparent hover:bg-white/[0.04]"
            }`}
          >
            {activeMetric === "watchTime" && <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                    <span className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 block ${activeMetric === "watchTime" ? "text-zinc-200" : "text-zinc-600"}`}>{t("tabWatchTime")}</span>
                    <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${activeMetric === "watchTime" ? "text-white" : "text-zinc-600"}`}>
              {currentStats.watchTime.total}
            </div>
            <p className={`text-xs font-medium mt-1 ${activeMetric === "watchTime" ? "text-emerald-400" : "text-zinc-700"}`}>
              {currentStats.watchTime.change}
            </p>
          </button>

          {/* Subscribers Tab */}
          <button 
            type="button"
            onClick={() => setActiveMetric("subscribers")}
            className={`relative p-5 md:p-6 text-left transition-all cursor-pointer border-r border-white/5 ${
              activeMetric === "subscribers" ? "bg-[#121214] md:bg-[#09090b]" : "bg-transparent hover:bg-white/[0.04]"
            }`}
          >
            {activeMetric === "subscribers" && <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                    <span className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 block ${activeMetric === "subscribers" ? "text-zinc-200" : "text-zinc-600"}`}>{t("tabFollowers")}</span>
                    <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${activeMetric === "subscribers" ? "text-white" : "text-zinc-600"}`}>
              {currentStats.subscribers.total}
            </div>
            <p className={`text-xs font-medium mt-1 ${activeMetric === "subscribers" ? "text-emerald-400" : "text-zinc-700"}`}>
              {currentStats.subscribers.change}
            </p>
          </button>

          {/* Stars Tab */}
          <button 
            type="button"
            onClick={() => setActiveMetric("stars")}
            className={`relative p-5 md:p-6 text-left transition-all cursor-pointer ${
              activeMetric === "stars" ? "bg-[#121214] md:bg-[#09090b]" : "bg-transparent hover:bg-white/[0.04]"
            }`}
          >
            {activeMetric === "stars" && <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />}
                    <span className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 block ${activeMetric === "stars" ? "text-zinc-200" : "text-zinc-600"}`}>{t("tabStars")}</span>
                    <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${activeMetric === "stars" ? "text-white" : "text-zinc-600"}`}>
              {currentStats.stars.total}
            </div>
            <p className={`text-xs font-medium mt-1 ${activeMetric === "stars" ? "text-amber-400" : "text-zinc-700"}`}>
              ≈ {currentStats.stars.mmk}
            </p>
          </button>
        </div>

        {/* Chart Area */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-4">
            <div>
              <h2 className="text-lg font-bold text-white capitalize">
                    {currentMetricConfig.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">{t("chartSubtitlePrefix")} {timeRange.toLowerCase()} {t("chartSubtitleSuffix")}</p>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentMetricConfig.color }}></span> {t("yourChannel")}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span> {t("platformAvg")}
                  </span>
                </div>
          </div>

          {/* SVG Chart Graphic & HTML Overlay Tracking Engine */}
          <div 
            className="h-56 sm:h-72 w-full relative select-none touch-none cursor-crosshair"
            onMouseMove={handleChartInteraction}
            onTouchStart={handleChartInteraction}
            onTouchMove={handleChartInteraction}
            onMouseLeave={() => setHoveredPointIndex(null)}
            onTouchEnd={() => setHoveredPointIndex(null)}
          >
            <svg 
              className="w-full h-full overflow-visible pointer-events-none" 
              viewBox="0 0 800 200" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={currentMetricConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={currentMetricConfig.color} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={currentMetricConfig.color} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Background Reference Grid */}
              <line x1="0" y1="40" x2="800" y2="40" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="90" x2="800" y2="90" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="140" x2="800" y2="140" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="190" x2="800" y2="190" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />

              {/* Background Platform Average Curve */}
              <path
                d="M 0,180 Q 200,165 400,150 T 800,130"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.15"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Dynamic Gradient Area */}
              <path
                d={chartData.areaD}
                fill={`url(#${currentMetricConfig.gradientId})`}
                className="transition-all duration-300 ease-in-out"
              />

              {/* Dynamic Stroke Line */}
              <path
                d={chartData.pathD}
                fill="none"
                stroke={currentMetricConfig.color}
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-300 ease-in-out"
              />
            </svg>

            {/* HTML Overlay for Tooltip & Hover Dot (SVG Aspect Ratio ကြောင့် ပုံမပျက်စေရန် အပြင်မှ HTML ဖြင့် အုပ်ထားခြင်း) */}
            {activeHoverPoint && (
              <>
                {/* Vertical Guide Line */}
                <div 
                  className="absolute top-0 bottom-0 w-px border-l border-white/30 border-dashed pointer-events-none"
                  style={{ left: `${(activeHoverPoint.x / 800) * 100}%` }}
                />
                
                {/* Active Point Dot */}
                <div 
                  className="absolute w-3.5 h-3.5 rounded-full border-[2.5px] border-[#09090b] pointer-events-none shadow-sm"
                  style={{
                    left: `calc(${(activeHoverPoint.x / 800) * 100}% - 7px)`,
                    top: `calc(${(activeHoverPoint.y / 200) * 100}% - 7px)`,
                    backgroundColor: currentMetricConfig.color,
                  }}
                />

                {/* Tooltip Card (Standard HTML Box) */}
                <div 
                  className="absolute z-20 pointer-events-none bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-1.5 shadow-2xl flex flex-col items-center justify-center min-w-[90px]"
                  style={{
                    left: `${Math.max(12, Math.min(88, (activeHoverPoint.x / 800) * 100))}%`,
                    top: `calc(${Math.max(0, (activeHoverPoint.y / 200) * 100)}% - 16px)`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <span className="text-[10px] font-semibold text-zinc-400 leading-none mb-1.5">{activeHoverPoint.label}</span>
                  <span className="text-[13px] font-bold text-white leading-none tracking-tight">{activeHoverPoint.val}</span>
                </div>
              </>
            )}
          </div>

          {/* Time Labels with Exact Mathematical Spacing (Responsive Font for Mobile) */}
          <div className="relative w-full h-8 text-[9px] sm:text-[11px] font-semibold text-zinc-500 pt-4">
            {chartData.axisIndices.map((idx, i) => {
              const pt = chartData.points[idx];
              if (!pt) return null;
              
              // Date Text ကို သက်ဆိုင်ရာ Index ရဲ့ Percentage နေရာ အတိအကျမှာ နေရာချခြင်း
              const pct = (idx / (chartData.points.length - 1)) * 100;
              const isFirst = i === 0;
              const isLast = i === chartData.axisIndices.length - 1;

              return (
                <span
                  key={`axis-${idx}`}
                  className={`absolute top-4 ${isFirst ? "left-0" : isLast ? "right-0" : "-translate-x-1/2"}`}
                  style={!isFirst && !isLast ? { left: `${pct}%` } : undefined}
                >
                  {pt.label}
                </span>
              );
            })}

            {/* Hover ပြုလုပ်သည့်အခါ ထောက်ထားသော ရက်စွဲတည့်တည့်တွင် မျဉ်းနှင့်အတူ လိုက်ပေါ်မည့် Active Pill */}
            {activeHoverPoint && hoveredPointIndex !== null && (
              <span
                className="absolute top-3 px-2.5 py-1 rounded bg-zinc-800 text-white text-[11px] font-bold border border-white/20 -translate-x-1/2 z-20 pointer-events-none shadow-md shadow-black"
                style={{ left: `${(hoveredPointIndex / (chartData.points.length - 1)) * 100}%` }}
              >
                {activeHoverPoint.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Deep Analytics: Realtime, Retention, Funnel - Calendar အလိုက် အပြောင်းအလဲများ သက်ရောက်ခြင်း */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        
        {/* Realtime 48h Pulse with Live Ticker */}
        <div className="bg-[#121214] md:bg-[#09090b] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {t("liveFeed")}
              </h2>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm font-bold">
              {t("liveBadge")}
            </span>
          </div>
          
          <div className="mb-4">
            <div className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-300 ${
              isLivePulsing ? "text-emerald-400" : "text-white"
            }`}>
              {liveViews.toLocaleString()}
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span>{t("liveViews")}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">{t("updatingLive")}</span>
            </p>
          </div>

          {/* Miniature 48h Bar Chart with Active Growing Leading Bar */}
          <div className="flex-1 flex items-end justify-between gap-1 h-24 sm:h-28 w-full mt-auto mb-2 border-b border-white/10 pb-2">
            {liveBars.map((h, i) => {
              const isLatest = i === liveBars.length - 1;
              return (
                <div 
                  key={i} 
                  title={`Hour ${i + 1}: ${Math.round(h * 15)} views`}
                  className={`w-full rounded-sm transition-all duration-500 cursor-pointer ${
                    isLatest 
                      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" 
                      : i >= 20 
                        ? "bg-emerald-500/80 hover:bg-emerald-300" 
                        : "bg-zinc-800 hover:bg-zinc-600"
                  }`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
          
          <div className="flex justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            <span>{t("past48h")}</span>
            <span className="text-emerald-400 font-bold">{t("justNow")}</span>
          </div>
        </div>

        {/* Audience Retention Curve */}
        <div className="bg-[#121214] md:bg-[#09090b] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <div>
               <h2 className="text-sm font-semibold text-white mb-1">{t("audienceRetention")}</h2>
               <p className="text-xs text-zinc-500">{t("retentionSubtitle")}</p>
             </div>
          </div>

          {/* Retention SVG & HTML Overlays */}
          <div className="flex-1 h-32 w-full relative mb-4">
             
             {/* Text Labels (SVG အပြင်ဘက်သို့ HTML အဖြစ် ထုတ်ထားသဖြင့် ပုံမပျက်တော့ပါ) */}
             <div className="absolute left-0 top-[10%] -translate-y-full pb-1 text-[10px] font-semibold text-zinc-500 pointer-events-none">100%</div>
             <div className="absolute left-0 top-[50%] -translate-y-full pb-1 text-[10px] font-semibold text-zinc-500 pointer-events-none">50%</div>

             <svg className="w-full h-full block" viewBox="0 0 400 150" preserveAspectRatio="none">
               {/* Reference Grids */}
               <line x1="0" y1="15" x2="400" y2="15" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="3 3" strokeWidth="1" />
               <line x1="0" y1="75" x2="400" y2="75" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="3 3" strokeWidth="1" />
               
               {/* Ideal Curve (Faint) */}
               <path d="M 0,15 Q 100,20 400,60" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="4 4" />
               
               {/* Actual Retention Curve (အမှတ် 45,60 ပေါ်သို့ အတိအကျ ဖြတ်သွားစေရန် သင်္ချာနည်းကျ တွက်ချက်ထားသော မျဉ်းကွေး) */}
               <path 
                 d="M 0,15 C 20,15 25,60 45,60 C 120,60 250,90 400,105" 
                 fill="none" 
                 stroke="#3B82F6" 
                 strokeWidth="3" 
                 strokeLinecap="round" 
               />
             </svg>

             {/* Intro Drop HTML Dot & Text (X: 11.25%, Y: 40% အတိအကျ နေရာချထားခြင်း) */}
             <div 
               className="absolute w-2.5 h-2.5 rounded-full border-[2px] border-[#09090b] bg-blue-500 shadow-sm pointer-events-none"
               style={{ left: "calc(11.25% - 5px)", top: "calc(40% - 5px)" }}
             />
             <div 
               className="absolute text-[10px] font-semibold text-zinc-300 pointer-events-none"
               style={{ left: "11.25%", top: "calc(40% + 8px)", transform: "translateX(-50%)" }}
             >
               {t("introDrop")}
             </div>
          </div>

          <div className="bg-[#1c1c1f] md:bg-[#121214] border border-white/10 md:border-white/5 rounded-lg p-3 sm:p-4 flex justify-between items-center mt-auto">
             <span className="text-[11px] sm:text-xs font-semibold text-zinc-400">{t("avgWatchTime")}</span>
             <span className="font-bold text-white text-xs sm:text-sm">{currentStats.retention.avg} <span className="text-[10px] sm:text-[11px] text-emerald-500 font-semibold ml-1">({currentStats.retention.pct})</span></span>
          </div>
        </div>

        {/* Monetization Conversion (Platform Business Logic အစစ်အမှန်) */}
        <div className="bg-[#121214] md:bg-[#09090b] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <div>
               <h2 className="text-sm font-semibold text-white mb-1">{t("monetization")}</h2>
               <p className="text-[10px] sm:text-[11px] text-zinc-500">{t("monetizationSubtitle")}</p>
             </div>
          </div>

          <div className="space-y-3 mt-auto">
             {/* Base: Total Views */}
             <div className="relative h-10 sm:h-11 bg-[#1c1c1f] md:bg-[#121214] border border-white/10 md:border-white/5 rounded-lg flex items-center justify-between px-3 sm:px-4 overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-white/5 w-full" />
                <div className="relative z-10 flex items-center gap-2.5">
                   <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
                   <span className="text-[11px] sm:text-xs font-semibold text-zinc-300">{t("funnelTotalViews")}</span>
                </div>
                <span className="relative z-10 font-bold text-white text-xs sm:text-sm">{currentStats.funnel.views}</span>
             </div>

             {/* Split A: Premium Views (Parallel Branch) */}
             <div className="relative h-10 sm:h-11 bg-[#1c1c1f] md:bg-[#121214] border border-white/10 md:border-white/5 rounded-lg flex items-center justify-between px-3 sm:px-4 overflow-hidden mx-2">
                <div className="absolute top-0 left-0 h-full bg-purple-500/20 w-[15%]" />
                <div className="relative z-10 flex items-center gap-2.5">
                   <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                   <span className="text-[11px] sm:text-xs font-semibold text-zinc-300">
                     {t("funnelPremiumViews")} 
                     <span className="hidden sm:inline text-zinc-500 font-medium ml-1.5">{t("revShare80")}</span>
                   </span>
                </div>
                <div className="relative z-10 flex items-center gap-3">
                   <span className="text-[10px] sm:text-[11px] font-bold text-purple-500">15%</span>
                   <span className="font-bold text-white text-xs sm:text-sm">{currentStats.funnel.premium}</span>
                </div>
             </div>

             {/* Split B: Star Tippers (Parallel Branch) */}
             <div className="relative h-10 sm:h-11 bg-[#1c1c1f] md:bg-[#121214] border border-white/10 md:border-white/5 rounded-lg flex items-center justify-between px-3 sm:px-4 overflow-hidden mx-2">
                <div className="absolute top-0 left-0 h-full bg-amber-500/20 w-[2.5%]" />
                <div className="relative z-10 flex items-center gap-2.5">
                   <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                   <span className="text-[11px] sm:text-xs font-semibold text-zinc-300">
                     {t("funnelStarTippers")} 
                     <span className="hidden sm:inline text-zinc-500 font-medium ml-1.5">{t("revShare97")}</span>
                   </span>
                </div>
                <div className="relative z-10 flex items-center gap-3">
                   <span className="text-[10px] sm:text-[11px] font-bold text-amber-500">2.5%</span>
                   <span className="font-bold text-white text-xs sm:text-sm">{currentStats.funnel.stars}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 5. Demographics & Traffic - Calendar အလိုက် Views အရေအတွက်များ တိုက်ရိုက်သက်ရောက်ခြင်း */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: Top Geographies */}
        <div className="bg-[#121214] md:bg-[#09090b] border border-white/10 rounded-xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-white">{t("topGeo")}</h2>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t("viewShare")}</span>
          </div>

          <div className="space-y-4">
            {currentStats.geo.map((item) => (
              <div key={item.country} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="font-medium text-zinc-300 flex items-center gap-2">
                    <span className="text-sm leading-none">{item.flag}</span>
                    <span className="truncate">{item.country}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500">{item.views}</span>
                    <span className="font-bold text-white w-8 text-right text-xs">{item.percent}%</span>
                  </div>
                </div>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-zinc-400 transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Traffic Sources */}
        <div className="bg-[#121214] md:bg-[#09090b] border border-white/10 rounded-xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-sm font-semibold text-white">{t("trafficSources")}</h2>
             <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t("sourceShare")}</span>
          </div>

          <div className="space-y-4">
            {currentStats.traffic.map((source) => (
              <div key={source.source} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="font-medium text-zinc-300 truncate">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500">{source.count}</span>
                    <span className="font-bold text-white w-8 text-right text-xs">{source.percent}%</span>
                  </div>
                </div>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-zinc-400 transition-all duration-500"
                    style={{ width: `${source.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}