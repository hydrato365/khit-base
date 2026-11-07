export type TimeRange = "Last 7 days" | "Last 28 days" | "Last 90 days" | "Lifetime";
export type MetricType = "views" | "watchTime" | "subscribers" | "stars";

export const timeRangeOptions: TimeRange[] = [
  "Last 7 days",
  "Last 28 days",
  "Last 90 days",
  "Lifetime",
];

export const statsByRange = {
  "Last 7 days": {
    views: { total: "1.2K", change: "+5.2% vs previous" },
    watchTime: { total: "155 hrs", change: "+2.4% vs previous" },
    subscribers: { total: "+25", change: "+4.1% vs previous" },
    stars: { total: "850", mmk: "8,500 MMK", change: "+12.5% vs previous" },
    funnel: { views: "1.2K", engaged: "540", premium: "180", stars: "45" },
    geo: [
      { country: "Myanmar (မြန်မာ)", percent: 75, views: "900", flag: "🇲🇲" },
      { country: "Thailand (ထိုင်း)", percent: 15, views: "180", flag: "🇹🇭" },
      { country: "Singapore (စင်ကာပူ)", percent: 6, views: "72", flag: "🇸🇬" },
      { country: "Malaysia (မလေးရှား)", percent: 4, views: "48", flag: "🇲🇾" },
    ],
    traffic: [
      { source: "Khit Recommendations (ပင်မဖိဒ်)", percent: 48, count: "576" },
      { source: "Search (ရှာဖွေမှုမှတဆင့်)", percent: 28, count: "336" },
      { source: "Facebook & Telegram Shares", percent: 18, count: "216" },
      { source: "Direct Channel Links", percent: 6, count: "72" },
    ],
    retention: { avg: "6:12", pct: "52% retention" },
  },
  "Last 28 days": {
    views: { total: "4.5K", change: "+12.5% vs previous" },
    watchTime: { total: "610 hrs", change: "+8.1% vs previous" },
    subscribers: { total: "+120", change: "+15.2% vs previous" },
    stars: { total: "3.5K", mmk: "35,000 MMK", change: "+24.0% vs previous" },
    funnel: { views: "4.5K", engaged: "2.1K", premium: "650", stars: "150" },
    geo: [
      { country: "Myanmar (မြန်မာ)", percent: 76, views: "3.4K", flag: "🇲🇲" },
      { country: "Thailand (ထိုင်း)", percent: 14, views: "630", flag: "🇹🇭" },
      { country: "Singapore (စင်ကာပူ)", percent: 6, views: "270", flag: "🇸🇬" },
      { country: "Malaysia (မလေးရှား)", percent: 4, views: "180", flag: "🇲🇾" },
    ],
    traffic: [
      { source: "Khit Recommendations (ပင်မဖိဒ်)", percent: 52, count: "2.3K" },
      { source: "Search (ရှာဖွေမှုမှတဆင့်)", percent: 24, count: "1.1K" },
      { source: "Facebook & Telegram Shares", percent: 15, count: "675" },
      { source: "Direct Channel Links", percent: 9, count: "405" },
    ],
    retention: { avg: "6:45", pct: "55% retention" },
  },
  "Last 90 days": {
    views: { total: "9.8K", change: "+18.4% vs previous" },
    watchTime: { total: "1.3K hrs", change: "+14.0% vs previous" },
    subscribers: { total: "+450", change: "+21.0% vs previous" },
    stars: { total: "8.2K", mmk: "82,000 MMK", change: "+32.0% vs previous" },
    funnel: { views: "9.8K", engaged: "4.8K", premium: "1.2K", stars: "450" },
    geo: [
      { country: "Myanmar (မြန်မာ)", percent: 74, views: "7.2K", flag: "🇲🇲" },
      { country: "Thailand (ထိုင်း)", percent: 16, views: "1.5K", flag: "🇹🇭" },
      { country: "Singapore (စင်ကာပူ)", percent: 6, views: "588", flag: "🇸🇬" },
      { country: "Malaysia (မလေးရှား)", percent: 4, views: "392", flag: "🇲🇾" },
    ],
    traffic: [
      { source: "Khit Recommendations (ပင်မဖိဒ်)", percent: 55, count: "5.4K" },
      { source: "Search (ရှာဖွေမှုမှတဆင့်)", percent: 25, count: "2.4K" },
      { source: "Facebook & Telegram Shares", percent: 12, count: "1.1K" },
      { source: "Direct Channel Links", percent: 8, count: "784" },
    ],
    retention: { avg: "7:10", pct: "58% retention" },
  },
  "Lifetime": {
    views: { total: "18.5K", change: "+45.0% vs previous" },
    watchTime: { total: "2.4K hrs", change: "+38.0% vs previous" },
    subscribers: { total: "+1,850", change: "+65.0% vs previous" },
    stars: { total: "15.4K", mmk: "154,000 MMK", change: "+75.0% vs previous" },
    funnel: { views: "18.5K", engaged: "8.1K", premium: "2.5K", stars: "850" },
    geo: [
      { country: "Myanmar (မြန်မာ)", percent: 75, views: "13.8K", flag: "🇲🇲" },
      { country: "Thailand (ထိုင်း)", percent: 15, views: "2.7K", flag: "🇹🇭" },
      { country: "Singapore (စင်ကာပူ)", percent: 6, views: "1.1K", flag: "🇸🇬" },
      { country: "Malaysia (မလေးရှား)", percent: 4, views: "740", flag: "🇲🇾" },
    ],
    traffic: [
      { source: "Khit Recommendations (ပင်မဖိဒ်)", percent: 53, count: "9.8K" },
      { source: "Search (ရှာဖွေမှုမှတဆင့်)", percent: 26, count: "4.8K" },
      { source: "Facebook & Telegram Shares", percent: 14, count: "2.6K" },
      { source: "Direct Channel Links", percent: 7, count: "1.3K" },
    ],
    retention: { avg: "7:25", pct: "61% retention" },
  },
};

