"use client";

import React, { useState } from "react";
import { Scale, FileText, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function PoliciesPage() {
  const [lang, setLang] = useState<"my" | "en">("my");

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
        
        {/* Corporate Letterhead (Brand Logo) */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/60">
          <BrandLogo />
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
            Legal & Compliance
          </span>
        </div>

        {/* Document Header */}
        <div className="text-center mb-10 pb-8 border-b border-zinc-800/80">
          <Scale className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Khit Platform Monetization & Community Policies
          </h1>
          <p className="text-sm font-medium text-zinc-400">
            {lang === "my" 
              ? "Khit ပလက်ဖောင်း၏ ဝင်ငွေခွဲဝေမှုနှင့် အသိုင်းအဝိုင်းဆိုင်ရာ တရားဝင် မူဝါဒများ" 
              : "Official monetization, payout, and community standards for Khit.to"}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-block bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-xs font-mono text-zinc-500">
              Effective Date: November 2026 | Ver: 1.0.0
            </div>
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang("my")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  lang === "my" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                မြန်မာ
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  lang === "en" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Document Body (Legal Format) */}
        <div className="space-y-10 text-sm leading-loose text-zinc-300">
          
          {lang === "my" ? (
            <>
              {/* Clause 1 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၁။</span> အခြေခံ သတ်မှတ်ချက်များ (General Provisions)
                </h2>
                <p className="text-left leading-relaxed">
                  ဤမူဝါဒသည် Khit ပလက်ဖောင်းပေါ်တွင် အကြောင်းအရာ ဖန်တီးသူများ (Creators) အနေဖြင့် ဝင်ငွေရှာဖွေခြင်း၊ ငွေထုတ်ယူခြင်းနှင့် အကြောင်းအရာများ တင်ဆက်ခြင်းတို့အတွက် မပျက်မကွက် လိုက်နာရမည့် တရားဝင် သတ်မှတ်ချက်များ ဖြစ်သည်။ ဤပလက်ဖောင်းအား အသုံးပြုခြင်းဖြင့် ဖန်တီးသူများသည် အောက်ပါ စည်းမျဉ်းစည်းကမ်းများကို သဘောတူညီပြီးဖြစ်သည်ဟု မှတ်ယူမည်ဖြစ်သည်။
                </p>
              </section>

              {/* Clause 2 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၂။</span> ဝင်ငွေခွဲဝေမှု မူဝါဒ (Monetization & Revenue Share Policy)
                </h2>
                
                <div className="pl-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-zinc-200">၂.၁။ တိုက်ရိုက် လက်ဆောင်ပေးစနစ် (Star Tips)</h3>
                    <p className="text-left leading-relaxed">
                      Khit ပလက်ဖောင်းသည် ဖန်တီးသူများအတွက် အမြင့်မားဆုံး အကျိုးခံစားခွင့်ကို ပေးစွမ်းနိုင်ရန် ရည်ရွယ်၍ Star လက်ဆောင်များမှ ရရှိသော ဝင်ငွေအား အောက်ပါအတိုင်း ခွဲဝေ သတ်မှတ်ထားသည်-
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                      <li><strong className="text-zinc-200">၉၇ ရာခိုင်နှုန်း (97%)</strong> အား ဖန်တီးသူ (Creator) မှ အပြည့်အဝ ခံစားခွင့်ရှိသည်။</li>
                      <li><strong className="text-zinc-200">၃ ရာခိုင်နှုန်း (3%)</strong> အား ပလက်ဖောင်း၏ နည်းပညာနှင့် ဝန်ဆောင်မှု ထိန်းသိမ်းစရိတ် (Platform Maintenance Fee) အဖြစ် Khit မှ ရယူမည်ဖြစ်သည်။</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-zinc-200">၂.၂။ ဝင်ငွေ ခွဲဝေမှု သတ်မှတ်ချက်နှင့် အကောင်အထည်ဖော်မည့် ကာလများ (Revenue Share & Phased Rollout)</h3>
                    <p className="text-left leading-relaxed">
                      ပလက်ဖောင်းပေါ်မှ ရရှိလာသော အသားတင် ဝင်ငွေများအား ဖန်တီးသူ (Creator) ၈၀%၊ သုံးစွဲသူ ကံစမ်းမဲ ရန်ပုံငွေ (User Pool) ၁၀% နှင့် ပလက်ဖောင်း လည်ပတ်မှုစရိတ် (Platform Fee) ၁၀% အချိုးဖြင့် အောက်ပါ ကာလအပိုင်းအခြားအတိုင်း အဆင့်လိုက် ခွဲဝေသွားမည် -
                    </p>
                    <div className="pl-4 space-y-3 text-zinc-300">
                      <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1">
                        <strong className="text-white block">(၁) ကနဦး မိတ်ဆက်ကာလ (ပထမ ၆ လအတွင်း / Phase 1: Launch Phase)</strong>
                        <p className="text-left leading-relaxed text-zinc-400">
                          ပလက်ဖောင်း စတင်လည်ပတ်သည့် ပထမ ၆ လအတွင်း ကြော်ငြာများ (Ads) လုံးဝ ထည့်သွင်းပြသမည် မဟုတ်ဘဲ အခပေး အကောင့်များ (Paid Subscriptions) ၏ စုစုပေါင်း အသားတင် ဝင်ငွေ ၈၀% အား ဖန်တီးသူများ၏ ကြည့်ရှုချိန် ကြာမြင့်မှု အချိုးအစား (Watch-time Proportion) အပေါ် မူတည်၍ အပြည့်အဝ ခွဲဝေပေးမည် ဖြစ်သည်။
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-3">
                        <strong className="text-white block">(၂) ဒုတိယအဆင့် အကောင်အထည်ဖော်မည့် ကာလ (၆ လပြည့်ပြီးနောက် / Phase 2: Ad Integration)</strong>
                        <p className="text-left leading-relaxed text-zinc-400">
                          ပလက်ဖောင်း သက်တမ်း ၆ လပြည့်ပါက အခမဲ့ ကြည့်ရှုသူများအတွက် ကြော်ငြာ (Ads) စနစ် စတင်ထည့်သွင်းမည် ဖြစ်ပြီး၊ နိုင်ငံတကာ စံနှုန်းအတိုင်း ဖန်တီးသူ၏ အကြောင်းအရာပေါ်တွင် အမှန်တကယ် ပြသနိုင်ခဲ့သော ကြော်ငြာ အကြိမ်ရေ ၁,၀၀၀ ပြသမှု နှုန်းထား (CPM Rate) အပေါ် အခြေခံ၍ အချိုးကျ စနစ်တကျ စာရင်းတွက်ချက်မည်ဖြစ်ကာ ရရှိလာသော အသားတင် ကြော်ငြာဝင်ငွေ၏ ၈၀ ရာခိုင်နှုန်း (80%) အား အဆိုပါ ဖန်တီးသူထံသို့ တိုက်ရိုက် ခွဲဝေပေးမည် ဖြစ်သည်။ (မှတ်ချက် - ဤကြော်ငြာစနစ်သည် ပလက်ဖောင်းမှ စတင်မိတ်ဆက်ကြောင်း တရားဝင် ကြေညာသည့် နေ့ရက်မှစ၍ အပြည့်အဝ စတင်အသက်ဝင်မည် ဖြစ်ပါသည်။)
                        </p>

                        <div className="pt-2 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
                          <strong className="text-zinc-200 block">ကြော်ငြာ ဝင်ငွေ တွက်ချက်မှုဆိုင်ရာ စည်းမျဉ်းများ (Ad Revenue Calculation & Exclusions) :</strong>
                          <p className="text-left leading-relaxed pl-2">
                            ၁။ ဝင်ငွေ ခွဲဝေတွက်ချက်ရာတွင် သုံးစွဲသူများ၏ အကြောင်းအရာ ကြည့်ရှုမှု အကြိမ်ရေ (Content/Video Views) အပေါ် အခြေခံမည် မဟုတ်ဘဲ၊ ပလက်ဖောင်း စနစ်မှတစ်ဆင့် သုံးစွဲသူ၏ မျက်နှာပြင်ပေါ်တွင် အမှန်တကယ် အောင်မြင်စွာ ပြသနိုင်ခဲ့သော "တရားဝင် ကြော်ငြာ ပြသမှု အကြိမ်ရေ" (Valid & Successfully Rendered Ad Impressions) အပေါ်တွင်သာ CPM နှုန်းထားဖြင့် အချိုးကျ စနစ်တကျ တွက်ချက်မည် ဖြစ်သည်။
                          </p>
                          <div className="pl-2 space-y-1">
                            <p className="text-left leading-relaxed">၂။ အောက်ပါ အခြေအနေများကြောင့် ကြော်ငြာ မပြသနိုင်ခဲ့သော ကြည့်ရှုမှုများအတွက် ဝင်ငွေ ထည့်သွင်းတွက်ချက်မည် မဟုတ်ပါ -</p>
                            <ul className="list-disc pl-5 space-y-0.5 text-zinc-500">
                              <li>သုံးစွဲသူဘက်မှ အင်တာနက်လိုင်း ချို့ယွင်းမှု သို့မဟုတ် ကြော်ငြာ Load မတက်မီ ကျော်သွားခြင်း၊ ပိတ်လိုက်ခြင်း။</li>
                              <li>ကြော်ငြာ ပိတ်ဆို့သည့် ဆော့ဖ်ဝဲလ်များ (Adblockers) အသုံးပြုထားခြင်း။</li>
                              <li>သက်ဆိုင်ရာ အချိန်နှင့် ဒေသအလိုက် ကိုက်ညီသော ကြော်ငြာရှင် မရှိခြင်း (Inventory / Fill Rate အခြေအနေ)။</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Clause 3 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၃။</span> ငွေထုတ်ယူခြင်းနှင့် ပြင်ပ ဝန်ဆောင်ခများ (Payout & Third-Party Fees)
                </h2>
                
                <div className="pl-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-zinc-200">၃.၁။ အနိမ့်ဆုံး ထုတ်ယူနိုင်သည့် ပမာဏ (Minimum Payout Threshold)</h3>
                    <p className="text-left leading-relaxed">
                      တရားဝင် သတ်မှတ်ထားသော ငွေလဲလှယ်နှုန်းမှာ <strong className="text-white">၁ Star လျှင် ၁၀ မြန်မာကျပ် (1 Star = 10 MMK)</strong> ဖြစ်သည်။ ဖန်တီးသူ၏ အကောင့်တွင် အနိမ့်ဆုံး <strong className="text-white">၂၀,၀၀၀ Stars (၂၀၀,၀၀၀ ကျပ်)</strong> ပြည့်မီမှသာလျှင် ငွေထုတ်ယူခွင့် (Payout Request) ပြုလုပ်နိုင်မည်ဖြစ်သည်။
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-zinc-200">၃.၂။ ပြင်ပ ဝန်ဆောင်ခများ ဖြတ်တောက်ခြင်း (Third-Party Transaction Fees)</h3>
                    <p className="text-left leading-relaxed">
                      Khit သည် ငွေထုတ်ယူခြင်း လုပ်ငန်းစဉ်အတွက် ပလက်ဖောင်း ဝန်ဆောင်ခ (Platform Fee) အပို ထပ်မံ ကောက်ခံမည် မဟုတ်ပါ။ သို့သော် ဖန်တီးသူမှ ရွေးချယ်သော ငွေထုတ်ယူသည့် နည်းလမ်းအပေါ် မူတည်၍ အောက်ပါ ပြင်ပ ကုန်ကျစရိတ်များကို <strong className="text-white underline underline-offset-4">ဖန်တီးသူ၏ ထုတ်ယူမည့် ငွေပမာဏထဲမှ အတိအကျ ခုနှိမ် ဖြတ်တောက်မည်</strong> ဖြစ်သည်-
                    </p>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3 mt-2">
                      <p className="text-left leading-relaxed text-zinc-400">
                        <strong className="text-zinc-200">(က) Cryptocurrency (USDT) ဖြင့် ထုတ်ယူပါက - </strong> 
                        Crypto ကွန်ရက်မှ ကောက်ခံသော Blockchain Network Fee (Gas Fee) အား ဖြတ်တောက်မည်။
                      </p>
                      <p className="text-left leading-relaxed text-zinc-400">
                        <strong className="text-zinc-200">(ခ) ပြည်တွင်း Wallets (KBZPay, WavePay စသည်) ဖြင့် ထုတ်ယူပါက - </strong> 
                        Crypto မှတစ်ဆင့် မြန်မာကျပ်ငွေသို့ ပြောင်းလဲရာတွင် ဖြစ်ပေါ်လာမည့် ဈေးကွက် ကွာဟချက် (P2P Exchange Slippage) နှင့် ပြည်တွင်း ကိုယ်စားလှယ်များ၏ ငွေလွှဲခ/ထုတ်ခ (Agent Fees) များအား အတိအကျ တွက်ချက် ခုနှိမ်သွားမည်ဖြစ်သည်။
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Clause 4 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၄။</span> အသိုင်းအဝိုင်းဆိုင်ရာ စည်းမျဉ်းများ (Community Guidelines)
                </h2>
                
                <div className="pl-6 space-y-4">
                  <p className="text-left leading-relaxed">
                    <strong className="text-zinc-200 block mb-1">၄.၁။ မူပိုင်ခွင့်နှင့် တရားမျှတစွာ အသုံးပြုခြင်း (Copyright & Fair Use)</strong>
                    ရုပ်ရှင် သို့မဟုတ် အခြားသော အကြောင်းအရာများကို ပြန်လည်သုံးသပ်ခြင်း (Review/Recap) ပြုလုပ်ရာတွင် နိုင်ငံတကာ Fair Use ဥပဒေများနှင့်အညီ ဖန်တီးရမည်။ မူရင်းကို ခိုးကူးခြင်း၊ အပြည့်အစုံ တိုက်ရိုက် ပြန်လည်တင်ဆက်ခြင်း (Piracy & Direct Re-uploading) များကို တင်းကြပ်စွာ တားမြစ်ထားသည်။ (မှတ်ချက် - တရားဝင် တိုင်ကြားမှု ရရှိလာပါက Khit မှ နိုင်ငံတကာ မူပိုင်ခွင့် ဥပဒေအတိုင်း အရေးယူ ဆောင်ရွက်သွားမည် ဖြစ်သည်။)
                  </p>
                  <p className="text-left leading-relaxed">
                    <strong className="text-zinc-200 block mb-1">၄.၂။ တားမြစ်ထားသော အကြောင်းအရာများနှင့် အရေးယူခြင်း (Prohibited Content & Enforcement)</strong>
                    လူမျိုးရေး၊ ဘာသာရေး အမုန်းစကားများ (Hate Speech)၊ အကြမ်းဖက်မှုကို အားပေးလှုံ့ဆော်ခြင်း၊ လိင်ပိုင်းဆိုင်ရာ ညစ်ညမ်းမှုများနှင့် ဥပဒေနှင့် မလွတ်ကင်းသော အကြောင်းအရာများကို တင်ဆက်ခွင့် လုံးဝ မရှိပါ။ ဤစည်းမျဉ်းများကို ချိုးဖောက်ကြောင်း တွေ့ရှိပါက ချိုးဖောက်မှု အခြေအနေပေါ် မူတည်၍ ပလက်ဖောင်းမှ <strong className="text-amber-500">ကြိုတင်သတိပေးခြင်းများ (Warnings/Strikes)</strong> ပြုလုပ်သွားမည်ဖြစ်ပြီး၊ အကြိမ်ကြိမ် ဆက်လက်ချိုးဖောက်ပါက (သို့မဟုတ်) အလွန်ပြင်းထန်သော ချိုးဖောက်မှုဖြစ်ပါက အကောင့်အား ရပ်ဆိုင်း (Terminate) သည်အထိ အရေးယူပိုင်ခွင့် ရှိသည်။
                  </p>
                </div>
              </section>

              {/* Clause 5 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၅။</span> မူဝါဒ ပြင်ဆင်ပြောင်းလဲခြင်း (Policy Amendments)
                </h2>
                <p className="text-left leading-relaxed">
                  Khit ပလက်ဖောင်းသည် ဤမူဝါဒများအား လိုအပ်ပါက အချိန်မရွေး ပြင်ဆင်၊ ဖြည့်စွက်၊ ပယ်ဖျက်ပိုင်ခွင့် ရှိသည်။ မူဝါဒ ပြောင်းလဲမှုများ ရှိလာပါက ဖန်တီးသူများထံသို့ တရားဝင် အသိပေး အကြောင်းကြားမည် ဖြစ်သည်။ 
                </p>
                <p className="text-xs text-zinc-500 italic mt-4 pt-4 border-t border-zinc-800">
                  * အင်္ဂလိပ်ဘာသာနှင့် မြန်မာဘာသာတို့အကြား အဓိပ္ပာယ်ဖွင့်ဆိုချက် ကွဲလွဲမှု တစုံတရာ ရှိခဲ့ပါက မြန်မာဘာသာ ဖြင့် ရေးသားထားချက်ကိုသာ အတည်ယူမည် ဖြစ်သည်။
                </p>
              </section>
            </>
          ) : (
            <>
              {/* Clause 1 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">1.</span> General Provisions
                </h2>
                <p className="text-left leading-relaxed">
                  These policies govern content monetization, payout procedures, and community participation on the Khit platform for all creators. By utilizing Khit Studio services, creators agree to be legally bound by these terms, provisions, and operational standards.
                </p>
              </section>

              {/* Clause 2 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">2.</span> Monetization & Revenue Share Policy
                </h2>
                
                <div className="pl-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-zinc-200">2.1. Direct Star Tipping System</h3>
                    <p className="text-left leading-relaxed">
                      To empower creators with industry-leading fan monetization, proceeds from Star tips are distributed according to the following fixed breakdown:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                      <li><strong className="text-zinc-200">Ninety-Seven Percent (97%)</strong> is awarded directly to the Creator without deduction.</li>
                      <li><strong className="text-zinc-200">Three Percent (3%)</strong> is retained by Khit solely as a technical infrastructure and platform maintenance fee.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-zinc-200">2.2. Revenue Share Allocation & Phased Implementation</h3>
                    <p className="text-left leading-relaxed">
                      Net platform earnings shall be apportioned on an 80% (Creator), 10% (User Lucky Draw Pool), and 10% (Platform Operational Fee) basis across the following structured rollout phases:
                    </p>
                    <div className="pl-4 space-y-3 text-zinc-300">
                      <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1">
                        <strong className="text-white block">(1) Phase 1: Launch Phase (Initial 6 Months)</strong>
                        <p className="text-left leading-relaxed text-zinc-400">
                          During the initial six-month launch window, zero advertisements shall be served. Eighty Percent (80%) of aggregate net subscription revenues shall be distributed among creators proportionally based on qualified watch-time metrics.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-3">
                        <strong className="text-white block">(2) Phase 2: Advertising Integration (Post 6-Months)</strong>
                        <p className="text-left leading-relaxed text-zinc-400">
                          Following the initial six-month rollout, native advertising shall be phased in for free viewers. Net advertising revenue shall be calculated pro-rata on a Cost-Per-Mille (CPM) benchmark basis per 1,000 verified impressions, with Eighty Percent (80%) disbursed directly to the content creator. (Note: This advertising integration shall take full legal effect on the date officially announced by the platform.)
                        </p>

                        <div className="pt-2 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
                          <strong className="text-zinc-200 block">Ad Revenue Calculation Criteria & Exclusions:</strong>
                          <p className="text-left leading-relaxed pl-2">
                            1. Disbursements are calculated strictly on "Valid & Successfully Rendered Ad Impressions," rather than aggregate gross content/video views.
                          </p>
                          <div className="pl-2 space-y-1">
                            <p className="text-left leading-relaxed">2. No revenue shall accrue for views where advertisements failed to render due to:</p>
                            <ul className="list-disc pl-5 space-y-0.5 text-zinc-500">
                              <li>Client-side network dropouts, premature video skips, or immediate window termination before ad execution.</li>
                              <li>Use of unauthorized third-party ad-blocking utilities (Adblockers).</li>
                              <li>Unavailability of matching commercial advertiser campaigns (Fill Rate & geographic inventory limitations).</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Clause 3 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">3.</span> Payout Thresholds & Third-Party Transaction Fees
                </h2>
                
                <div className="pl-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-zinc-200">3.1. Minimum Payout Threshold</h3>
                    <p className="text-left leading-relaxed">
                      The official benchmark conversion rate is fixed at <strong className="text-white">1 Star = 10 Myanmar Kyat (MMK)</strong>. Creators must accumulate a verified minimum balance of <strong className="text-white">20,000 Stars (equivalent to 200,000 MMK)</strong> to initiate an official payout request.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-zinc-200">3.2. Deduction of Third-Party Processing Fees</h3>
                    <p className="text-left leading-relaxed">
                      Khit levies zero additional platform surcharges on withdrawals. However, depending upon the creator's elected disbursement rail, third-party intermediary costs <strong className="text-white underline underline-offset-4">shall be deducted strictly from the creator's gross disbursement balance</strong>:
                    </p>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3 mt-2">
                      <p className="text-left leading-relaxed text-zinc-400">
                        <strong className="text-zinc-200">(a) Cryptocurrency (USDT) Payouts: </strong> 
                        Applicable decentralized blockchain network gas fees (TRC-20 or BEP-20) shall be deducted directly from the transmitted balance.
                      </p>
                      <p className="text-left leading-relaxed text-zinc-400">
                        <strong className="text-zinc-200">(b) Domestic Mobile Wallets (KBZPay, WavePay): </strong> 
                        Real-time P2P foreign exchange rate spreads (slippage) and domestic cash-out agency service fees will be deducted at prevailing transaction rates.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Clause 4 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">4.</span> Community Standards & Content Moderation
                </h2>
                
                <div className="pl-6 space-y-4">
                  <p className="text-justify">
                    <strong className="text-zinc-200 block mb-1">4.1. Intellectual Property & Fair Use</strong>
                    Recap, critique, and commentary productions must adhere to internationally recognized Fair Use principles. Complete unauthorized reproduction, direct ripping, and verbatim piracy are strictly prohibited. Khit expeditiously processes verified copyright takedown notices pursuant to international DMCA standards.
                  </p>
                  <p className="text-justify">
                    <strong className="text-zinc-200 block mb-1">4.2. Prohibited Content & Progressive Enforcement</strong>
                    Hate speech, incitement to imminent violence, sexually explicit media, and unlawful content are strictly prohibited. In the event of infractions, Khit implements a progressive <strong className="text-amber-500">Warning & Strike System</strong>. Repeated or egregious violations will result in permanent channel termination without indemnity.
                  </p>
                </div>
              </section>

              {/* Clause 5 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">5.</span> Policy Amendments & Governing Language
                </h2>
                <p className="text-left leading-relaxed">
                  Khit reserves the right to amend, update, or supersede these policies as operational circumstances dictate. Registered creators will receive prompt notification regarding material changes.
                </p>
                <p className="text-xs text-zinc-500 italic mt-4 pt-4 border-t border-zinc-800">
                  * In the event of any linguistic discrepancy, semantic divergence, or conflict between the English and Burmese texts, the Burmese language version shall govern and prevail.
                </p>
              </section>
            </>
          )}

        </div>

        {/* Document Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Official Khit Documentation</span>
          </div>
          <p>© 2026 Khit Platform. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}