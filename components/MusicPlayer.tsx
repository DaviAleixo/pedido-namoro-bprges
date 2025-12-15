import React from 'react';
import { SPOTIFY_TRACK_ID } from '../constants';

const MusicPlayer: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-md mx-auto py-2">
        <iframe
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          title="Spotify Music Player"
          className="shadow-sm"
          loading="eager"
        ></iframe>
      </div>
    </div>
  );
};

export default MusicPlayer;