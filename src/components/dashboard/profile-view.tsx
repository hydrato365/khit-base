"use client";

import React, { useState } from "react";
import { 
  UserCircle2, 
  Image as ImageIcon, 
  Upload, 
  Check, 
  Copy, 
  ExternalLink, 
  Plus, 
  Trash2, 
  CheckCircle2,
  Globe,
  Camera,
  AtSign,
  Mail,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileView() {
  const [activeSubTab, setActiveSubTab] = useState<"branding" | "basic_info">("branding");

  // Form State
  const [channelName, setChannelName] = useState("Min Mahar");
  const [handle, setHandle] = useState("minmahar_tech");
  const [description, setDescription] = useState(
    "I share high-quality software engineering tutorials, tech product reviews, and remote work guides tailored for developers in Myanmar."
  );
  const [contactEmail, setContactEmail] = useState("contact@minmahar.recap");
  const [links, setLinks] = useState([
    { id: 1, title: "Facebook Page", url: "https://facebook.com/minmahar.recap" },
    { id: 2, title: "Telegram Channel", url: "https://t.me/minmahar_recap" },
  ]);

  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://khit.to/@${handle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddLink = () => {
    setLinks([...links, { id: Date.now(), title: "", url: "" }]);
  };

  const handleRemoveLink = (id: number) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-[1400px] text-zinc-100 animate-fadeIn pb-12">
      
      {/* ၁။ Header Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <UserCircle2 className="w-7 h-7 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Channel Profile & Customization
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#AAAAAA] mt-1">
            Manage your channel branding, public appearance, basic info, and external links
          </p>
        </div>

        {/* Action Buttons: View Public Channel & Save */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <a
            href={`#`}
            target="_blank"
            rel="noreferrer"
            className="h-10 px-4 rounded-xl bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Channel</span>
          </a>

          <Button
            onClick={handleSave}
            className="h-10 px-5 bg-[#8c1cff] hover:bg-[#7a12e6] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md shadow-[#8c1cff]/25 transition-colors"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Publish Changes</span>
            )}
          </Button>
        </div>
      </div>

      {/* ၂။ Sub-Tabs (Branding vs Basic Info) */}
      <div className="flex items-center gap-6 border-b border-zinc-800 pb-px">
        <button
          onClick={() => setActiveSubTab("branding")}
          className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "branding"
              ? "border-[#8c1cff] text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <ImageIcon className={`w-4 h-4 ${activeSubTab === "branding" ? "text-[#8c1cff]" : ""}`} />
          <span>Branding</span>
        </button>

        <button
          onClick={() => setActiveSubTab("basic_info")}
          className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "basic_info"
              ? "border-[#8c1cff] text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Globe className={`w-4 h-4 ${activeSubTab === "basic_info" ? "text-[#8c1cff]" : ""}`} />
          <span>Basic Info</span>
        </button>
      </div>

      {/* ၃။ SUB-TAB (၁) - BRANDING (Profile Avatar & Banner) */}
      {activeSubTab === "branding" && (
        <div className="space-y-6">
          
          {/* Profile Picture (Avatar) Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">
              Profile Picture
            </h2>
            <p className="text-xs sm:text-sm text-[#AAAAAA] mb-6">
              Your profile picture will appear where your channel is presented on Khit.to (800x800 px recommended)
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Preview with White Ring */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 rounded-full ring-4 ring-white/10 overflow-hidden bg-gradient-to-tr from-amber-700 via-rose-900 to-indigo-950 flex items-center justify-center shadow-xl">
                  {/* Photo or Fallback */}
                </div>
                <button
                  type="button"
                  className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                  title="Change photo"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Upload Controls */}
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <Button className="h-10 px-4 bg-[#18181A] hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs sm:text-sm rounded-xl gap-2">
                    <Upload className="w-4 h-4" />
                    <span>Change Picture</span>
                  </Button>
                  <Button variant="ghost" className="h-10 px-3 text-zinc-400 hover:text-red-400 text-xs sm:text-sm font-semibold">
                    Remove
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">
                  JPG or PNG file. At least 800 x 800 pixels. Max 4MB.
                </p>
              </div>
            </div>
          </div>

          {/* Banner Image (Cover) Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">
              Banner Image
            </h2>
            <p className="text-xs sm:text-sm text-[#AAAAAA] mb-6">
              This image will appear across the top of your channel page on TV, desktop, and mobile
            </p>

            <div className="space-y-4">
              {/* Banner Mockup Preview */}
              <div className="w-full h-44 sm:h-56 rounded-2xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-zinc-950 border border-zinc-800 relative flex items-center justify-center overflow-hidden shadow-inner group">
                <div className="text-center p-4">
                  <ImageIcon className="w-8 h-8 text-zinc-600 mx-auto mb-2 group-hover:text-zinc-400 transition-colors" />
                  <p className="text-xs font-bold text-zinc-400">
                    2048 x 1152 pixels (16:9 ratio)
                  </p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    For the best results on all devices
                  </p>
                </div>
              </div>

              {/* Upload Banner Button */}
              <div className="flex items-center gap-3">
                <Button className="h-10 px-4 bg-[#18181A] hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs sm:text-sm rounded-xl gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Banner</span>
                </Button>
                <span className="text-xs text-zinc-500">
                  PNG or JPG up to 6MB
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ၄။ SUB-TAB (၂) - BASIC INFO (Name, Handle, Description, Links) */}
      {activeSubTab === "basic_info" && (
        <div className="space-y-6">
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 space-y-6">
            
            {/* Channel Name */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 block">
                Channel Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="e.g. Min Mahar"
                className="w-full h-11 bg-[#18181A] border border-zinc-800 rounded-xl px-4 text-sm font-semibold text-white focus:outline-none focus:border-white/30 transition-colors"
              />
              <p className="text-xs text-[#AAAAAA] mt-1.5">
                Choose a channel name that represents you and your content.
              </p>
            </div>

            {/* Handle (@username) */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 block">
                Handle <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  placeholder="minmahar_recap"
                  className="w-full h-11 bg-[#18181A] border border-zinc-800 rounded-xl pl-10 pr-24 text-sm font-mono text-white focus:outline-none focus:border-white/30 transition-colors"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  <Check className="w-3 h-3 stroke-[3]" /> Available
                </span>
              </div>
            </div>

            {/* Channel URL (Copyable) */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 block">
                Channel URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`https://khit.to/@${handle}`}
                  className="w-full h-11 bg-[#18181A] border border-zinc-800 rounded-xl px-4 text-xs sm:text-sm font-mono text-zinc-400 select-all focus:outline-none"
                />
                <Button
                  type="button"
                  onClick={handleCopyUrl}
                  className="h-11 px-4 rounded-xl bg-[#18181A] hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs shrink-0 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Description (Bio) */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 block">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your channel..."
                className="w-full bg-[#18181A] border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors leading-relaxed resize-none"
              />
            </div>

            {/* External Links (Facebook, Telegram, etc.) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  External Links
                </label>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add Link</span>
                </button>
              </div>

              <div className="space-y-3">
                {links.map((link) => (
                  <div key={link.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 rounded-xl sm:rounded-none bg-[#141416] sm:bg-transparent border sm:border-0 border-zinc-800/80">
                    <input
                      type="text"
                      placeholder="Title (e.g. Facebook)"
                      value={link.title}
                      onChange={(e) => {
                        const newLinks = links.map((l) => l.id === link.id ? { ...l, title: e.target.value } : l);
                        setLinks(newLinks);
                      }}
                      className="w-full sm:w-1/3 h-11 bg-[#18181A] border border-zinc-800 rounded-xl px-4 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="url"
                        placeholder="URL (https://...)"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = links.map((l) => l.id === link.id ? { ...l, url: e.target.value } : l);
                          setLinks(newLinks);
                        }}
                        className="flex-1 h-11 bg-[#18181A] border border-zinc-800 rounded-xl px-4 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(link.id)}
                        className="h-11 w-11 shrink-0 rounded-xl bg-[#18181A] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Email */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 block">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full h-11 bg-[#18181A] border border-zinc-800 rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <p className="text-xs text-[#AAAAAA] mt-1.5">
                Let viewers and sponsors know how to contact you for business inquiries.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}