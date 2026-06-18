import { useState, useEffect } from 'react';
import { fetchYouTubeVideos } from '../services/youtube';

/**
 * Custom hook to fetch latest YouTube videos from RSS feed.
 * Refreshes on every page load (component mount).
 *
 * Returns: { videos, loading, error }
 */
export function useYouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadVideos() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchYouTubeVideos();
        if (!cancelled) {
          setVideos(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load YouTube videos:', err);
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVideos();

    return () => {
      cancelled = true;
    };
  }, []);

  return { videos, loading, error };
}
