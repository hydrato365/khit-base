"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { 
  Layers, 
  List, 
  LayoutGrid, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  CheckCircle2, 
  Copy, 
  Pencil, 
  Trash2, 
  Crown, 
  Eye, 
  Star,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface VideoItem {
  id: string;
  title: string;
  desc: string;
  duration: string;
  category: string;
  status: string;
  date: string;
  views: string;
  stars: string;
  isVip: boolean;
  thumbGradient: string;
}

const categories = ["All", "Movie Recap", "News & Politics", "Comic", "Audiobooks"];

interface ContentViewProps {
  initialVideos: VideoItem[];
}

export function ContentView({ initialVideos }: ContentViewProps) {
  const t = useTranslations("Content");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = initialVideos.filter((video) => {
    const matchesCategory = activeCategory === "All" || video.category === activeCategory;
    const matchesSearch = 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100 max-w-[1500px]">
      
      {/* ၁။ Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {t("title")}
            </h1>
          </div>
          {/* Inspect ပုံထဲအတိုင်း: text-xs sm:text-sm text-[#AAAAAA] mt-1 */}
          <p className="text-xs sm:text-sm text-[#AAAAAA] mt-1">
            {t("subtitle")}
          </p>
        </div>

        {/* Right Side: Toggle Buttons & Upload Video */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#18181A] border border-zinc-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition cursor-pointer ${
                viewMode === "list" ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20" : "text-zinc-400 hover:text-white"
              }`}
              title="Table view button"
              aria-label="Table view button"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition cursor-pointer ${
                viewMode === "grid" ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20" : "text-zinc-400 hover:text-white"
              }`}
              title="Grid view button"
              aria-label="Grid view button"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Upload Video Button */}
          <Button className="h-9 sm:h-10 px-3.5 sm:px-4 bg-[#8c1cff] hover:bg-[#7a12e6] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-md shadow-[#8c1cff]/20 transition-colors cursor-pointer">
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t("uploadVideo")}</span>
          </Button>
        </div>
      </div>

      {/* ၂။ Search & Category Filter Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {/* Search Input Box */}
        <div className="relative w-full sm:flex-1 sm:min-w-[260px] sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-[#18181A] border border-zinc-800 rounded-xl pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 w-[calc(100%+2rem)] -mx-4 px-4 sm:w-auto sm:mx-0 sm:px-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                    : "bg-[#18181A] border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter Icon & Status Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto justify-between sm:justify-start">
          <button className="p-2.5 rounded-lg bg-[#18181A] border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <div className="relative">
            <button className="h-10 px-3.5 rounded-xl bg-[#18181A] border border-zinc-800 text-xs font-semibold text-zinc-300 flex items-center gap-2 hover:border-zinc-700 cursor-pointer">
              <span>{t("allStatuses")}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Showing Count */}
      <div className="text-xs sm:text-sm text-[#AAAAAA]">
        {t("showing")} <span className="font-bold text-white">{filteredVideos.length}</span> {t("of")} <span className="font-bold text-white">{initialVideos.length}</span> {t("videos")}
      </div>

      {/* ၃။ VIEW MODE (၁) - LIST VIEW */}
      {viewMode === "list" && (
        <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Desktop Table View (Tablet နှင့် အထက်တွင်သာ ပေါ်မည်) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-zinc-800/80 bg-zinc-900/30 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-5">{t("tableVideo")}</th>
                  <th className="py-3 px-4 w-36">{t("tableCategory")}</th>
                  <th className="py-3 px-4 w-32">{t("tableStatus")}</th>
                  <th className="py-3 px-4 w-32">{t("tableDate")}</th>
                  <th className="py-3 px-4 w-28">{t("tableViews")}</th>
                  <th className="py-3 px-4 w-36">{t("tableStars")}</th>
                  <th className="py-3 px-5 w-32 text-right">{t("tableActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-xs sm:text-sm font-medium">
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-zinc-900/40 transition-colors">
                    {/* Video Column */}
                    <td className="py-4 px-5">
                      <div className="flex gap-4 items-start max-w-md">
                        {/* Thumbnail */}
                        <div className={`relative w-28 h-16 rounded-lg bg-gradient-to-tr ${video.thumbGradient} border border-zinc-800 shrink-0 flex items-center justify-center overflow-hidden`}>
                          <span className="absolute bottom-1 right-1 bg-black/85 text-[10px] font-bold text-white px-1 rounded">
                            {video.duration}
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <div className="space-y-1 overflow-hidden">
                          <h3 className="font-bold text-white text-sm truncate cursor-pointer hover:underline underline-offset-2">
                            {video.title}
                          </h3>
                          <p className="text-xs text-[#AAAAAA] line-clamp-2 leading-relaxed">
                            {video.desc}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-[#18181A] border border-zinc-800 text-xs font-semibold text-zinc-300">
                        {video.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t("statusReady")}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-zinc-400 text-xs">
                      {video.date}
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 whitespace-nowrap font-bold text-white text-sm">
                      {video.views}
                    </td>

                    {/* Stars Earned */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-extrabold text-amber-400 text-sm">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{video.stars}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/content/${video.id}/analytics`} title="Analytics" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                          <BarChart3 className="w-3.5 h-3.5" />
                        </Link>
                        <button title="Copy Link" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button title="Edit" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button title="Delete" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Compact List View (ဖုန်းများတွင်သာ Table အစား ပေါ်မည်) */}
          <div className="block md:hidden divide-y divide-zinc-800/50">
            {filteredVideos.map((video) => (
              <div key={video.id} className="p-4 flex flex-col gap-3 hover:bg-zinc-900/40 transition-colors">
                
                {/* 1. Thumbnail + Title Row */}
                <div className="flex gap-3 items-start">
                  <div className={`relative w-28 h-16 rounded-lg bg-gradient-to-tr ${video.thumbGradient} border border-zinc-800 shrink-0 flex items-center justify-center overflow-hidden`}>
                    <span className="absolute bottom-1 right-1 bg-black/85 text-[9px] font-bold text-white px-1 rounded">
                      {video.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">{video.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-zinc-500 font-medium">
                      <span>{video.date}</span>
                      <span>•</span>
                      <span className="truncate">{video.category}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Metrics Row */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {t("statusReady")}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-zinc-300">
                    <Eye className="w-3.5 h-3.5 text-zinc-500" /> {video.views}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-extrabold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {video.stars}
                  </div>
                </div>

                {/* 3. Action Buttons Row (Mobile Only) */}
                <div className="flex items-center justify-between gap-2 pt-3 mt-2 border-t border-zinc-800/50">
                  <Link href={`/content/${video.id}/analytics`} className="flex-1 py-2 rounded-lg bg-[#18181A] border border-zinc-800 text-zinc-400 hover:text-white active:bg-zinc-800 flex items-center justify-center cursor-pointer transition-colors">
                    <BarChart3 className="w-4 h-4" />
                  </Link>
                  <button className="flex-1 py-2 rounded-lg bg-[#18181A] border border-zinc-800 text-zinc-400 hover:text-white active:bg-zinc-800 flex items-center justify-center cursor-pointer transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-[#18181A] border border-zinc-800 text-zinc-400 hover:text-white active:bg-zinc-800 flex items-center justify-center cursor-pointer transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-[#18181A] border border-zinc-800 text-zinc-400 hover:text-red-400 active:bg-zinc-800 flex items-center justify-center cursor-pointer transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ၄။ VIEW MODE (၂) - GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className="bg-[#121214] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Thumbnail */}
                <div className={`relative w-full h-44 bg-gradient-to-tr ${video.thumbGradient} flex items-center justify-center overflow-hidden`}>
                  {/* Category Badge top-right */}
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[11px] font-bold text-zinc-200">
                    {video.category}
                  </span>

                  {/* Duration bottom-right */}
                  <span className="absolute bottom-2.5 right-2.5 bg-black/85 text-[11px] font-bold text-white px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                    {video.title}
                  </h3>
                  {/* Inspect ပုံထဲအတိုင်း: text-[#AAAAAA] */}
                  <p className="text-xs sm:text-sm text-[#AAAAAA] line-clamp-2 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer: Metrics & Actions */}
              <div className="p-4 pt-0 border-t border-zinc-800/60 mt-3 space-y-3">
                {/* Views & Stars */}
                <div className="flex items-center justify-between text-xs sm:text-sm pt-3">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                    <Eye className="w-4 h-4 text-zinc-500" />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center gap-1 font-extrabold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{video.stars}</span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t("statusReady")}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link href={`/content/${video.id}/analytics`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </Link>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}