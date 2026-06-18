const CHANNEL_ID = 'UCzG_Y0IqXokVPDhe20hI_UQ';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(RSS_URL);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch YouTube feed' });
    }

    const xmlText = await response.text();

    // Parse XML
    const { parseString } = await import('xml2js');
    const result = await new Promise((resolve, reject) => {
      parseString(xmlText, { explicitArray: false }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const entries = result?.feed?.entry;
    if (!entries) {
      return res.status(200).json({ videos: [] });
    }

    // Normalize to array (single entry comes as object, multiple as array)
    const entryList = Array.isArray(entries) ? entries : [entries];

    const videos = entryList
      .filter((entry) => {
        // Filter out Shorts
        const link = entry?.link?.['$']?.href || '';
        return !link.includes('/shorts/');
      })
      .map((entry) => {
        const videoId = entry?.['yt:videoId'] || entry?.['yt:videoId']?.['_'];
        const title = entry?.title || '';
        const publishedAt = entry?.published || '';
        const link = entry?.link?.['$']?.href || `https://www.youtube.com/watch?v=${videoId}`;
        const thumbnail = entry?.['media:group']?.['media:thumbnail']?.['$']?.url
          || `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const description = entry?.['media:group']?.['media:description']?.['_'] || '';
        const views = parseInt(entry?.['media:group']?.['media:statistics']?.['$']?.views || '0', 10);

        return {
          videoId,
          title,
          publishedAt,
          thumbnail,
          description,
          views,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      });

    return res.status(200).json({ videos });
  } catch (error) {
    console.error('YouTube API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
