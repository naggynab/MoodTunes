// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env. SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env. SPOTIFY_CLIENT_SECRET;

let spotifyToken = '';
let tokenExpiry = 0;

// Get Spotify Token
const getSpotifyToken = async () => {
  if (Date.now() < tokenExpiry) {
    return spotifyToken;
  }

  try {
    const credentials = Buffer. from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
      }
    });

    spotifyToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    
    console.log('✅ Spotify token obtained');
    return spotifyToken;
  } catch (error) {
    console.error('❌ Error getting token:', error.response?.data || error.message);
    throw error;
  }
};

// Initialize token on startup
getSpotifyToken();

// API endpoint to search songs
app.get('/api/search-songs', async (req, res) => {
  const { mood } = req.query;

  const moodToSearchQuery = {
    happy: ['happy', 'upbeat', 'party', 'dance', 'feel good'],
    sad: ['sad', 'melancholy', 'emotional', 'heartbreak'],
    calm: ['relaxing', 'chill', 'peaceful', 'ambient', 'meditation'],
    neutral: ['popular', 'indie', 'alternative']
  };

  try {
    const token = await getSpotifyToken();
    const searchQueries = moodToSearchQuery[mood] || ['popular'];
    const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];

    const response = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/search',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q:  randomQuery,
        type: 'track',
        limit: 12,
        market: 'US'
      }
    });

    res.json(response.data. tracks.items);
  } catch (error) {
    console.error('Error searching Spotify:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', spotify: !!spotifyToken });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});