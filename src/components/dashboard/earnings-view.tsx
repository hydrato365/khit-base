"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  Wallet, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MessageSquareHeart,
  Coins,
  Crown,
  History,
  AlertCircle,
  X,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Supporters Data
const mockShoutouts = [
  { id: 1, name: "Aung Kyaw Moe", avatar: "bg-blue-600", stars: 1000, comment: "Next.js 15 သင်ခန်းစာ အရမ်းလင်းပါတယ်။ နောက်အပိုင်းတွေ ဆက်အားပေးနေပါမယ်!", video: "Next.js 15 Ep-1", time: "15m ago" },
  { id: 2, name: "Thiri Sandar", avatar: "bg-pink-600", stars: 500, comment: "ဒီနေ့ Live မှာ ရှင်းပြပေးတာ အရမ်းမိုက်ပါတယ်။ ကြိုးစားပါရှင် ❤️", video: "Live Q&A", time: "2h ago" },
  { id: 3, name: "Ko Min Htet", avatar: "bg-emerald-600", stars: 2500, comment: "Super clear explanation bro! Keep pushing.", video: "Full Stack RoadMap", time: "5h ago" },
  { id: 4, name: "Zayar Lin", avatar: "bg-purple-600", stars: 100, comment: "အသံပိုင်းလေး နည်းနည်းတိုးနေသလားလို့ဗျ။ အကြောင်းအရာကတော့ ရှယ်ပဲ။", video: "Next.js 15 Ep-1", time: "1d ago" },
  { id: 5, name: "May Myat Noe", avatar: "bg-rose-600", stars: 5000, comment: "Remote work guide လေး အရမ်းအသုံးဝင်ပါတယ်။ ကျေးဇူးအများကြီးတင်ပါတယ်။", video: "Freelance Guide", time: "2d ago" },
  { id: 6, name: "Kyaw Swar", avatar: "bg-amber-600", stars: 200, comment: "Keep it up bro!", video: "Next.js 15 Ep-1", time: "3d ago" },
  { id: 7, name: "Hsu Myat", avatar: "bg-indigo-600", stars: 1500, comment: "နောက်ထပ် React Native အပိုင်းလေးတွေ မျှော်နေပါတယ်ရှင့်။", video: "Full Stack RoadMap", time: "4d ago" },
];

// Mock Payout History
const payoutHistory = [
  { id: "TRX-8921", date: "Nov 01, 2026", method: "KBZPay", amount: "50,000 MMK", stars: 5000, status: "completed" },
  { id: "TRX-7432", date: "Oct 15, 2026", method: "WavePay", amount: "120,000 MMK", stars: 12000, status: "completed" },
];

