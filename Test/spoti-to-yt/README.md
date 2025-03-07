# Spotify to YouTube Playlist Transfer

This script allows you to transfer playlists from Spotify to YouTube.

## Setup

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up Spotify API credentials:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Copy the Client ID and Client Secret
   - Update the `.env` file with your credentials

3. Set up YouTube API credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the YouTube Data API v3
   - Create OAuth 2.0 credentials
   - Download the credentials and save as `client_secret.json` in the project root

## Usage

1. Run the script:
   ```bash
   python spoti.py
   ```

2. When prompted, enter your Spotify playlist URL

3. The script will:
   - Fetch all tracks from your Spotify playlist
   - Search for each track on YouTube
   - Create a new YouTube playlist
   - Add the found videos to the playlist

## Notes

- The script respects YouTube API quotas and will pause if the daily limit is reached
- Progress is automatically saved and can be resumed later
- YouTube playlists are created as private by default
- The script includes rate limiting and retry mechanisms for reliability 