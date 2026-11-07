"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Search, 
  Heart, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  MoreVertical, 
  CheckCircle2, 
  Trash2, 
  Star, 
  HelpCircle,
  ShieldAlert,
  Send,
  Film,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentItem {
  id: string;
  author: string;
  handle: string;
  avatarColor: string;
  time: string;
  videoTitle: string;
  comment: string;
  stars: number;
  likes: number;
  isHearted: boolean;
  hasQuestion: boolean;
  repliesCount: number;
  status: "published" | "held";
}

const initialComments: CommentItem[] = [
  {
    id: "c1",
    author: "Aung Myo Htet",
    handle: "@aungmyo_dev",
    avatarColor: "bg-blue-600",
    time: "2h ago",
    videoTitle: "Next.js 15 & Web Application (Part 1)",
    comment: "ဒီအပိုင်းမှာ Server Actions သုံးပြထားတာ အရမ်းရှင်းပါတယ်။ Client component ထဲကနေ data revalidate လုပ်တဲ့အခါ Error တက်ရင် ဘယ်လို handle လုပ်သင့်လဲဗျ?",
    stars: 500,
    likes: 24,
    isHearted: true,
    hasQuestion: true,
    repliesCount: 1,
    status: "published",
  },
  {
    id: "c2",
    author: "Thiri Shwe Sin",
    handle: "@thirishwe",
    avatarColor: "bg-pink-600",
    time: "5h ago",
    videoTitle: "Oppenheimer Full Movie Recap",
    comment: "Nolan ရဲ့ ရုပ်ရှင်တွေထဲမှာ ဒီကားက အရှုပ်ဆုံးလို့ ထင်ခဲ့တာ။ အခု အကို့ recap နားထောင်ပြီးမှ သမိုင်းကြောင်းပါ အကုန်ကွက်တိ သဘောပေါက်သွားတယ်။ ❤️",
    stars: 1200,
    likes: 89,
    isHearted: true,
    hasQuestion: false,
    repliesCount: 3,
    status: "published",
  },
  {
    id: "c3",
    author: "Min Thura",
    handle: "@minthura_99",
    avatarColor: "bg-emerald-600",
    time: "1d ago",
    videoTitle: "Myanmar Digital Banking Reform 2026",
    comment: "KPay နဲ့ WavePay transaction limits တွေက ၂၀၂၆ အတွင်း အပြောင်းအလဲ ထပ်ရှိနိုင်မလား အကို?",
    stars: 0,
    likes: 12,
    isHearted: false,
    hasQuestion: true,
    repliesCount: 0,
    status: "published",
  },
  {
    id: "c4",
    author: "PromoBot_Trade2026",
    handle: "@free_crypto",
    avatarColor: "bg-zinc-700",
    time: "1h ago",
    videoTitle: "Myanmar Digital Banking Reform 2026",
    comment: "Click here to claim 500 USDT bonus instantly! Join telegram link: http://bit.ly/spam-crypto",
    stars: 0,
    likes: 0,
    isHearted: false,
    hasQuestion: false,
    repliesCount: 0,
    status: "held",
  },
];