export function EarningsView() {
  
  // Wallet Balances & Rates
  const ratePerStar = 10; // 1 Star = 10 MMK
  const minPayoutStars = 20000;
  
  const starsRevenue = 11000;
  const premiumRevenueStars = 3500;
  const totalStars = starsRevenue + premiumRevenueStars; // 14,500 Stars
  
  const payoutProgress = Math.min((totalStars / minPayoutStars) * 100, 100);

  // Form States
  const [withdrawAmount, setWithdrawAmount] = useState<number>(totalStars);
  const [selectedMethod, setSelectedMethod] = useState<"kpay" | "wavepay" | "usdt">("kpay");
  const [phoneOrWallet, setPhoneOrWallet] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Supporters Modal State
  const [isSupportersModalOpen, setIsSupportersModalOpen] = useState(false);
  const [supporterSearch, setSupporterSearch] = useState("");
  const [supporterFilter, setSupporterFilter] = useState<"recent" | "top">("recent");

  useEffect(() => {
    const bottomNav = document.querySelector('nav[aria-label="Bottom navigation"]') as HTMLElement | null;
    if (isSupportersModalOpen) {
      document.body.style.overflow = "hidden";
      if (bottomNav) bottomNav.style.display = "none";
    } else {
      document.body.style.overflow = "";
      if (bottomNav) bottomNav.style.display = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (bottomNav) bottomNav.style.display = "";
    };
  }, [isSupportersModalOpen]);

  // Quick Percentage Buttons
  const handlePercentClick = (percent: number) => {
    setWithdrawAmount(Math.floor((totalStars * percent) / 100));
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount < 1000) return; 
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setPhoneOrWallet("");
      setAccountName("");
    }, 3000);
  };

  const calculatedMMK = (withdrawAmount * ratePerStar).toLocaleString();

  return (
    <div className="space-y-8 max-w-[1500px] animate-fadeIn pb-12">
      
      {/* 1. Header Row (Minimalist) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
            Wallet & Revenue
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Manage your earnings from Premium Ad-Free viewers and direct Star tips.
          </p>
        </div>

        {/* Official Rate Tag - Clean style */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium self-start md:self-auto">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span>Official Rate: 1 Star = 10 MMK</span>
        </div>
      </div>

      {/* 2. Premium Sleek Metrics Cards */}
      {/* 
        Changes made from AI look: 
        - Removed heavy generic borders. Used border-white/5 
        - Removed colored boxes behind icons.
        - Used soft inset shadow for a "glass" embedded feel.
        - Switched from font-black to font-medium and tracking-tight for numbers (Apple style) 
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Available Balance */}
        <div className="relative flex flex-col p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
              Available Balance
            </span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-semibold text-white tracking-tight">
            {totalStars.toLocaleString()}
          </div>
          <p className="text-sm text-zinc-500 mt-1">
            ≈ {(totalStars * ratePerStar).toLocaleString()} MMK
          </p>
        </div>

        {/* Premium Revenue */}
        <div className="relative flex flex-col p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
              Premium Revenue
            </span>
            <Crown className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-semibold text-white tracking-tight flex items-baseline gap-1.5">
            {(premiumRevenueStars * ratePerStar).toLocaleString()} <span className="text-base text-zinc-600 font-normal">MMK</span>
          </div>
          <p className="text-sm text-zinc-500 mt-1">
            From Ad-Free viewers
          </p>
        </div>

        {/* Stars Revenue */}
        <div className="relative flex flex-col p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
              Stars Revenue
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-semibold text-white tracking-tight flex items-baseline gap-1.5">
            {(starsRevenue * ratePerStar).toLocaleString()} <span className="text-base text-zinc-600 font-normal">MMK</span>
          </div>
          <p className="text-sm text-zinc-500 mt-1">
            Direct fan tips
          </p>
        </div>

        {/* Payout Milestone */}
        <div className="relative flex flex-col p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                Payout Milestone
              </span>
            </div>
            <div className="text-xl font-medium text-white tracking-tight mb-3 flex items-baseline gap-1.5">
              {totalStars.toLocaleString()} <span className="text-sm text-zinc-500">/ {minPayoutStars.toLocaleString()}</span>
            </div>
          </div>
          <div>
            {/* Slimmer, more elegant progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-2">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${payoutProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500 font-medium">
              {payoutProgress.toFixed(1)}% to minimum payout
            </p>
          </div>
        </div>
      </div>

      {/* Khit Partner Program Eligibility Tracker */}
      <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-emerald-400" />
              Khit Partner Program
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Apply to earn from Premium Views (80% Rev Share) and Star Tips (97% Rev Share).
            </p>
          </div>
          {/* အကယ်၍ ၃၀ ယောက်စာရင်းထဲ ပါခဲ့လျှင် သို့မဟုတ် 200 ပြည့်ပြီး Application အောင်မြင်ခဲ့လျှင် */}
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            Active Partner
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Requirement 1: Views */}
          <div className="bg-[#121214] border border-white/5 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[100%] bg-emerald-500/5" />
            <div className="relative z-10 flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-zinc-300">Total Views</span>
              <span className="text-sm font-bold text-white">1.4M <span className="text-zinc-500 font-medium text-[11px]">/ 200</span></span>
            </div>
            <div className="relative z-10 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="relative z-10 text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Requirement met
            </p>
          </div>

          {/* Requirement 2: Followers */}
          <div className="bg-[#121214] border border-white/5 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[100%] bg-emerald-500/5" />
            <div className="relative z-10 flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-zinc-300">Total Followers</span>
              <span className="text-sm font-bold text-white">128,450 <span className="text-zinc-500 font-medium text-[11px]">/ 200</span></span>
            </div>
            <div className="relative z-10 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="relative z-10 text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Requirement met
            </p>
          </div>
        </div>

        {/* Action Button: 200 မပြည့်သေးလျှင် Disabled ဖြစ်နေမည်၊ ပြည့်လျှင် နှိပ်၍ရမည် */}
        <div className="mt-5 flex items-center justify-end">
          <Button disabled className="h-10 px-5 bg-zinc-800 text-zinc-400 font-semibold text-xs rounded-xl flex items-center gap-2">
            Applied Successfully
          </Button>
        </div>
      </div>

      {/* 3. Main Request Payout & History */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7): Request Payout Form */}
        <div className="xl:col-span-7 bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
            <div>
              <h2 className="text-lg font-medium text-white">
                Request Withdrawal
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Convert your wallet balance to MMK or USDT
              </p>
            </div>
          </div>

          {isSuccess ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              <h3 className="text-xl font-medium text-white">
                Payout Request Submitted
              </h3>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                Your payout of <span className="text-white font-medium">{calculatedMMK} MMK</span> via {selectedMethod.toUpperCase()} is being processed. It usually takes 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleWithdrawSubmit} className="space-y-8">
              
              {/* Alert Note - Soft UI */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Withdrawals are processed manually for security. Minimum withdrawal amount is <span className="text-zinc-200 font-medium">10,000 Stars (100,000 MMK)</span>.
                </p>
              </div>

              {/* Amount Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                    Withdrawal Amount (Stars)
                  </label>
                  <span className="text-xs font-medium text-zinc-400">
                    ≈ {calculatedMMK} MMK
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min={1000}
                    max={totalStars}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full h-12 bg-transparent border-b border-white/10 px-0 text-2xl font-medium text-white focus:outline-none focus:border-white transition-colors placeholder-zinc-700"
                  />
                </div>

                {/* Elegant Percentage Pills */}
                <div className="flex gap-2 mt-4">
                  {[
                    { label: "25%", val: 25 },
                    { label: "50%", val: 50 },
                    { label: "75%", val: 75 },
                    { label: "MAX", val: 100 },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => handlePercentClick(btn.val)}
                      className="px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5 text-[11px] font-medium text-zinc-400 transition-colors"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method - Stripe-like Radio Cards */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-3 block">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* KBZPay */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("kpay")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedMethod === "kpay"
                        ? "border-white/30 bg-white/[0.03]"
                        : "border-white/5 hover:bg-white/[0.02]"
                    }`}
                  >
                    <p className="text-sm font-medium text-white mb-1">KBZPay</p>
                    <p className="text-xs text-zinc-500">Instant transfer</p>
                  </button>

                  {/* WavePay */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("wavepay")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedMethod === "wavepay"
                        ? "border-white/30 bg-white/[0.03]"
                        : "border-white/5 hover:bg-white/[0.02]"
                    }`}
                  >
                    <p className="text-sm font-medium text-white mb-1">WavePay</p>
                    <p className="text-xs text-zinc-500">No fee payout</p>
                  </button>

                  {/* USDT */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("usdt")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedMethod === "usdt"
                        ? "border-white/30 bg-white/[0.03]"
                        : "border-white/5 hover:bg-white/[0.02]"
                    }`}
                  >
                    <p className="text-sm font-medium text-white mb-1">USDT</p>
                    <p className="text-xs text-zinc-500">TRC-20 Wallet</p>
                  </button>
                </div>
              </div>

              {/* Account Details - Clean Inputs */}
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 block">
                    {selectedMethod === "usdt" ? "USDT (TRC-20) Address" : "Phone Number"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={selectedMethod === "usdt" ? "TXXXXXXXXXXXXX..." : "09XXXXXXXXX"}
                    value={phoneOrWallet}
                    onChange={(e) => setPhoneOrWallet(e.target.value)}
                    className="w-full h-11 bg-[#121214] border border-white/10 rounded-lg px-4 text-sm font-medium text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 block">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Min Mahar"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full h-11 bg-[#121214] border border-white/10 rounded-lg px-4 text-sm font-medium text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button - Brand Primary Action */}
              <Button
                type="submit"
                className="w-full h-12 bg-[#8c1cff] hover:bg-[#7a12e6] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#8c1cff]/25 transition-colors"
              >
                <span>Confirm Withdrawal</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Button>
            </form>
          )}
        </div>

        {/* Right Column (5): Revenue Breakdown & History & Fan Feedback */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Revenue Breakdown (Clean Minimalist Style) */}
          <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <h3 className="text-sm font-medium text-white mb-5">Revenue Breakdown</h3>
            
            {/* Visual Bar - Slimmer */}
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden flex mb-5">
               <div style={{ width: `${(starsRevenue / totalStars) * 100}%` }} className="h-full bg-amber-500" />
               <div style={{ width: `${(premiumRevenueStars / totalStars) * 100}%` }} className="h-full bg-purple-400" />
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                     <div className="w-2 h-2 rounded-full bg-amber-500" />
                     <span className="text-zinc-400">Stars (Fan Tips)</span>
                  </div>
                  <span className="font-medium text-white">76%</span>
               </div>
               <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                     <div className="w-2 h-2 rounded-full bg-purple-400" />
                     <span className="text-zinc-400">Premium (Ads-Free)</span>
                  </div>
                  <span className="font-medium text-white">24%</span>
               </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-medium text-white">Recent Payouts</h3>
            </div>
            
            <div className="space-y-1">
              {payoutHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white mb-0.5">{item.amount}</p>
                    <p className="text-[11px] text-zinc-500">{item.method} • {item.date}</p>
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        {item.status}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Star Supporter Feed */}
          <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-medium text-white">Latest Supporters</h2>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-none">
              {mockShoutouts.slice(0, 3).map((fan) => (
                <div key={fan.id} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full ${fan.avatar} flex items-center justify-center text-[10px] font-medium text-white`}>
                        {fan.name.charAt(0)}
                      </div>
                      <p className="text-sm font-medium text-zinc-200">{fan.name}</p>
                    </div>
                    <div className="text-xs font-medium text-amber-500">
                      +{fan.stars.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 pl-8 leading-relaxed">"{fan.comment}"</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsSupportersModalOpen(true)}
              className="w-full mt-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              View All Supporters
            </button>
          </div>

        </div>
      </div>

      {/* All Supporters Modal */}
      {isSupportersModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#141416] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-100">
                    Star Supporters
                  </h2>
                  <p className="text-[11px] text-zinc-400">Total {mockShoutouts.length} amazing fans</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSupportersModalOpen(false)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search */}
            <div className="p-4 border-b border-zinc-800 space-y-3 bg-[#18181a]">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSupporterFilter("recent")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                    supporterFilter === "recent" ? "bg-amber-500 text-black border-amber-500" : "bg-transparent text-zinc-400 border-zinc-700 hover:text-white cursor-pointer"
                  }`}
                >
                  Recent
                </button>
                <button 
                  onClick={() => setSupporterFilter("top")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                    supporterFilter === "top" ? "bg-amber-500 text-black border-amber-500" : "bg-transparent text-zinc-400 border-zinc-700 hover:text-white cursor-pointer"
                  }`}
                >
                  Top Tippers
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search by name or video..."
                  value={supporterSearch}
                  onChange={(e) => setSupporterSearch(e.target.value)}
                  className="w-full bg-[#121214] border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
              {mockShoutouts
                .filter(fan => 
                  fan.name.toLowerCase().includes(supporterSearch.toLowerCase()) || 
                  fan.video.toLowerCase().includes(supporterSearch.toLowerCase())
                )
                .sort((a, b) => supporterFilter === "top" ? b.stars - a.stars : 0)
                .map((fan) => (
                <div key={fan.id} className="p-4 hover:bg-white/[0.02] rounded-xl transition-colors border-b border-white/5 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${fan.avatar} flex items-center justify-center text-xs font-bold text-white shadow-inner`}>
                        {fan.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">{fan.name}</p>
                        <p className="text-[10px] text-zinc-500">{fan.time} • on <span className="text-zinc-400">{fan.video}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-amber-500">{fan.stars.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300 pl-11 leading-relaxed">"{fan.comment}"</p>
                </div>
              ))}
              
              {/* Empty State */}
              {mockShoutouts.filter(fan => 
                  fan.name.toLowerCase().includes(supporterSearch.toLowerCase()) || 
                  fan.video.toLowerCase().includes(supporterSearch.toLowerCase())
                ).length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm text-zinc-500">No supporters found matching your search.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}