export function extractYouTubeId(url: string): string {
  if (!url || url === "PASTE_YOUTUBE_URL_HERE") return "";
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  try {
    const urlObj = new URL(url);
    const vParam = urlObj.searchParams.get("v");
    if (vParam && vParam.length === 11) {
      return vParam;
    }
  } catch (e) {}
  
  return "";
}

export function getYouTubeThumbnail(youtubeId: string, quality: "default" | "mq" | "hq" | "sd" | "maxres" = "mq"): string {
  if (!youtubeId) return "";
  const qualityMap = {
    default: "default",
    mq: "mqdefault",
    hq: "hqdefault",
    sd: "sddefault",
    maxres: "maxresdefault",
  };
  return `https://img.youtube.com/vi/${youtubeId}/${qualityMap[quality]}.jpg`;
}

export function getYouTubeEmbedUrl(youtubeId: string, autoplay: boolean = false): string {
  if (!youtubeId) return "";
  return `https://www.youtube.com/embed/${youtubeId}${autoplay ? "?autoplay=1" : ""}`;
}

export function getYouTubeWatchUrl(youtubeId: string): string {
  if (!youtubeId) return "";
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}
