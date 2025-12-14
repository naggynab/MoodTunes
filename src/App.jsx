import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const MusicRecommendation = () => {
  const [userInput, setUserInput] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [backendConnected, setBackendConnected] = useState(false);

  const BACKEND_URL = 'http://localhost:5000';

  // Check backend connection
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/health`);
        if (response.data.status === 'ok') {
          setBackendConnected(true);
          console.log('✅ Backend connected');
        }
      } catch (error) {
        console.error('❌ Backend not connected:', error. message);
        setBackendConnected(false);
      }
    };

    checkBackend();
  }, []);

  // ==================== SENTIMENT ANALYSIS ====================
  const analyzeSentiment = (text) => {
    const positiveWords = ['happy', 'joy', 'excited', 'love', 'great', 'amazing', 'wonderful', 'fantastic', 'energetic', 'cheerful', 'awesome', 'thrilled', 'delighted'];
    const negativeWords = ['sad', 'depressed', 'angry', 'hate', 'terrible', 'awful', 'lonely', 'hurt', 'pain', 'broken', 'devastated', 'miserable'];
    const calmWords = ['calm', 'peaceful', 'relaxed', 'tired', 'sleepy', 'chill', 'mellow', 'quiet', 'serene', 'tranquil'];

    const lowerText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;
    let calmCount = 0;

    positiveWords.forEach(word => {
      if (lowerText. includes(word)) positiveCount++;
    });
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });
    calmWords.forEach(word => {
      if (lowerText.includes(word)) calmCount++;
    });

    if (positiveCount > negativeCount && positiveCount > calmCount) {
      return { mood: 'happy', emoji: '😊', color: '#FFD93D' };
    } else if (negativeCount > positiveCount) {
      return { mood: 'sad', emoji: '😢', color: '#6C7A89' };
    } else if (calmCount > positiveCount) {
      return { mood: 'calm', emoji: '😌', color: '#95E1D3' };
    } else {
      return { mood: 'neutral', emoji: '😐', color: '#A8E6CF' };
    }
  };

  const moodToColorMap = {
    happy:  '#FFD93D',
    sad: '#6C7A89',
    calm: '#95E1D3',
    neutral:  '#A8E6CF'
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  // ==================== SEARCH SPOTIFY VIA BACKEND ====================
  const searchSpotifyByMood = async (mood) => {
    try {
      console.log(`🔍 Searching for ${mood} songs...`);

      const response = await axios.get(`${BACKEND_URL}/api/search-songs`, {
        params: { mood }
      });

      const tracks = response.data;
      console.log(`✅ Found ${tracks.length} tracks`);

      const formattedTracks = tracks.map(track => ({
        id:  track.id,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        genre: mood. charAt(0).toUpperCase() + mood.slice(1),
        duration: formatDuration(track.duration_ms),
        image: track.album.images[0]?.url || '🎵',
        color: moodToColorMap[mood] || '#A8E6CF',
        preview_url: track.preview_url,
        spotify_url: track.external_urls.spotify
      }));

      return formattedTracks;
    } catch (error) {
      console.error('❌ Error searching Spotify:', error);
      alert('Failed to fetch songs.  Make sure backend is running!');
      return [];
    }
  };

  // ==================== HANDLE ANALYZE ====================
  const handleAnalyze = async () => {
    if (!userInput. trim()) return;

    if (!backendConnected) {
      alert('Backend not connected!  Make sure server is running on port 5000');
      return;
    }

    setIsAnalyzing(true);

    try {
      const sentimentResult = analyzeSentiment(userInput);
      setSentiment(sentimentResult);

      const spotifyTracks = await searchSpotifyByMood(sentimentResult. mood);
      setRecommendations(spotifyTracks);
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ==================== PLAYBACK CONTROLS ====================
  const handlePlay = (song) => {
    if (currentlyPlaying?. id === song.id) {
      setCurrentlyPlaying(null);
      const audio = document.getElementById('audio-player');
      if (audio) audio.pause();
    } else {
      setCurrentlyPlaying(song);
      if (song.preview_url) {
        const audio = document.getElementById('audio-player');
        if (audio) {
          audio.src = song.preview_url;
          audio. play();
        }
      } else {
        alert('Preview not available. Click 🎵 to open in Spotify!');
      }
    }
  };

  const handleLike = (song) => {
    if (likedSongs.find(s => s.id === song.id)) {
      setLikedSongs(likedSongs.filter(s => s. id !== song.id));
    } else {
      setLikedSongs([...likedSongs, song]);
    }
  };

  const isLiked = (songId) => {
    return likedSongs. some(s => s.id === songId);
  };

  const openSpotify = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="app-container">
      <audio id="audio-player" />

      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🎵</span>
          <h1 className="logo-text">MoodTunes</h1>
        </div>
        <div className="header-stats">
          <span className="stat-badge">❤️ {likedSongs.length}</span>
          {backendConnected ?  (
            <span className="stat-badge">✅ Connected</span>
          ) : (
            <span className="stat-badge stat-error">❌ Offline</span>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">How are you feeling today?</h2>
          <p className="hero-subtitle">Tell us your mood, and we'll find the perfect soundtrack for your day</p>

          <div className="input-container">
            <textarea
              className="mood-input"
              placeholder="Describe your mood...  (e.g., 'I'm feeling happy and energetic today!' or 'I'm sad and need some comfort')"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={4}
            />
            <button
              className={`analyze-button ${isAnalyzing ?  'analyzing' : ''}`}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !userInput.trim() || !backendConnected}
            >
              {isAnalyzing ? (
                <>
                  <span className="spinner"></span>
                  Analyzing... 
                </>
              ) : (
                <>
                  <span className="button-icon">✨</span>
                  Analyze My Mood
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Sentiment Result */}
      {sentiment && (
        <section className="sentiment-section">
          <div className="sentiment-card" style={{ borderColor: sentiment. color }}>
            <div className="sentiment-emoji">{sentiment. emoji}</div>
            <div className="sentiment-info">
              <h3 className="sentiment-title">
                Your Mood: <span style={{ color: sentiment.color }}>{sentiment.mood. toUpperCase()}</span>
              </h3>
              <p className="sentiment-description">
                {sentiment.mood === 'happy' && "Let's keep that energy going with some upbeat tracks! "}
                {sentiment.mood === 'sad' && "We've got some comforting songs to help you through."}
                {sentiment.mood === 'calm' && "Perfect!  Here are some relaxing tunes for you."}
                {sentiment. mood === 'neutral' && "Let's find something to match your vibe! "}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="recommendations-section">
          <h3 className="section-title">
            <span className="title-icon">🎧</span>
            Recommended for You
          </h3>

          <div className="songs-grid">
            {recommendations.map((song) => (
              <div
                key={song.id}
                className={`song-card ${currentlyPlaying?.id === song.id ? 'playing' : ''}`}
                style={{ borderTopColor: song.color }}
              >
                <div className="song-image-container">
                  {typeof song.image === 'string' && song.image.startsWith('http') ? (
                    <img src={song.image} alt={song.title} className="song-album-art" />
                  ) : (
                    <div className="song-image">{song.image}</div>
                  )}
                </div>

                <div className="song-details">
                  <h4 className="song-title">{song.title}</h4>
                  <p className="song-artist">{song.artist}</p>
                  <div className="song-meta">
                    <span className="song-genre">{song.genre}</span>
                    <span className="song-duration">{song.duration}</span>
                  </div>
                </div>

                <div className="song-actions">
                  <button
                    className={`action-button like-button ${isLiked(song.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(song)}
                    title={isLiked(song.id) ? "Unlike" : "Like"}
                  >
                    {isLiked(song.id) ? '❤️' : '🤍'}
                  </button>

                  {song.preview_url && (
                    <button
                      className="action-button play-button"
                      onClick={() => handlePlay(song)}
                      title="Play Preview"
                    >
                      {currentlyPlaying?.id === song.id ? '⏸️' : '▶️'}
                    </button>
                  )}

                  <button
                    className="action-button spotify-button"
                    onClick={() => openSpotify(song. spotify_url)}
                    title="Open in Spotify"
                  >
                    🎵
                  </button>
                </div>

                {currentlyPlaying?.id === song.id && (
                  <div className="playing-indicator">
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Now Playing Bar */}
      {currentlyPlaying && (
        <div className="now-playing-bar">
          <div className="now-playing-content">
            {typeof currentlyPlaying.image === 'string' && currentlyPlaying.image. startsWith('http') ? (
              <img src={currentlyPlaying.image} alt={currentlyPlaying.title} className="now-playing-thumbnail" />
            ) : (
              <span className="now-playing-icon">{currentlyPlaying.image}</span>
            )}
            <div className="now-playing-info">
              <p className="now-playing-title">{currentlyPlaying.title}</p>
              <p className="now-playing-artist">{currentlyPlaying.artist}</p>
            </div>
          </div>
          <div className="now-playing-controls">
            <button className="control-button" onClick={() => handlePlay(currentlyPlaying)}>
              ⏸️
            </button>
            <button className="control-button" onClick={() => openSpotify(currentlyPlaying.spotify_url)}>
              🎵
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ and AI • MoodTunes © 2025 • Powered by Spotify</p>
      </footer>
    </div>
  );
};

export default MusicRecommendation;