export const metricConfigs = {
  views: {
    title: "Daily Views Growth",
    color: "#EF4444",
    gradientId: "gradViews",
  },
  watchTime: {
    title: "Watch Time Trajectory",
    color: "#3B82F6",
    gradientId: "gradWatch",
  },
  subscribers: {
    title: "Follower Growth Trend",
    color: "#10B981",
    gradientId: "gradSubs",
  },
  stars: {
    title: "Stars Monetization Trend",
    color: "#F59E0B",
    gradientId: "gradStars",
  },
};

export const realtimeBars = [12, 18, 15, 22, 35, 24, 40, 50, 42, 38, 55, 68, 30, 45, 52, 60, 48, 40, 65, 78, 62, 70, 80, 85];

export function generateChartData(metric: string, range: string) {
  let days = 28;
  let rawStart = 100;
  let rawEnd = 500;
  let formatFn = (v: number) => `${Math.round(v)}`;

  if (range === "Last 7 days") {
    days = 7;
    if (metric === "views") { rawStart = 80; rawEnd = 250; formatFn = (v) => `${Math.round(v)}`; }
    else if (metric === "watchTime") { rawStart = 15; rawEnd = 35; formatFn = (v) => `${Math.round(v)} hrs`; }
    else if (metric === "subscribers") { rawStart = 5; rawEnd = 25; formatFn = (v) => `+${Math.round(v)}`; }
    else { rawStart = 80; rawEnd = 150; formatFn = (v) => `${Math.round(v)} ⭐`; }
  } else if (range === "Last 28 days") {
    days = 28;
    if (metric === "views") { rawStart = 50; rawEnd = 350; formatFn = (v) => `${Math.round(v)}`; }
    else if (metric === "watchTime") { rawStart = 10; rawEnd = 45; formatFn = (v) => `${Math.round(v)} hrs`; }
    else if (metric === "subscribers") { rawStart = 2; rawEnd = 18; formatFn = (v) => `+${Math.round(v)}`; }
    else { rawStart = 40; rawEnd = 220; formatFn = (v) => `${Math.round(v)} ⭐`; }
  } else if (range === "Last 90 days") {
    days = 90;
    if (metric === "views") { rawStart = 40; rawEnd = 280; formatFn = (v) => `${Math.round(v)}`; }
    else if (metric === "watchTime") { rawStart = 8; rawEnd = 38; formatFn = (v) => `${Math.round(v)} hrs`; }
    else if (metric === "subscribers") { rawStart = 1; rawEnd = 12; formatFn = (v) => `+${Math.round(v)}`; }
    else { rawStart = 30; rawEnd = 180; formatFn = (v) => `${Math.round(v)} ⭐`; }
  } else {
    days = 365;
    if (metric === "views") { rawStart = 10; rawEnd = 150; formatFn = (v) => `${Math.round(v)}`; }
    else if (metric === "watchTime") { rawStart = 2; rawEnd = 25; formatFn = (v) => `${Math.round(v)} hrs`; }
    else if (metric === "subscribers") { rawStart = 0; rawEnd = 8; formatFn = (v) => `+${Math.round(v)}`; }
    else { rawStart = 10; rawEnd = 90; formatFn = (v) => `${Math.round(v)} ⭐`; }
  }

  const points = [];
  const startY = 168;
  const endY = 28;
  
  // နောက်ဆုံး (ယနေ့) ရက်စွဲအား သတ်မှတ်ခြင်း 
  const endDate = new Date(2026, 10, 3); // 2026, Nov 3

  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1);
    const x = progress * 800; // X Coordinate (0 to 800)

    // သဘာဝကျသော Chart Noise / Fluctuation
    const noise = Math.sin(i * 0.5) * 3 + Math.cos(i * 0.2) * 2;
    
    const baseY = startY - progress * (startY - endY);
    const y = Math.max(18, Math.min(182, baseY - noise));

    const rawBase = rawStart + (rawEnd - rawStart) * progress;
    const rawVal = Math.max(0, rawBase + (noise / 10) * ((rawEnd - rawStart) * 0.05));

    // အတိအကျ ၁ ရက်စီ နောက်ပြန်ဆုတ်၍ ရက်စွဲထုတ်ခြင်း
    const d = new Date(endDate);
    d.setDate(d.getDate() - (days - 1 - i));

    let label = "";
    if (range === "Lifetime") {
      // ၁ နှစ်စာ (Lifetime) အတွက် ဥပမာ - Nov '25
      label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }).replace(" ", " '");
    } else {
      // ကျန်သော ရက်များအတွက် ဥပမာ - Nov 03
      label = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    }

    points.push({ x, y, label, val: formatFn(rawVal) });
  }

  const pathD = "M " + points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ");
  const areaD = pathD + " L 800,200 L 0,200 Z";

  // အောက်ခြေ ဝင်ရိုးတွင် ရာခိုင်နှုန်းညီတူ ခွဲပြမည့် အညွှန်း (၅) ခု
  const step = (points.length - 1) / 4;
  const axisIndices = [0, Math.round(step), Math.round(step * 2), Math.round(step * 3), points.length - 1];

  return { points, pathD, areaD, axisIndices };
}