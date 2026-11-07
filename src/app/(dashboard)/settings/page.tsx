"use client";

import React from "react";
import { ShieldCheck, FileText, Scale } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-[1000px] space-y-8 animate-fadeIn pb-16 text-zinc-100">
      
      {/* 1. Header */}
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          Settings & Preferences
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Review channel policies, monetization agreements, and guidelines.
        </p>
      </div>

      {/* 2. Platform Policies & Terms */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-medium text-white">Policies & Agreements</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Official guidelines, creator monetization rules, and terms of service.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-zinc-400" />
              <div>
                <p className="text-sm font-medium text-white">Creator Terms of Service</p>
                <p className="text-xs text-zinc-500">Legal agreements regarding your channel, content ownership, and streaming rights.</p>
              </div>
            </div>
            <span className="text-xs text-zinc-400 font-mono">v1.2</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <div>
                <p className="text-sm font-medium text-white">Monetization & Payout Policy</p>
                <p className="text-xs text-zinc-500">1 Star = 10 MMK conversion rates, minimum payout thresholds, and payout schedule.</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-medium">Active</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-4 h-4 text-zinc-400" />
              <div>
                <p className="text-sm font-medium text-white">Content & Community Guidelines</p>
                <p className="text-xs text-zinc-500">Standards on acceptable video recaps, copyright rules, and community safety.</p>
              </div>
            </div>
            <span className="text-xs text-zinc-400 font-mono">Updated</span>
          </div>
        </div>
      </div>

    </div>
  );
}