import { CORS_PROXY, RSS_FEED_URL } from '../config';

/**
 * Fetches and parses the YouTube RSS feed.
 * Returns an array of video objects with title, thumbnail, videoId, and publishedAt.
 */
export async function fetchYouTubeVideos() {
  const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_FEED_URL)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  // Check for parse errors
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

    // Skip YouTube Shorts (link contains /shorts/)
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
