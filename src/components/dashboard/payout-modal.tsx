"use client";

import React, { useState } from "react";
import { X, Star, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsBalance: number;
}

export function PayoutModal({ isOpen, onClose, starsBalance }: PayoutModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"kpay" | "wavepay">("kpay");
  const [starsToCash, setStarsToCash] = useState<number>(starsBalance);
  const [phone, setPhone] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // 1 Star = 10 MMK Rate
  const ratePerStar = 10;
  const calculatedMMK = (starsToCash * ratePerStar).toLocaleString();

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#141416] border border-zinc-800 rounded-2xl shadow-2xl p-6 text-zinc-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100">
                Stars Payout
              </h2>
              <p className="text-[11px] text-zinc-400">1 Star = 10 MMK</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
            <h3 className="text-lg font-bold text-white">
              Payout Requested!
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs">
              Funds will be transferred to your account within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-4 pt-4">
            {/* Stars to Cash Calculation Card */}
            <div className="bg-[#1b1b1e] border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400">
                  You will receive (MMK)
                </p>
                <p className="text-2xl font-black text-amber-400 tracking-tight mt-0.5">
                  {calculatedMMK} <span className="text-xs text-zinc-300 font-normal">Ks</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400">
                  Balance:
                </span>
                <p className="text-xs font-semibold text-zinc-200">
                  {starsBalance.toLocaleString()} ⭐
                </p>
              </div>
            </div>

            {/* Payment Method Selector (KPay vs WavePay) */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-2 block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* KPay */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod("kpay")}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    selectedMethod === "kpay"
                      ? "border-blue-500 bg-blue-500/10 text-white shadow-sm"
                      : "border-zinc-800 bg-[#18181a] text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                    K
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-none">KBZPay</p>
                    <p className="text-[10px] text-zinc-500 mt-1">KPay Wallet</p>
                  </div>
                </button>

                {/* WavePay */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod("wavepay")}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    selectedMethod === "wavepay"
                      ? "border-yellow-500 bg-yellow-500/10 text-white shadow-sm"
                      : "border-zinc-800 bg-[#18181a] text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-yellow-400 text-zinc-950 font-extrabold text-xs flex items-center justify-center">
                    W
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-none">WavePay</p>
                    <p className="text-[10px] text-zinc-500 mt-1">Wave Money</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-zinc-300 mb-1 block">
                  {selectedMethod === "kpay" ? "KPay" : "WavePay"} Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="09XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#18181a] border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 mb-1 block">
                  Account Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="U Kyaw Kyaw"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full bg-[#18181a] border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Payout processed via encrypted secure channel
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold h-10 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Confirm Cash Out</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}