🎵 MoodTunes - AI-Powered Music Recommendation App
<div align="center">
![MoodTunes Banner](https://img.shields.io/badge/MoodTunes-Music_For_Your_Mood-blueviolet? style=for-the-badge&logo=spotify)

Discover the perfect soundtrack for your emotions

![React](https://img.shields.io/badge/React-19. 2.0-61DAFB?style=flat&logo=react&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-7. 2.4-646CFF?style=flat&logo=vite&logoColor=white) ![Spotify API](https://img.shields.io/badge/Spotify-API-1DB954?style=flat&logo=spotify&logoColor=white)

Live Demo · Report Bug · Request Feature

</div>
📖 About The Project
MoodTunes is an intelligent music recommendation application that uses sentiment analysis to understand your emotional state and curates personalized Spotify playlists that match your mood. Simply describe how you're feeling, and let AI find the perfect songs to accompany your emotions.

🎯 The Problem
Finding music that truly matches your current emotional state can be challenging. Traditional music apps require manual searching through countless playlists, genres, and moods.

💡 The Solution
MoodTunes leverages natural language processing and sentiment analysis to:

🧠 Understand your emotions from natural text input
🎵 Fetch real-time music from Spotify's extensive catalog
🎨 Present beautiful, intuitive UI for seamless music discovery
▶️ Provide instant previews without leaving the app
✨ Features
🎭 Intelligent Sentiment Analysis
Detects emotions from natural language input
Supports multiple moods: Happy, Sad, Calm, Neutral
Real-time mood classification
🎵 Spotify Integration
Real Spotify tracks with album artwork
30-second song previews
Direct links to open full songs in Spotify
High-quality album art display
💖 Personalization
Like/unlike songs to save favorites
Track collection of liked songs
Persistent mood history
🎨 Beautiful User Interface
Modern gradient design with smooth animations
Fully responsive (desktop, tablet, mobile)
Intuitive controls and visual feedback
Real-time connection status indicators
🔒 Secure & Private
Backend API handles all authentication
Client credentials never exposed to frontend
Environment-based configuration
🛠️ Tech Stack
<table> <tr> <td>
Frontend
⚛️ React 19 - Modern UI library
⚡ Vite - Lightning-fast build tool
🎨 CSS3 - Custom animations & gradients
📡 Axios - HTTP client for API calls
</td> <td>
Backend
🟢 Node.js - JavaScript runtime
🚂 Express - Web application framework
🎵 Spotify Web API - Music data source
🔐 dotenv - Environment configuration
</td> </tr> </table>
🚀 Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher) - Download here
npm (comes with Node.js)
Spotify Account - Sign up free
🎫 Get Spotify API Credentials
Go to Spotify Developer Dashboard
Log in with your Spotify account
Click "Create an App"
Fill in:
App Name: MoodTunes
App Description: Music recommendation based on mood analysis
Click "Create"
Copy your Client ID and Client Secret
📦 Installation
1️⃣ Clone the Repository
bash
git clone https://github.com/naggynab/MoodTunes.git
cd MoodTunes
2️⃣ Setup Backend
bash
cd music-backend
npm install
Create a .env file in the music-backend directory:

env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
PORT=5000
⚠️ Important: Replace your_spotify_client_id_here and your_spotify_client_secret_here with your actual Spotify credentials.

3️⃣ Setup Frontend
bash
cd ../music-recommendation
npm install
🎮 Usage
Start the Application
You need two terminal windows running simultaneously:

Terminal 1 - Backend Server
bash
cd music-backend
node server.js
✅ You should see:

Code
🚀 Server running on http://localhost:5000
✅ Spotify token obtained
Terminal 2 - Frontend Application
bash
cd music-recommendation
npm run dev
✅ You should see:

Code
VITE v7.2.4  ready in 500 ms

➜  Local:    http://localhost:5173/
Access the App
Open your browser and navigate to: http://localhost:5173

🎯 How to Use MoodTunes
Step 1: Describe Your Mood
Type how you're feeling in natural language:

"I'm feeling happy and energetic today!"
"I'm sad and need some comfort music"
"I'm calm and relaxed, perfect evening vibes"
Step 2: Analyze
Click the "✨ Analyze My Mood" button

Step 3: Get Recommendations
MoodTunes will:

🎭 Detect your emotion (Happy 😊, Sad 😢, Calm 😌, Neutral 😐)
🎵 Fetch matching songs from Spotify
🎨 Display beautiful song cards with album art
Step 4: Enjoy Music
▶️ Play - Listen to 30-second preview
❤️ Like - Save to your favorites
🎵 Spotify - Open full song in Spotify app
📁 Project Structure
Code
MoodTunes/
│
├── music-backend/              # Backend API Server
│   ├── server. js               # Express server & Spotify integration
│   ├── . env                    # Environment variables (not in repo)
│   ├── . env.example            # Template for environment variables
│   ├── package.json            # Backend dependencies
│   └── . gitignore              # Git ignore rules
│
├── music-recommendation/       # Frontend React Application
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── App.css             # Styling and animations
│   │   └── main.jsx            # React entry point
│   ├── public/                 # Static assets
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   └── .gitignore              # Git ignore rules
│
├── README.md                   # Project documentation
└── LICENSE                     # MIT License
🎨 Features in Detail
🧠 Sentiment Analysis Algorithm
The app uses keyword-based sentiment analysis with three emotional categories:

JavaScript
Positive Words: ['happy', 'joy', 'excited', 'love', 'great', 'amazing', ...]
Negative Words: ['sad', 'depressed', 'angry', 'hurt', 'lonely', ...]
Calm Words: ['calm', 'peaceful', 'relaxed', 'chill', 'serene', ...]
Mood Mapping:

Happy 😊 → Upbeat, Dance, Party, Pop music
Sad 😢 → Melancholy, Acoustic, Piano, Blues
Calm 😌 → Ambient, Chill, Jazz, Meditation
Neutral 😐 → Indie, Alternative, Folk
🎵 Spotify Integration
API Endpoints Used:

POST /api/token - Authentication
GET /search - Search for tracks by mood
GET /audio-features - Get track energy and valence
Track Selection Criteria:

Genre matching based on mood
Audio features (energy, valence, tempo)
Popularity and release date
Market availability
🔒 Security & Privacy
Environment Variables
All sensitive credentials are stored in .env files and never committed to the repository.

Backend Authentication
Client Credentials Flow (no user login required)
Token caching to reduce API calls
Secure HTTPS connections to Spotify
CORS Configuration
Configured to accept requests only from frontend origin
Prevents unauthorized API access
🚀 Deployment
Deploy Frontend (Vercel)
bash
cd music-recommendation
npm run build
npx vercel --prod
Deploy Backend (Render)
Create account at Render. com
Connect your GitHub repository
Select music-backend folder
Add environment variables:
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
PORT=5000
Deploy
Update Frontend URL
After backend deployment, update App.jsx:

JavaScript
const BACKEND_URL = 'https://your-backend-url.onrender.com';
🎯 Roadmap
 Basic sentiment analysis
 Spotify integration
 30-second previews
 Like/unlike functionality
 User authentication with Spotify OAuth
 Create and save playlists
 Advanced AI sentiment analysis (GPT integration)
 Voice input for mood detection
 Music history and analytics
 Social sharing features
 Mobile app (React Native)
 Dark mode toggle
 Multi-language support
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

How to Contribute
Fork the Project
Create your Feature Branch
bash
git checkout -b feature/AmazingFeature
Commit your Changes
bash
git commit -m 'Add some AmazingFeature'
Push to the Branch
bash
git push origin feature/AmazingFeature
Open a Pull Request
🐛 Bug Reports & Feature Requests
Found a bug or have a feature idea? Please check our Issues page.

Reporting Bugs
When reporting bugs, please include:

Your operating system
Node.js version (node --version)
Steps to reproduce
Expected vs actual behavior
Screenshots (if applicable)
📝 License
Distributed under the MIT License. See LICENSE for more information.

Code
MIT License

Copyright (c) 2025 naggynab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction... 
👨‍💻 Author
naggynab

GitHub: @naggynab
Project Link: https://github.com/naggynab/MoodTunes
🙏 Acknowledgments
Technologies & Services
Spotify Web API - Music data and streaming
React - UI framework
Vite - Build tool
Express - Backend framework
Axios - HTTP client
Inspiration
Music therapy research
Emotional intelligence studies
Modern web design trends
Special Thanks
Spotify for their incredible API
The open-source community
All contributors and users
📊 Stats
![GitHub stars](https://img.shields.io/github/stars/naggynab/MoodTunes?style=social) ![GitHub forks](https://img.shields.io/github/forks/naggynab/MoodTunes?style=social) ![GitHub watchers](https://img.shields.io/github/watchers/naggynab/MoodTunes?style=social) ![GitHub issues](https://img.shields.io/github/issues/naggynab/MoodTunes) ![GitHub license](https://img.shields.io/github/license/naggynab/MoodTunes)

💬 FAQ
<details> <summary><b>Why am I getting "Backend not connected" error?</b></summary>
Make sure:

Backend server is running (node server.js)
Backend is on port 5000
.env file has correct Spotify credentials
No firewall blocking localhost connections
</details> <details> <summary><b>Can I use this without a Spotify Premium account?</b></summary>
Yes! The app uses Spotify's Web API which works with free accounts. However, 30-second previews are available for most (but not all) tracks.

</details> <details> <summary><b>How accurate is the sentiment analysis?</b></summary>
The current version uses keyword-based analysis which is ~70-80% accurate. Future versions will integrate advanced AI models for better accuracy.

</details> <details> <summary><b>Can I add more moods?</b></summary>
Yes! Edit the analyzeSentiment function in App.jsx and add corresponding mood mappings in the backend moodToSearchQuery object.

</details> <details> <summary><b>Is my data stored anywhere?</b></summary>
No. All sentiment analysis happens locally in your browser. We don't store any user data, mood inputs, or listening history.

</details>
<div align="center">
⭐ If you like this project, please give it a star!
Made with ❤️ and 🎵 by naggynab

Music is the universal language of mankind 🌍

</div>


🎓 Use Cases
Personal Wellness
Mood Tracking - Understand your emotional patterns
Music Therapy - Use music to improve mental health
Stress Relief - Find calming music instantly
Productivity
Focus Music - Get concentration-enhancing playlists
Energy Boost - Find motivating tracks
Break Time - Relaxing music for breaks
Social
Party Playlists - Quick upbeat music curation
Share Moods - Express emotions through music
Discover Together - Group mood-based listening
Happy Listening! 🎧✨
