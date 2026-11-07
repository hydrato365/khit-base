export async function getVideos() {
  try {
    const res = await fetch("https://backend-tester-3glc.onrender.com/videos", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((v: any) => ({
      id: v.id,
      title: v.title,
      desc: v.description || "No description provided",
      duration: "HLS 720p",
      category: "Entertainment",
      status: "Ready",
      date: new Date(v.created_at).toLocaleDateString(),
      views: v.views.toLocaleString(),
      stars: "0",
      isVip: v.is_premium || false,
      thumbGradient: "from-purple-950 via-zinc-900 to-indigo-950",
    }));
  } catch (err) {
    return [];
  }
}