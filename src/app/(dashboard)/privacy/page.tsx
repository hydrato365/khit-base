"use client";

import React, { useState } from "react";
import { Lock, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function PrivacyPage() {
  const [lang, setLang] = useState<"my" | "en">("en"); // App Store ကြောင့် English ကို Default ထားပါသည်

  return (
    <div className="max-w-[900px] mx-auto space-y-6 animate-fadeIn pb-16 text-zinc-100">
      
      {/* Top Action Bar */}
      <div className="hidden md:flex items-center justify-between pb-2">
        <Link 
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <Button variant="outline" className="h-9 border-zinc-800 bg-[#121214] text-zinc-300 hover:text-white gap-2 rounded-lg text-xs">
          <Printer className="w-4 h-4" />
          Print Document
        </Button>
      </div>

      {/* Formal Document Container */}
      <div className="bg-[#121214] border border-zinc-800 rounded-lg shadow-2xl p-8 sm:p-12">
        
        {/* Corporate Letterhead */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/60">
          <BrandLogo />
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
            Legal & Compliance
          </span>
        </div>

        {/* Document Header */}
        <div className="text-center mb-10 pb-8 border-b border-zinc-800/80">
          <Lock className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm font-medium text-zinc-400">
            {lang === "my" 
              ? "သုံးစွဲသူများ၏ ကိုယ်ရေးကိုယ်တာ ဒေတာ အချက်အလက်များ လုံခြုံရေး မူဝါဒ" 
              : "Data Privacy, Collection, and Account Deletion Policy for Khit Platform"}
          </p>
          
          {/* Language Switcher */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-block bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-xs font-mono text-zinc-500">
              Effective Date: November 2026 | Ver: 1.0.0
            </div>
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  lang === "en" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("my")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  lang === "my" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                မြန်မာ
              </button>
            </div>
          </div>
        </div>

        {/* Document Body */}
        <div className="space-y-10 text-sm leading-loose text-zinc-300">
          
          {lang === "en" ? (
            <>
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">1.</span> Information We Collect
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    To provide and improve our services, Khit collects the following types of information: <br/>
                    <strong className="text-zinc-200">Personal Information:</strong> Name, email address, phone number (for KPay/WavePay payouts), and profile metadata when you register.<br/>
                    <strong className="text-zinc-200">Device & Usage Data:</strong> IP address, device type, operating system, and interaction metrics (watch-time, clicks) to calculate creator revenues.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">2.</span> How We Use Your Information
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    We do not sell your personal data to third-party advertisers. Your data is used exclusively to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                    <li>Authenticate your account and maintain platform security.</li>
                    <li>Process Stars purchases and execute revenue payouts (via KBZPay, WavePay, or USDT).</li>
                    <li>Analyze watch-time metrics to calculate 80% revenue share distributions.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">3.</span> Account Deletion & Data Erasure (User Rights)
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    In compliance with international App Store privacy guidelines, you have the absolute right to delete your account and request the erasure of your personal data at any time.
                  </p>
                  <p className="text-left leading-relaxed">
                    <strong className="text-zinc-200">How to request deletion:</strong> You may delete your account directly through the App Settings (Settings {">"} Privacy {">"} Delete Account) or by contacting our support team. Upon deletion, all associated personal data, viewing history, and wallet balances will be permanently erased from our active servers within 30 days, except where retention is legally required for financial compliance.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">4.</span> Third-Party Service Providers
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    We may share essential transactional data with third-party payment gateways (e.g., KBZPay, Wave Money, Crypto Networks) strictly for the purpose of processing your withdrawals and purchases. These providers are bound by strict confidentiality agreements.
                  </p>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၁။</span> ကောက်ယူမည့် အချက်အလက်များ
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    Khit ပလက်ဖောင်း ဝန်ဆောင်မှုများ ပေးအပ်နိုင်ရန် အောက်ပါ အချက်အလက်များကို ကောက်ယူပါသည် - <br/>
                    <strong className="text-zinc-200">ကိုယ်ရေး အချက်အလက် (Personal Info):</strong> အမည်၊ အီးမေးလ်၊ (ငွေထုတ်ယူရန်အတွက်) ဖုန်းနံပါတ် နှင့် ပရိုဖိုင် အချက်အလက်များ။<br/>
                    <strong className="text-zinc-200">စက်ပစ္စည်း အချက်အလက် (Device Data):</strong> IP လိပ်စာ၊ ဖုန်းအမျိုးအစား၊ ကြည့်ရှုသည့် ကြာချိန် (Watch-time) နှင့် ကလစ်နှိပ်မှု မှတ်တမ်းများ။
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၂။</span> အချက်အလက်များ အသုံးပြုပုံ
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    သုံးစွဲသူများ၏ အချက်အလက်များကို ပြင်ပ ကြော်ငြာကုမ္ပဏီများထံ လုံးဝ (လုံးဝ) ရောင်းချမည် မဟုတ်ပါ။ အောက်ပါ ကိစ္စရပ်များအတွက်သာ အသုံးပြုပါသည်-
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                    <li>အကောင့်လုံခြုံရေးနှင့် ဝင်ရောက်မှုများ စစ်ဆေးရန်။</li>
                    <li>Stars ဝယ်ယူခြင်းနှင့် ငွေထုတ်ယူခြင်း (KPay, WavePay, USDT) လုပ်ငန်းစဉ်များ ဆောင်ရွက်ရန်။</li>
                    <li>ဖန်တီးသူများအား ၈၀% ဝင်ငွေခွဲဝေပေးနိုင်ရန် ကြည့်ရှုချိန် (Watch-time) တွက်ချက်ရန်။</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၃။</span> အကောင့်ဖျက်သိမ်းခြင်းနှင့် ဒေတာ ဖျက်ပစ်ခွင့် (Account Deletion)
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    နိုင်ငံတကာ App Store များ၏ ကိုယ်ရေးကိုယ်တာ လုံခြုံမှု စံနှုန်းများနှင့်အညီ၊ သုံးစွဲသူများသည် မိမိ၏ အကောင့်နှင့်တကွ ဒေတာများအားလုံးကို အချိန်မရွေး ဖျက်ပစ်ရန် တောင်းဆိုခွင့် (Right to Erasure) အပြည့်အဝ ရှိသည်။
                  </p>
                  <p className="text-left leading-relaxed">
                    <strong className="text-zinc-200">ဖျက်သိမ်းရန် နည်းလမ်း -</strong> App ၏ Settings {">"} Privacy {">"} Delete Account မှတစ်ဆင့် ကိုယ်တိုင် ဖျက်သိမ်းနိုင်သည်။ အကောင့်ဖျက်သိမ်းလိုက်ပါက သုံးစွဲသူ၏ ကိုယ်ရေးအချက်အလက်များ၊ ကြည့်ရှုမှု မှတ်တမ်းများနှင့် Wallet ထဲရှိ လက်ကျန်ငွေများ အားလုံးကို ရက်ပေါင်း ၃၀ အတွင်း ဆာဗာမှ အပြီးအပိုင် ဖျက်သိမ်းပေးမည် ဖြစ်သည်။
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၄။</span> ပြင်ပ ဝန်ဆောင်မှုပေးသူများ (Third-Party Services)
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    ငွေပေးချေမှုနှင့် ထုတ်ယူမှု လုပ်ငန်းစဉ်များ အောင်မြင်စွာ ဆောင်ရွက်နိုင်ရန်အတွက် သက်ဆိုင်ရာ ငွေရေးကြေးရေး အဖွဲ့အစည်းများ (ဥပမာ - KBZPay, Wave Money, Crypto Networks) ထံသို့ မရှိမဖြစ် လိုအပ်သော ငွေလွှဲပြောင်းမှု ဒေတာများကိုသာ မျှဝေမည် ဖြစ်သည်။
                  </p>
                </div>
              </section>
            </>
          )}

        </div>

        {/* Document Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Official Khit Privacy Document</span>
          </div>
          <p>© 2026 Khit Platform. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}