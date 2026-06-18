/**
 * Fetches YouTube videos from the serverless API route.
 * Falls back to CORS proxy for local development without Vercel.
 */
export async function fetchYouTubeVideos() {
  // Try the Vercel serverless function first (no CORS issues)
  try {
    const response = await fetch('/api/youtube');
    if (response.ok) {
      const data = await response.json();
      if (data.videos) return data.videos;
    }
  } catch {
    // API route not available (local dev without Vercel), fall through
  }

  // Fallback: CORS proxy (for local development with npm start)
  const { CORS_PROXY, RSS_FEED_URL } = await import('../config');
  const proxyResponse = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_FEED_URL)}`);

  if (!proxyResponse.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${proxyResponse.status}`);
  }

  const xmlText = await proxyResponse.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error('Failed to parse YouTube feed XML');
  }

  const entries = xmlDoc.querySelectorAll('entry');
  const videos = [];

  entries.forEach((entry) => {
    const videoId = entry.querySelector('yt\\:videoId, videoId')?.textContent;
    const title = entry.querySelector('title')?.textContent;
    const publishedAt = entry.querySelector('published')?.textContent;
    const link = entry.querySelector('link[rel="alternate"]')?.getAttribute('href') || '';
    const thumbnail = entry.querySelector('media\\:thumbnail, thumbnail')?.getAttribute('url');
    const description = entry.querySelector('media\\:description, description')?.textContent;
    const views = entry.querySelector('media\\:statistics, statistics')?.getAttribute('views');

    const isShort = link.includes('/shorts/');

    if (videoId && title && !isShort) {
      videos.push({
        videoId,
        title,
        publishedAt,
        thumbnail: thumbnail || `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        description: description || '',
        views: parseInt(views || '0', 10),
        url: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  });

  return videos;
}
