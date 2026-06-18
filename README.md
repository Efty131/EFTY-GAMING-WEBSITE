# EFTY Gaming Website

A dynamic React website for the [Efty Gaming YouTube channel](https://www.youtube.com/@Efty-v8s) that automatically fetches and displays the latest videos using the YouTube RSS feed.

## Features

- **Dynamic Video Grid** — Latest 6 videos automatically loaded from YouTube RSS feed
- **Animated Neon UI** — Glowing gradient borders, color-shifting text, glassmorphism nav
- **Responsive Design** — Mobile-first with animated hamburger menu
- **Auto-Refresh** — Videos update on every page load (no API key needed)
- **Loading States** — Skeleton placeholders while videos are fetching

## Tech Stack

- React 19
- Tailwind CSS 3
- Lucide React (icons)
- YouTube RSS Feed (no API key required)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## How It Works

The site fetches videos from YouTube's public RSS feed:
```
https://www.youtube.com/feeds/videos.xml?channel_id=UCzG_Y0IqXokVPDhe20hI_UQ
```

This is parsed client-side using `DOMParser` and rendered in a responsive grid with glowing gradient borders. A CORS proxy (`corsproxy.io`) is used to handle cross-origin restrictions.

## Configuration

Channel settings are in `src/config.js`:
- `CHANNEL_ID` — Your YouTube channel ID
- `CHANNEL_HANDLE` — Your @handle
- `CORS_PROXY` — CORS proxy URL (change if `corsproxy.io` is unavailable)

## Project Structure

```
src/
├── config.js                  # Channel ID and API config
├── services/youtube.js        # RSS feed parser
├── hooks/useYouTubeVideos.js  # React hook for video data
├── components/
│   ├── GamingHero.jsx         # Main page component
│   ├── VideoCard.jsx          # Individual video card with glow effect
│   └── VideoSkeleton.jsx      # Loading skeleton placeholder
├── App.js                     # Root component
└── index.css                  # Tailwind + custom animations
```

## Deployment

Deployed on Vercel: https://efty-gaming-website-4h5ye7eov-efty131s-projects.vercel.app/

## License

Private — Efty Gaming
