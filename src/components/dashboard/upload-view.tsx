"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Film, 
  UploadCloud, 
  Wand2, 
  Crown, 
  ImageIcon, 
  Cpu, 
  Upload,
  Server,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Technology", "Education", "Business", "Lifestyle"];

export function UploadView() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const hasUnsavedChanges = title.trim().length > 0 || description.trim().length > 0 || videoFile !== null;

  const handlePublish = async () => {
    if (!videoFile) {
      alert("ကျေးဇူးပြု၍ ဗီဒီယိုဖိုင် (.mp4) ကို အရင်ရွေးချယ်ပေးပါ");
      return;
    }
    if (!title.trim()) {
      alert("ကျေးဇူးပြု၍ ဗီဒီယိုခေါင်းစဉ် ရိုက်ထည့်ပေးပါ");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await fetch("https://backend-tester-3glc.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || `Server Error (${res.status})`);
      }

      alert("ဗီဒီယို အောင်မြင်စွာ တင်ပြီးပါပြီ!");
      router.push("/content");
    } catch (err: any) {
      setUploadError(err.message || "Upload လုပ်ရာတွင် အမှားအယွင်း ဖြစ်ပေါ်ခဲ့ပါသည်");
    } finally {
      setIsUploading(false);
    }
  };

  // Browser ကို Refresh သို့မဟုတ် Tab ပိတ်သည့်အခါ တားဆီးရန်
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowExitConfirm(true);
    } else {
      router.back();
    }
  };

  const handleConfirmExit = () => {
    setTitle("");
    setDescription("");
    setSelectedCategory("Movie Recap");
    setShowExitConfirm(false);
    router.back();
  };

  const handleSampleLoad = () => {
    setTitle("Oppenheimer Full Movie Recap (Burmese Explained)");
    setDescription("Detailed storyline walkthrough, Christopher Nolan direction notes, and ethical dilemmas of J. Robert Oppenheimer decoded in Burmese.");
    setSelectedCategory("Movie Recap");
  };

  return (
    <div className="space-y-6 max-w-[1400px] text-zinc-100 animate-fadeIn pb-12">
      {/* Mobile Sticky Top Header (< Back, Title, Publish) */}
      <div className="md:hidden sticky top-0 -mx-4 -mt-4 px-4 h-14 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between z-40 mb-2">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 text-zinc-300 active:text-white -ml-1 p-1.5 rounded-lg active:bg-zinc-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-xs font-semibold">Back</span>
        </button>
        <span className="text-sm font-bold text-white">Upload Video</span>
        <button
          type="button"
          className="px-3.5 py-1.5 bg-[#8c1cff] active:bg-[#7a12e6] text-white text-xs font-bold rounded-xl shadow-md shadow-[#8c1cff]/20 cursor-pointer transition-colors"
        >
          Publish
        </button>
      </div>

      {/* ၁။ Header Row (Title & Endpoint Badge) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Film className="w-6 h-6 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Upload Video to Khit.to
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#AAAAAA] mt-1">
            Publish .mp4 videos with automatic HLS multi-bitrate streaming (1080p, 720p, 360p)
          </p>
        </div>

        {/* Endpoint Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#18181A] border border-zinc-800 text-xs font-mono text-zinc-300 self-start md:self-auto">
          <Server className="w-3.5 h-3.5 text-emerald-400" />
          <span>Server: <span className="text-emerald-400">Khit Cloud Active</span></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1 animate-pulse"></span>
        </div>
      </div>

      {/* ၂။ Top Drag & Drop Upload Area (Dashed Border Box) */}
      <input
        type="file"
        ref={fileInputRef}
        accept="video/mp4"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
            if (!title) {
              setTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
            }
          }
        }}
      />
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full border border-dashed border-zinc-700 bg-[#121214]/60 hover:bg-[#18181b] transition-colors rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer group"
      >
        {/* Upload Circle Icon */}
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors flex items-center justify-center text-white mb-4 shadow-inner">
          <UploadCloud className="w-7 h-7" />
        </div>

        {/* Text */}
        <h3 className="text-base font-bold text-white mb-1">
          {videoFile ? (
            <span className="text-emerald-400 font-bold">ရွေးချယ်ထားသော ဖိုင်: {videoFile.name}</span>
          ) : (
            <>
              Drag and drop your video file here, or{" "}
              <span className="text-white underline underline-offset-2">
                browse
              </span>
            </>
          )}
        </h3>
        <p className="text-xs text-zinc-500 mb-4">
          Accepts standard <span className="font-bold text-zinc-400">.mp4</span> container (H.264 / AAC)
        </p>

        {/* Info Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181A] border border-zinc-800 text-[11px] text-zinc-400 font-medium mb-4">
          <span>Up to 4K resolution supported</span>
          <span>•</span>
          <span>Automatic HLS Transcoding</span>
        </div>

        {/* 1-Click Sample Test Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTitle("iPhone 18 Pro Max Complete Review");
            setDescription("Detailed camera tests, battery life, and gaming performance reviews in Myanmar.");
            setSelectedCategory("Technology");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Or load sample tech video (1-click test)</span>
        </button>
      </div>

      {/* ၃။ Bottom Form: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ဘယ်ဘက်ခြမ်း: 1. VIDEO METADATA (၇ ကော်လံ) */}
        <div className="lg:col-span-7 bg-[#121214] border border-zinc-800/90 rounded-2xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            1. VIDEO METADATA
          </h2>

          {/* Video Title */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. iPhone 18 Pro Max Complete Review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 bg-[#18181A] border border-zinc-800 rounded-xl px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-2 block">
              Category Selector <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#8c1cff] text-white shadow-md shadow-[#8c1cff]/20"
                        : "bg-[#18181A] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Description */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
              Video Description
            </label>
            <textarea
              rows={4}
              placeholder="Tell viewers what happens in this recap or episode..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#18181A] border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* ညာဘက်ခြမ်း: 2. THUMBNAIL & COVER (၅ ကော်လံ) */}
        <div className="lg:col-span-5 bg-[#121214] border border-zinc-800/90 rounded-2xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            2. THUMBNAIL & COVER
          </h2>

          {/* Custom Thumbnail Dropzone */}
          <div className="w-full h-52 bg-[#18181A] border border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center p-4 select-none">
            <div className="p-3 rounded-xl bg-zinc-800/60 mb-2">
              <ImageIcon className="w-6 h-6 text-zinc-400" />
            </div>
            <p className="text-xs font-bold text-zinc-300">
              Auto-Generated Thumbnail
            </p>
            <p className="text-[11px] text-zinc-500 mt-1 max-w-xs">
              ဗီဒီယို တင်လိုက်သည်နှင့် Khit Server မှ Thumbnail ပုံကို အလိုအလျောက် ရွေးချယ်ဖန်တီးပေးပါမည်
            </p>
          </div>

          {/* Khit Transcoding Pipeline Info Box */}
          <div className="bg-[#18181A] border border-zinc-800 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-xs mb-1">
              <Cpu className="w-4 h-4 text-zinc-300" />
              <span>Khit Video Processing Pipeline</span>
            </div>
            <ul className="space-y-1 text-zinc-400 text-[11px]">
              <li>• Input format: Standard MP4</li>
              <li>• High-Speed Multi-Bitrate Processing</li>
              <li>• Dynamic Watermark & Optimization</li>
              <li>• Storage: Khit Cloud Storage</li>
            </ul>
          </div>

          {/* Publish Video Button */}
          {uploadError && (
            <p className="text-xs text-red-500 font-semibold text-center">{uploadError}</p>
          )}
          <Button 
            onClick={handlePublish}
            disabled={isUploading}
            className="w-full h-12 bg-[#8c1cff] hover:bg-[#7a12e6] disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#8c1cff]/25 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4 stroke-[3]" />
            <span>{isUploading ? "ဗီဒီယို ပြင်ဆင်ပြီး Khit Server သို့ Upload တင်နေပါသည်..." : "Publish Video Now"}</span>
          </Button>
        </div>

      </div>

      {/* Unsaved Changes Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#18181A] border border-zinc-800 rounded-2xl p-5 shadow-2xl space-y-4 text-center">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white">
                ရေးလက်စများ ပျက်သွားနိုင်ပါသည်
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ယခု စာမျက်နှာမှ ထွက်ခွာပါက ရေးသားထားသော အချက်အလက်များ ဆုံးရှုံးသွားပါမည်။
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExitConfirm(false)}
                className="h-10 rounded-xl border-zinc-800 bg-[#121214] text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
              >
                ဆက်လုပ်မည်
              </Button>
              <Button
                type="button"
                onClick={handleConfirmExit}
                className="h-10 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-sm cursor-pointer"
              >
                ထွက်မည်
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}