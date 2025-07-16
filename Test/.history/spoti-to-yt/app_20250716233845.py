import streamlit as st
import spoti
from spoti import get_spotify_tracks, process_tracks_in_chunks, YouTubeService
import time
from datetime import datetime
from urllib.parse import urlencode

# Set page config
st.set_page_config(
    page_title="Spotify to YouTube Converter",
    page_icon="🎵",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Add popup authentication handling JavaScript
st.markdown("""
    <script>
        function openAuthPopup(url) {
            const width = 600;
            const height = 700;
            const left = (screen.width / 2) - (width / 2);
            const top = (screen.height / 2) - (height / 2);
            
            window.authPopup = window.open(
                url,
                'GoogleAuth',
                `width=${width},height=${height},left=${left},top=${top}`
            );
            
            window.addEventListener('message', function(event) {
                if (event.data.type === 'oauth-response') {
                    window.authPopup.close();
                    window.location.reload();
                }
            });
        }
    </script>
""", unsafe_allow_html=True)

# Custom CSS with popup styles
st.markdown("""
    <style>
    /* Main app styling */
    .stApp {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        color: #ffffff;
        background-image: 
            linear-gradient(45deg, #ff00ff05 25%, transparent 25%),
            linear-gradient(-45deg, #00ffff05 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ff00ff05 75%),
            linear-gradient(-45deg, transparent 75%, #00ffff05 75%);
        background-size: 20px 20px;
    }
    
    /* Cyberpunk title background */
    .title-container {
        text-align: center;
        margin-bottom: 2rem;
        padding: 2rem;
        position: relative;
        overflow: hidden;
        background: linear-gradient(45deg, #000000, #1a1a1a);
        border-radius: 10px;
        box-shadow: 0 0 20px #ff00ff33, 0 0 40px #00ffff33;
    }
    
    .title-container::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: repeating-linear-gradient(
            45deg,
            #ff00ff22,
            #00ffff22 10px,
            #ffffff11 10px,
            #ffffff11 20px
        );
        animation: cyberpunk-bg 20s linear infinite;
        z-index: 1;
    }
    
    @keyframes cyberpunk-bg {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .animated-title {
        font-size: 2.5rem;
        color: #ffffff;
        margin-bottom: 0.5rem;
        position: relative;
        z-index: 2;
        text-shadow: 
            2px 2px 4px #ff00ff,
            -2px -2px 4px #00ffff,
            0 0 20px #ff00ff77;
    }
    
    .animated-emoji {
        display: inline-block;
        animation: bounce 2s infinite;
        margin: 0 5px;
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    /* Main grid layout */
    .main-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    
    /* Input styling */
    .stTextInput>div>div>input {
        background: rgba(20, 20, 20, 0.8);
        border: 2px solid #00ffff44;
        border-radius: 10px;
        padding: 0.8rem;
        font-size: 1rem;
        color: #ffffff;
        transition: all 0.3s;
    }
    
    .stTextInput>div>div>input:focus {
        border-color: #00ffff;
        box-shadow: 0 0 15px #00ffff55;
    }
    
    .stTextInput>div>div>input::placeholder {
        color: #ffffff77;
    }
    
    /* Button styling */
    .stButton>button {
        background: linear-gradient(45deg, #ff00ff, #00ffff);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 0.8rem 2rem;
        font-weight: 600;
        width: 100%;
        transition: all 0.3s;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    
    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 20px #ff00ff55, 0 0 40px #00ffff55;
    }
    
    /* Progress bar */
    .stProgress > div > div {
        background: linear-gradient(45deg, #ff00ff, #00ffff);
    }
    
    /* Info cards */
    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .info-card {
        background: rgba(20, 20, 20, 0.8);
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 0 10px #ff00ff33, 0 0 20px #00ffff33;
        border: 1px solid #ffffff22;
        backdrop-filter: blur(10px);
    }
    
    .info-title {
        font-size: 1rem;
        color: #00ffff;
        margin-bottom: 0.5rem;
        font-weight: 600;
        text-shadow: 0 0 10px #00ffff77;
    }
    
    .info-item {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 6px;
        margin: 0.3rem 0;
        font-size: 0.9rem;
        border: 1px solid #ffffff11;
        transition: all 0.3s;
    }
    
    .info-item:hover {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 10px #ff00ff33;
    }
    
    .info-item span {
        margin-right: 8px;
        font-size: 1rem;
    }
    
    h3 {
        color: #00ffff !important;
        text-shadow: 0 0 10px #00ffff77;
    }
    
    /* Spinner styling */
    .stSpinner > div {
        border-color: #ff00ff #00ffff #ff00ff #00ffff !important;
    }
    
    /* Success/Error message styling */
    .stSuccess {
        background: rgba(0, 255, 255, 0.1) !important;
        border: 1px solid #00ffff44 !important;
        color: #ffffff !important;
    }
    
    .stError {
        background: rgba(255, 0, 255, 0.1) !important;
        border: 1px solid #ff00ff44 !important;
        color: #ffffff !important;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* Auth popup overlay */
    .auth-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        backdrop-filter: blur(5px);
    }
    
    .auth-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(20, 20, 20, 0.95);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 0 30px #ff00ff55, 0 0 60px #00ffff55;
        border: 1px solid #ffffff22;
        text-align: center;
        z-index: 1001;
    }
    
    .auth-popup h2 {
        color: #00ffff;
        text-shadow: 0 0 10px #00ffff77;
        margin-bottom: 1rem;
    }
    
    .auth-popup p {
        color: #ffffff;
        margin-bottom: 1.5rem;
    }
    
    .auth-button {
        background: linear-gradient(45deg, #ff00ff, #00ffff);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 0.8rem 2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    
    .auth-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 20px #ff00ff55, 0 0 40px #00ffff55;
    }
    </style>
    
    <div class="title-container">
        <h1 class="animated-title">
            <span class="animated-emoji">🎵</span>
            Spotify to YouTube Converter
            <span class="animated-emoji">🎥</span>
        </h1>
        <p style="color: #fff; position: relative; z-index: 2; text-shadow: 0 0 10px #ffffff77;">Transform your playlists with just one click!</p>
    </div>
    
    <div class="main-grid">
        <div>
            <h3 style="margin-bottom: 1rem;">Convert Your Playlist</h3>
""", unsafe_allow_html=True)

# Input fields
spotify_url = st.text_input(
    "Spotify Playlist URL",
    placeholder="Paste your Spotify playlist URL here...",
    key="spotify_url"
)

playlist_name = st.text_input(
    "YouTube Playlist Name",
    placeholder="Enter a name for your YouTube playlist...",
    key="playlist_name"
)

# Convert button
convert_col = st.container()
with convert_col:
    if st.button("✨ Convert Playlist", key="convert"):
        if not spotify_url or not playlist_name:
            st.error("Please fill in both fields!")
        else:
            try:
                progress = st.progress(0)
                
                with st.spinner("🎵 Fetching tracks from Spotify..."):
                    tracks = get_spotify_tracks(spotify_url)
                    progress.progress(25)
                    st.success(f"Found {len(tracks)} tracks!")
                
                with st.spinner("🎥 Searching on YouTube..."):
                    video_ids = process_tracks_in_chunks(tracks)
                    progress.progress(50)
                
                if video_ids:
                    with st.spinner("📝 Creating playlist..."):
                        try:
                            if not st.session_state.yt_service.is_authenticated():
                                auth_url = st.session_state.yt_service.get_auth_url()
                                st.markdown(f"""
                                    <div class="auth-overlay" id="authOverlay">
                                        <div class="auth-popup">
                                            <h2>YouTube Authentication Required</h2>
                                            <p>Please authenticate with your Google account to create the playlist</p>
                                            <button class="auth-button" onclick="openAuthPopup('{auth_url}')">
                                                Sign in with Google
                                            </button>
                                        </div>
                                    </div>
                                    <script>
                                        document.getElementById('authOverlay').style.display = 'block';
                                    </script>
                                """, unsafe_allow_html=True)
                                st.stop()
                            
                            playlist_id = st.session_state.yt_service.create_playlist(
                                playlist_name,
                                "Transferred from Spotify"
                            )
                            progress.progress(75)
                        
                            with st.spinner("📤 Adding videos..."):
                                successful, failed = st.session_state.yt_service.add_videos_to_playlist(
                                    playlist_id, video_ids, progress
                                )
                                progress.progress(100)
                            
                            st.success(f"🎉 Successfully transferred {successful} tracks!")
                            st.markdown(f"""
                                <a href="https://www.youtube.com/playlist?list={playlist_id}" 
                                   target="_blank" 
                                   style="display: inline-block; 
                                          background: linear-gradient(45deg, #ff00ff, #00ffff);
                                          color: white;
                                          padding: 10px 20px;
                                          border-radius: 8px;
                                          text-decoration: none;
                                          text-align: center;
                                          width: 100%;
                                          margin-top: 10px;
                                          box-shadow: 0 0 10px #ff00ff33, 0 0 20px #00ffff33;">
                                    🎵 Open in YouTube
                                </a>
                            """, unsafe_allow_html=True)
                        except Exception as e:
                            if "authentication required" in str(e).lower():
                                auth_url = st.session_state.yt_service.get_auth_url()
                                st.markdown(f"""
                                    <div class="auth-overlay" id="authOverlay">
                                        <div class="auth-popup">
                                            <h2>YouTube Authentication Required</h2>
                                            <p>Please authenticate with your Google account to create the playlist</p>
                                            <button class="auth-button" onclick="openAuthPopup('{auth_url}')">
                                                Sign in with Google
                                            </button>
                                        </div>
                                    </div>
                                    <script>
                                        document.getElementById('authOverlay').style.display = 'block';
                                    </script>
                                """, unsafe_allow_html=True)
                                st.stop()
                            else:
                                st.error(f"An error occurred: {str(e)}")
                else:
                    st.error("No matching videos found")
            
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

# Right side info cards using Streamlit components
col1, col2 = st.columns(2)

with col1:
    st.markdown("""
        <div class="info-card">
            <div class="info-title">✨ Features</div>
            <div class="info-item"><span>🎵</span> Convert any public playlist</div>
            <div class="info-item"><span>🎥</span> Smart video matching</div>
            <div class="info-item"><span>📊</span> Real-time progress</div>
        </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
        <div class="info-card">
            <div class="info-title">💡 Tips</div>
            <div class="info-item"><span>🔒</span> Use public playlists</div>
            <div class="info-item"><span>📝</span> Clear playlist names</div>
            <div class="info-item"><span>⏳</span> Be patient for large lists</div>
        </div>
    """, unsafe_allow_html=True)

# Initialize YouTube service in session state
if 'yt_service' not in st.session_state:
    st.session_state.yt_service = YouTubeService()

# Handle OAuth callback
params = st.experimental_get_query_params()
if 'code' in params:
    try:
        auth_response = f"http://localhost:8501/oauth2callback?{urlencode(params)}"
        st.session_state.yt_service.handle_auth_callback(auth_response)
        st.success("Successfully authenticated with YouTube!")
        st.experimental_set_query_params()
        st.rerun() 