export function CommentsView() {
  const t = useTranslations("Comments");
  const [activeTab, setActiveTab] = useState<"published" | "held">("published");
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuestionsOnly, setFilterQuestionsOnly] = useState(false);
  const [filterStarsOnly, setFilterStarsOnly] = useState(false);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleToggleHeart = (id: string) => {
    setComments(comments.map((c) => 
      c.id === id ? { ...c, isHearted: !c.isHearted } : c
    ));
  };

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;
    setComments(comments.map((c) => 
      c.id === id ? { ...c, repliesCount: c.repliesCount + 1, isHearted: true } : c
    ));
    setReplyingId(null);
    setReplyText("");
  };

  const handleApprove = (id: string) => {
    setComments(comments.map((c) => c.id === id ? { ...c, status: "published" } : c));
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const filteredComments = comments.filter((c) => {
    const matchesTab = c.status === activeTab;
    const matchesSearch = 
      c.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.videoTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesQuestion = !filterQuestionsOnly || c.hasQuestion;
    const matchesStars = !filterStarsOnly || c.stars > 0;

    return matchesTab && matchesSearch && matchesQuestion && matchesStars;
  });

  const publishedCount = comments.filter((c) => c.status === "published").length;
  const heldCount = comments.filter((c) => c.status === "held").length;

  return (
    <div className="space-y-3.5 max-w-[1200px] text-zinc-100 pb-16">
      {/* 1. Header & Segmented Pill Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="text-xs text-[#AAAAAA] mt-0.5">
            {t("subtitle")}
          </p>
        </div>

        {/* Compact Segmented Control */}
        <div className="flex items-center bg-[#18181A] border border-zinc-800 rounded-xl p-1 self-start sm:self-auto w-full sm:w-auto">
          <button
            onClick={() => { setActiveTab("published"); setReplyingId(null); }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "published"
                ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>{t("published")}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === "published" ? "bg-white/20 text-white font-black" : "bg-zinc-800 text-zinc-400"}`}>
              {publishedCount}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab("held"); setReplyingId(null); }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "held"
                ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ShieldAlert className={`w-3.5 h-3.5 ${activeTab === "held" ? "text-white" : "text-amber-400"}`} />
            <span>{t("held")}</span>
            {heldCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "held" ? "bg-white/20 text-white" : "bg-amber-500/30 text-amber-300"}`}>
                {heldCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Search & Scrollable Horizontal Filter Chips */}
      <div className="space-y-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-[#18181A] border border-zinc-800 rounded-xl pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
          />
        </div>

        {activeTab === "published" && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setFilterQuestionsOnly(!filterQuestionsOnly)}
              className={`h-7 px-2.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                filterQuestionsOnly
                  ? "bg-white text-black border-white shadow-sm"
                  : "bg-[#18181A] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
              }`}
            >
              <HelpCircle className="w-3 h-3" />
              <span>{t("containsQuestions")}</span>
            </button>

            <button
              onClick={() => setFilterStarsOnly(!filterStarsOnly)}
              className={`h-7 px-2.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                filterStarsOnly
                  ? "bg-amber-500 text-black border-amber-500 font-bold shadow-sm"
                  : "bg-[#18181A] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>{t("starSupporters")}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Comments Card Stream */}
      <div className="space-y-2.5 pt-1">
        {filteredComments.length === 0 ? (
          <div className="py-12 text-center bg-[#121214] border border-zinc-800 rounded-xl">
            <p className="text-sm font-semibold text-zinc-400">
              {t("noComments")}
            </p>
          </div>
        ) : (
          filteredComments.map((item) => (
            <div 
              key={item.id}
              className="bg-[#121214] border border-zinc-800 rounded-xl p-3 sm:p-4 space-y-2.5 transition-colors"
            >
              {/* Card Header: Avatar + Author + Badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-full ${item.avatarColor} flex items-center justify-center text-xs font-black text-white shrink-0`}>
                    {item.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">{item.author}</span>
                      <span className="text-[10px] text-zinc-500 shrink-0">• {item.time}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 block truncate">{item.handle}</span>
                  </div>
                </div>

                {item.stars > 0 && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-black shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>+{item.stars.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Video Context Pill */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#18181A] border border-zinc-800/80 text-[10px] text-zinc-400 max-w-full">
                <Film className="w-3 h-3 text-red-500 shrink-0" />
                <span className="truncate">{item.videoTitle}</span>
              </div>

              {/* Comment Content */}
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed break-words">
                {item.comment}
              </p>

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60">
                {item.status === "published" ? (
                  <div className="flex items-center gap-2">
                    {/* Like */}
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <button className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <span>{item.likes > 0 ? item.likes : ""}</span>
                    </div>

                    {/* Dislike */}
                    <button className="p-1 rounded text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Creator Heart */}
                    <button
                      onClick={() => handleToggleHeart(item.id)}
                      className={`p-1 rounded transition-colors ${
                        item.isHearted ? "text-red-500" : "text-zinc-500 hover:text-red-400"
                      }`}
                      title="Creator Heart"
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.isHearted ? "fill-red-600" : ""}`} />
                    </button>

                    {/* Reply Button */}
                    <button
                      onClick={() => setReplyingId(replyingId === item.id ? null : item.id)}
                      className="px-2 py-1 rounded hover:bg-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Reply className="w-3 h-3" />
                      <span>{t("reply")}</span>
                      {item.repliesCount > 0 && (
                        <span className="text-zinc-500 text-[10px]">({item.repliesCount})</span>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleApprove(item.id)}
                      className="h-7 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t("approve")}</span>
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="outline"
                      className="h-7 px-2.5 rounded-lg border-zinc-800 bg-[#18181A] hover:bg-red-950/30 text-red-400 text-[11px] font-bold gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{t("delete")}</span>
                    </Button>
                  </div>
                )}

                <button className="p-1 text-zinc-500 hover:text-white">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Inline Quick Reply Box */}
              {replyingId === item.id && (
                <div className="pt-2 animate-fadeIn">
                  <div className="bg-[#18181A] border border-zinc-700/80 rounded-xl p-2.5 flex flex-col gap-2">
                    <textarea
                      rows={2}
                      autoFocus
                      placeholder={t("replyPlaceholder")}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
                    />
                    <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-zinc-800">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => { setReplyingId(null); setReplyText(""); }}
                        className="h-7 px-2.5 text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800"
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleSendReply(item.id)}
                        className="h-7 px-3 bg-white hover:bg-zinc-200 text-black text-[11px] font-bold rounded-lg gap-1 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>{t("sendReply")}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}