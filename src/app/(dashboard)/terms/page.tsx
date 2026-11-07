"use client";

import React, { useState } from "react";
import { Scale, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function TermsPage() {
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
            Terms of Service (ToS)
          </h1>
          <p className="text-sm font-medium text-zinc-400">
            {lang === "my" 
              ? "Khit ပလက်ဖောင်း အသုံးပြုခြင်းဆိုင်ရာ သဘောတူညီချက်နှင့် တရားဝင် စည်းကမ်းချက်များ" 
              : "Official Terms of Service and Legal Agreement for Khit Platform"}
          </p>
          
          {/* Language Switcher */}
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
                  <span className="text-zinc-400">၁။</span> အကြောင်းအရာ ပိုင်ဆိုင်မှုနှင့် လိုင်စင် (Content Ownership & License)
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    ဖန်တီးသူ (Creator) သည် မိမိ တင်ဆက်လိုက်သော ဗီဒီယိုနှင့် အကြောင်းအရာများ၏ မူပိုင်ခွင့်ကို ဆက်လက် ပိုင်ဆိုင်မည်ဖြစ်သည်။ သို့သော် အဆိုပါ အကြောင်းအရာများကို Khit ပလက်ဖောင်းပေါ်တွင် တင်လိုက်ခြင်းဖြင့်၊ ဖန်တီးသူသည် Khit အား အဆိုပါ အကြောင်းအရာများအား ပလက်ဖောင်းပေါ်တွင် ပြသရန်၊ သိမ်းဆည်းရန်နှင့် ဖြန့်ဝေရန်အတွက် <strong className="text-zinc-200">ကမ္ဘာတစ်ဝှမ်း အကျုံးဝင်သော၊ အခမဲ့ဖြစ်သော၊ နှင့် လွှဲပြောင်းနိုင်သော လိုင်စင် (Worldwide, royalty-free, transferable license)</strong> အား ပေးအပ်ပြီးဖြစ်သည်ဟု မှတ်ယူရမည်။
                  </p>
                </div>
              </section>

              {/* Clause 2 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၂။</span> တာဝန်ယူမှု ကင်းလွတ်ခွင့် (Indemnification & Liability)
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    ဖန်တီးသူ တင်ဆက်လိုက်သော အကြောင်းအရာများသည် အခြားသူတစ်ဦးဦး၏ မူပိုင်ခွင့် (Copyright) ကို ချိုးဖောက်ခြင်း၊ အသရေဖျက်ခြင်း သို့မဟုတ် တည်ဆဲဥပဒေ တစ်ရပ်ရပ်နှင့် ငြိစွန်းခြင်းတို့ကြောင့် တတိယအဖွဲ့အစည်း (ဥပမာ - ရုပ်ရှင်ထုတ်လုပ်ရေးများ၊ လူပုဂ္ဂိုလ်များ) မှ တရားစွဲဆိုခြင်း၊ နစ်နာကြေး တောင်းခံခြင်းများ ပေါ်ပေါက်လာပါက <strong className="text-white underline underline-offset-4">ဖန်တီးသူမှသာလျှင် မိမိစရိတ်ဖြင့် လုံးဝ တာဝန်ယူ ဖြေရှင်းရမည်ဖြစ်သည်။</strong> ဤကိစ္စရပ်များနှင့် ပတ်သက်၍ Khit ပလက်ဖောင်း၊ ကုမ္ပဏီနှင့် ဝန်ထမ်းများအပေါ် လုံးဝ (လုံးဝ) တာဝန်လွှဲချခွင့်၊ အရေးဆိုခွင့် မရှိစေရ။
                  </p>
                </div>
              </section>

              {/* Clause 3 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၃။</span> လိမ်လည်မှုနှင့် ဝင်ငွေ ထိန်းသိမ်းထားခွင့် (Fraud & Payment Withholding)
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    ဖန်တီးသူသည် ဝင်ငွေရရှိစေရန် ရည်ရွယ်၍ အလိုအလျောက် စနစ်များ (Bots) အသုံးပြုပြီး ကြည့်ရှုမှု (Views) အတုအယောင် တိုးစေခြင်း၊ ကြော်ငြာများကို မသမာသော နည်းလမ်းဖြင့် တမင်တကာ ကလစ်နှိပ်ခြင်း (Click Fraud / Click Farms)၊ သို့မဟုတ် တရားမဝင် ဆော့ဖ်ဝဲလ်များဖြင့် စနစ်အား လှည့်စားခြင်း စသည့် လိမ်လည်မှုများ ပြုလုပ်ကြောင်း စစ်ဆေးတွေ့ရှိပါက၊ Khit သည် အဆိုပါ ဖန်တီးသူ၏ <strong className="text-white">အကောင့်အား ချက်ချင်း ပိတ်သိမ်းခွင့် နှင့် ရရှိထားသော ဝင်ငွေများအား ထုတ်ပေးခြင်းမပြုဘဲ အပြီးအပိုင် သိမ်းဆည်းခွင့် (Withhold payments)</strong> အပြည့်အဝ ရှိသည်။ (မှတ်ချက် - သာမန် အင်တာနက် အသုံးပြုရန်အတွက် VPN အသုံးပြုခြင်းသည် ဤတားမြစ်ချက်တွင် လုံးဝ အကျုံးမဝင်ပါ။)
                  </p>
                </div>
              </section>

              {/* Clause 4 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၄။</span> အာမခံချက် ကင်းလွတ်ခွင့် (Disclaimer of Warranties - "As Is")
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    Khit ပလက်ဖောင်းအား <strong className="text-zinc-200">"ရှိရင်းစွဲ အခြေအနေ (As Is)"</strong> အတိုင်းသာ ဝန်ဆောင်မှုပေးခြင်း ဖြစ်သည်။ နည်းပညာပိုင်းဆိုင်ရာ ချို့ယွင်းမှုများ (System Errors)၊ ဆာဗာ ပြတ်တောက်မှုများ (Server Downtime)၊ ဒေတာ ပျောက်ဆုံးမှုများ သို့မဟုတ် ဆိုက်ဘာ တိုက်ခိုက်ခံရမှုများကြောင့် ဖန်တီးသူများဘက်မှ ဆုံးရှုံးသွားသော ဝင်ငွေ (Lost Profits) သို့မဟုတ် ဒေတာများအတွက် Khit မှ လျော်ကြေးပေးမည် မဟုတ်ပါ။ ပလက်ဖောင်း အမြဲတမ်း အဆင်ပြေချောမွေ့စွာ လည်ပတ်နေမည်ဟု တရားဝင် အာမခံချက် မပေးထားပါ။
                  </p>
                </div>
              </section>

              {/* Clause 5 */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">၅။</span> အကောင့် ရပ်ဆိုင်းခြင်းနှင့် ပိတ်သိမ်းခွင့် (Account Termination)
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    ဤစာချုပ်ပါ စည်းကမ်းချက် တစ်ရပ်ရပ်ကိုဖြစ်စေ၊ Khit ၏ မူဝါဒ (Policies) များကိုဖြစ်စေ ဖောက်ဖျက်ကျူးလွန်သော မည်သည့် အကောင့်ကိုမဆို Khit ဘက်မှ သတိပေးချက် ကြိုတင်ပေးရန် မလိုဘဲ အချိန်မရွေး ဆိုင်းငံ့ခြင်း (Suspend) သို့မဟုတ် အပြီးအပိုင် ပိတ်သိမ်းခြင်း (Terminate) ပြုလုပ်ပိုင်ခွင့် ရှိသည်။ 
                  </p>
                  <p className="text-xs text-zinc-500 italic mt-6 pt-4 border-t border-zinc-800">
                    * အင်္ဂလိပ်ဘာသာနှင့် မြန်မာဘာသာတို့အကြား အဓိပ္ပာယ်ဖွင့်ဆိုချက် ကွဲလွဲမှု တစုံတရာ ရှိခဲ့ပါက မြန်မာဘာသာ ဖြင့် ရေးသားထားချက်ကိုသာ အတည်ယူမည် ဖြစ်သည်။
                  </p>
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Clause 1 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">1.</span> Content Ownership & License
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    Creators retain full ownership of their original content. However, by uploading content to the Khit platform, the creator grants Khit a <strong className="text-zinc-200">worldwide, non-exclusive, royalty-free, transferable, and sublicensable license</strong> to use, reproduce, distribute, display, and perform the content in connection with the platform's services and operations.
                  </p>
                </div>
              </section>

              {/* Clause 2 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">2.</span> Indemnification & Liability
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    If a creator's uploaded content violates third-party intellectual property rights (Copyright), constitutes defamation, or breaches any applicable laws resulting in lawsuits, claims, or damages, <strong className="text-white underline underline-offset-4">the creator agrees to fully indemnify, defend, and hold harmless Khit</strong>, its affiliates, and employees at the creator's sole expense. Khit shall bear absolutely no liability for user-generated content.
                  </p>
                </div>
              </section>

              {/* Clause 3 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">3.</span> Fraud & Payment Withholding
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    Any artificial manipulation of metrics, including but not limited to the use of automated bots to generate fake views, intentional click fraud on advertisements (such as click farms), or unauthorized exploitation of the platform's systems, is strictly prohibited. If Khit detects such fraudulent activity, Khit reserves the absolute right to <strong className="text-white">immediately terminate the creator's account and withhold any and all pending or accrued revenues</strong> without recourse. (Note: Routine VPN usage for basic internet connectivity does not constitute a violation.)
                  </p>
                </div>
              </section>

              {/* Clause 4 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">4.</span> Disclaimer of Warranties ("As Is")
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    The Khit platform is provided on an <strong className="text-zinc-200">"AS IS" and "AS AVAILABLE"</strong> basis. Khit makes no warranties, express or implied, regarding the platform's uninterrupted operation. Khit shall not be liable for any lost profits, lost revenues, or loss of data resulting from technical failures, server downtimes, system errors, or cyber-attacks.
                  </p>
                </div>
              </section>

              {/* Clause 5 (EN) */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-400">5.</span> Account Termination
                </h2>
                <div className="pl-6 space-y-3">
                  <p className="text-left leading-relaxed">
                    Khit reserves the right to suspend or terminate any creator's account and access to the platform at any time, without prior notice, for any violation of these Terms of Service or established Community Policies.
                  </p>
                  <p className="text-xs text-zinc-500 italic mt-6 pt-4 border-t border-zinc-800">
                    * In the event of any linguistic discrepancy or semantic divergence between the English and Burmese texts, the Burmese language version shall govern and prevail.
                  </p>
                </div>
              </section>
            </>
          )}

        </div>

        {/* Document Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4" />
            <span>Official Khit Legal Contract</span>
          </div>
          <p>© 2026 Khit Platform. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}