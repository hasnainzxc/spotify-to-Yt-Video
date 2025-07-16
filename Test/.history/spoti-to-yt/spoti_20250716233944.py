import os
import re
import time
from functools import lru_cache
from tqdm import tqdm
import socket
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
import json
import pickle

from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from pytube import Search

# YouTube Data API imports
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Load environment variables from .env file
load_dotenv()

# --- Spotify Configuration ---
SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')

# --- YouTube API Configuration ---
SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"]
QUOTA_LIMIT = 10000  # Daily quota limitD
CHUNK_SIZE = 25  # Reduced chunk size for better quota management
RATE_LIMIT_DELAY = 2  # Delay between API calls in seconds
MAX_RETRIES = 3  # Maximum number of retries for failed requests

# Quota costs for different operations
QUOTA_COSTS = {
    'playlist_create': 50,
    'playlist_insert': 50,
    'search': 100
}

# --- Spotify Setup using Client Credentials Flow ---
sp_auth = SpotifyClientCredentials(client_id=SPOTIFY_CLIENT_ID,
                                 client_secret=SPOTIFY_CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=sp_auth)

class QuotaManager:
    def __init__(self, daily_limit: int = QUOTA_LIMIT):
        self.daily_limit = daily_limit
        self.quota_file = "quota_usage.json"
        self.current_usage = self._load_usage()
        self.last_reset = self._load_last_reset()
        self.operation_costs = QUOTA_COSTS

    def _load_usage(self) -> int:
        try:
            with open(self.quota_file, 'r') as f:
                data = json.load(f)
                return data.get('usage', 0)
        except (FileNotFoundError, json.JSONDecodeError):
            return 0

    def _load_last_reset(self) -> datetime:
        try:
            with open(self.quota_file, 'r') as f:
                data = json.load(f)
                return datetime.fromisoformat(data.get('last_reset', datetime.now().isoformat()))
        except (FileNotFoundError, json.JSONDecodeError):
            return datetime.now()

    def _save_usage(self):
        with open(self.quota_file, 'w') as f:
            json.dump({
                'usage': self.current_usage,
                'last_reset': self.last_reset.isoformat()
            }, f)

    def check_and_reset(self):
        now = datetime.now()
        if now.date() > self.last_reset.date():
            self.current_usage = 0
            self.last_reset = now
            self._save_usage()

    def increment_usage(self, operation: str):
        self.check_and_reset()
        cost = self.operation_costs.get(operation, 1)
        self.current_usage += cost
        self._save_usage()
        return cost

    def has_quota(self, operation: str) -> bool:
        self.check_and_reset()
        cost = self.operation_costs.get(operation, 1)
        return self.current_usage + cost <= self.daily_limit

    def wait_for_quota(self, operation: str):
        cost = self.operation_costs.get(operation, 1)
        while not self.has_quota(operation):
            reset_time = (self.last_reset + timedelta(days=1)).replace(hour=0, minute=0, second=0)
            wait_seconds = (reset_time - datetime.now()).total_seconds()
            if wait_seconds > 0:
                print(f"\nQuota exceeded. Current usage: {self.current_usage}/{self.daily_limit}")
                print(f"Waiting {wait_seconds/3600:.1f} hours until reset...")
                time.sleep(min(wait_seconds, 3600))  # Wait at most 1 hour at a time
            self.check_and_reset()

    def get_remaining_quota(self) -> int:
        self.check_and_reset()
        return self.daily_limit - self.current_usage

class YouTubeService:
    def __init__(self):
        self.service = None
        self.quota_manager = QuotaManager()
        self.credentials = None
        self._load_credentials()

    def _load_credentials(self):
        """Load saved credentials if they exist."""
        try:
            with open('token.pickle', 'rb') as token:
                self.credentials = pickle.load(token)
        except:
            self.credentials = None

    def _save_credentials(self):
        """Save credentials for future use."""
        with open('token.pickle', 'wb') as token:
            pickle.dump(self.credentials, token)

    def is_authenticated(self):
        """Check if user is authenticated."""
        return self.credentials is not None and not self.credentials.expired

    def get_auth_url(self):
        """Get the authorization URL for the popup."""
        flow = InstalledAppFlow.from_client_secrets_file(
            "client_secret.json",
            SCOPES,
            redirect_uri='http://localhost:8501/oauth2callback'
        )
        auth_url, _ = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true'
        )
        return auth_url

    def handle_auth_callback(self, auth_response):
        """Handle the authentication callback."""
        flow = InstalledAppFlow.from_client_secrets_file(
            "client_secret.json",
            SCOPES,
            redirect_uri='http://localhost:8501/oauth2callback'
        )
        flow.fetch_token(authorization_response=auth_response)
        self.credentials = flow.credentials
        self._save_credentials()
        return self.credentials

    def get_service(self):
        """Get an authenticated YouTube service. If not authenticated, start OAuth flow interactively."""
        if not self.service:
            if not self.is_authenticated():
                print("No valid YouTube authentication found. Starting OAuth flow...")
                flow = InstalledAppFlow.from_client_secrets_file(
                    "client_secret.json",
                    SCOPES
                )
                creds = flow.run_console()
                self.credentials = creds
                self._save_credentials()
            self.service = build("youtube", "v3", credentials=self.credentials)
        return self.service

    def create_playlist(self, title: str, description: str, privacy_status: str = "private") -> str:
        self.quota_manager.wait_for_quota('playlist_create')
        youtube = self.get_service()
        request = youtube.playlists().insert(
            part="snippet,status",
            body={
                "snippet": {
                    "title": title,
                    "description": description,
                    "defaultLanguage": "en"
                },
                "status": {
                    "privacyStatus": privacy_status
                }
            }
        )
        response = request.execute()
        self.quota_manager.increment_usage('playlist_create')
        return response["id"]

    def add_videos_to_playlist(self, playlist_id: str, video_ids: List[str], progress_bar: Optional[tqdm] = None):
        youtube = self.get_service()
        successful_adds = 0
        failed_videos = []
        
        # Calculate remaining quota and possible videos today
        remaining_quota = self.quota_manager.get_remaining_quota()
        possible_videos_today = remaining_quota // QUOTA_COSTS['playlist_insert']
        
        # Split videos into today's batch and future batch
        todays_videos = video_ids[:possible_videos_today]
        future_videos = video_ids[possible_videos_today:]
        
        if future_videos:
            print(f"\nCan process {possible_videos_today} videos today.")
            print(f"Remaining {len(future_videos)} videos will be processed after quota reset.")
        
        # Process today's videos
        for video_id in todays_videos:
            retries = 0
            while retries < MAX_RETRIES:
                try:
                    self.quota_manager.wait_for_quota('playlist_insert')
                    request = youtube.playlistItems().insert(
                        part="snippet",
                        body={
                            "snippet": {
                                "playlistId": playlist_id,
                                "resourceId": {
                                    "kind": "youtube#video",
                                    "videoId": video_id
                                }
                            }
                        }
                    )
                    request.execute()
                    self.quota_manager.increment_usage('playlist_insert')
                    successful_adds += 1
                    if progress_bar:
                        progress_bar.update(1)
                    break
                except HttpError as e:
                    if "quotaExceeded" in str(e):
                        self.quota_manager.wait_for_quota('playlist_insert')
                    else:
                        retries += 1
                        if retries == MAX_RETRIES:
                            failed_videos.append(video_id)
                            print(f"\nFailed to add video {video_id} after {MAX_RETRIES} attempts")
                        time.sleep(RATE_LIMIT_DELAY * (2 ** retries))
        
        # Save remaining videos for tomorrow
        if future_videos:
            save_progress([], future_videos, playlist_id)
            print("\nProgress saved. Run the script again after quota reset to continue.")
        
        return successful_adds, failed_videos

def extract_spotify_playlist_id(playlist_url: str) -> str:
    """Extracts the playlist ID from a Spotify playlist URL."""
    match = re.search(r'open\.spotify\.com/playlist/([a-zA-Z0-9]+)', playlist_url)
    if match:
        return match.group(1)
    raise ValueError("Invalid Spotify playlist URL")

def get_spotify_tracks(playlist_url: str) -> List[str]:
    """Fetches track names and artist(s) from a Spotify playlist."""
    try:
        # Extract playlist ID
        playlist_id = extract_spotify_playlist_id(playlist_url)
        print(f"Fetching playlist ID: {playlist_id}")
        
        # Get playlist data with retries
        max_retries = 3
        retry_count = 0
        while retry_count < max_retries:
            try:
                results = sp.playlist(playlist_id)
                break
            except Exception as e:
                retry_count += 1
                if retry_count == max_retries:
                    raise Exception(f"Failed to fetch playlist after {max_retries} attempts: {e}")
                print(f"Retry {retry_count}/{max_retries}...")
                time.sleep(2 ** retry_count)
        
        # Validate playlist data
        if not results:
            raise ValueError("No data received from Spotify")
        
        # Get tracks data
        tracks_data = results.get('tracks', {})
        if not tracks_data:
            raise ValueError("No tracks data in playlist")
        
        # Get total tracks
        total_tracks = tracks_data.get('total', 0)
        if total_tracks == 0:
            raise ValueError("Playlist is empty")
        
        print(f"\nFound {total_tracks} tracks in Spotify playlist")
        tracks = []
        
        # Process tracks with progress bar
        with tqdm(total=total_tracks, desc="Fetching Spotify tracks") as pbar:
            current_data = tracks_data
            
            while True:
                # Get current page of tracks
                items = current_data.get('items', [])
                if not items:
                    break
                
                # Process each track
                for item in items:
                    try:
                        if not item or 'track' not in item:
                            continue
                        
                        track = item['track']
                        if not track:
                            continue
                        
                        # Extract track info
                        track_name = track.get('name')
                        artists = track.get('artists', [])
                        
                        if track_name and artists:
                            artist_names = ", ".join([artist.get('name', '') for artist in artists])
                            query = f"{track_name} {artist_names}"
                            tracks.append(query)
                        
                        pbar.update(1)
                    except Exception as e:
                        print(f"\nError processing track: {e}")
                        continue
                
                # Get next page
                if current_data.get('next'):
                    current_data = sp.next(current_data)
                else:
                    break
        
        # Validate results
        if not tracks:
            raise ValueError("No valid tracks found in the playlist")
        
        print(f"\nSuccessfully processed {len(tracks)} tracks")
        return tracks
        
    except spotipy.exceptions.SpotifyException as e:
        print(f"\nSpotify API Error: {e}")
        print("Please check your Spotify credentials in .env file")
        raise
    except Exception as e:
        print(f"\nError fetching Spotify tracks: {str(e)}")
        print("\nDebug information:")
        print(f"Playlist URL: {playlist_url}")
        print(f"Playlist ID: {playlist_id if 'playlist_id' in locals() else 'Not extracted'}")
        print(f"Spotify Client ID: {'Set' if SPOTIFY_CLIENT_ID else 'Not set'}")
        print(f"Spotify Client Secret: {'Set' if SPOTIFY_CLIENT_SECRET else 'Not set'}")
        raise

@lru_cache(maxsize=1000)
def search_youtube_video(query: str) -> Optional[str]:
    """Searches YouTube for the given query and returns the video ID."""
    try:
        results = Search(query).results
        if results and len(results) > 1:
            return results[1].video_id
        elif results:
            return results[0].video_id
    except Exception as e:
        print(f"\nError searching for {query}: {e}")
    return None

def save_progress(tracks: List[str], video_ids: List[str], playlist_id: Optional[str] = None):
    """Save conversion progress to a file."""
    progress = {
        'tracks': tracks,
        'video_ids': video_ids,
        'playlist_id': playlist_id,
        'timestamp': datetime.now().isoformat()
    }
    with open('conversion_progress.pkl', 'wb') as f:
        pickle.dump(progress, f)

def load_progress() -> Optional[Tuple[List[str], List[str], Optional[str]]]:
    """Load conversion progress from file."""
    try:
        with open('conversion_progress.pkl', 'rb') as f:
            progress = pickle.load(f)
            return progress['tracks'], progress['video_ids'], progress['playlist_id']
    except (FileNotFoundError, pickle.PickleError):
        return None

def process_tracks_in_chunks(tracks: List[str], chunk_size: int = CHUNK_SIZE) -> List[str]:
    """Process tracks in chunks and return list of video IDs."""
    video_ids = []
    total_chunks = (len(tracks) + chunk_size - 1) // chunk_size
    
    with tqdm(total=len(tracks), desc="Searching YouTube videos") as pbar:
        for i in range(0, len(tracks), chunk_size):
            chunk = tracks[i:i + chunk_size]
            for query in chunk:
                video_id = search_youtube_video(query)
                if video_id:
                    video_ids.append(video_id)
                pbar.update(1)
            time.sleep(RATE_LIMIT_DELAY)
            save_progress(tracks, video_ids)  # Save progress after each chunk
    
    return video_ids

def check_youtube_credentials():
    """Verify the presence and validity of the YouTube client_secret.json file."""
    import json
    cred_path = "client_secret.json"
    if not os.path.exists(cred_path):
        raise FileNotFoundError(f"YouTube credentials file '{cred_path}' not found. Please download it from Google Cloud Console and place it in the project root.")
    try:
        with open(cred_path, "r") as f:
            data = json.load(f)
        # Basic structure check
        if "web" not in data or not all(k in data["web"] for k in ["client_id", "client_secret", "redirect_uris"]):
            raise ValueError("YouTube credentials file is missing required fields. Please ensure you downloaded the correct OAuth 2.0 client credentials.")
    except Exception as e:
        raise ValueError(f"Error reading YouTube credentials: {e}")

def check_spotify_credentials():
    """Verify Spotify credentials are set and valid."""
    if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
        raise ValueError("Spotify credentials are missing in the .env file. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.")
    try:
        # Try a simple API call to verify credentials
        test_auth = SpotifyClientCredentials(client_id=SPOTIFY_CLIENT_ID, client_secret=SPOTIFY_CLIENT_SECRET)
        test_sp = spotipy.Spotify(auth_manager=test_auth)
        test_sp.search(q="test", type="track", limit=1)
    except Exception as e:
        raise ValueError(f"Spotify credentials are invalid or not authorized: {e}")

def main():
    # --- Credential checks ---
    try:
        check_youtube_credentials()
    except Exception as e:
        print(f"[ERROR] YouTube credentials: {e}")
        return
    try:
        check_spotify_credentials()
    except Exception as e:
        print(f"[ERROR] Spotify credentials: {e}")
        return
    
    # Initialize YouTube service
    youtube_service = YouTubeService()
    
    # Initialize variables
    tracks = None
    video_ids = None
    playlist_id = None
    
    # Check for existing progress
    progress = load_progress()
    if progress:
        tracks, video_ids, playlist_id = progress
        print("\nFound existing progress:")
        print(f"Tracks processed: {len(tracks)}")
        print(f"Videos found: {len(video_ids)}")
        resume = input("Would you like to resume from this point? (y/n): ").strip().lower()
        if resume == 'y':
            if playlist_id:
                print(f"Resuming with playlist: {playlist_id}")
            else:
                playlist_title = input("Enter new YouTube playlist title: ").strip()
                playlist_description = input("Enter playlist description: ").strip()
                playlist_id = youtube_service.create_playlist(playlist_title, playlist_description)
                print(f"Created playlist: https://www.youtube.com/playlist?list={playlist_id}")
        else:
            tracks = None
            video_ids = None
            playlist_id = None
            if os.path.exists('conversion_progress.pkl'):
                os.remove('conversion_progress.pkl')
    
    # Get Spotify playlist URL if not resuming
    if not tracks:
        spotify_url = input("Enter Spotify playlist URL: ").strip()
        tracks = get_spotify_tracks(spotify_url)
        if not tracks:
            print("No tracks found in the playlist")
            return
    
    # Search for YouTube videos if not resuming
    if not video_ids:
        video_ids = process_tracks_in_chunks(tracks)
        if not video_ids:
            print("No matching videos found on YouTube")
            return
    
    print(f"\nFound {len(video_ids)} matching videos on YouTube")
    
    # Create YouTube playlist if not resuming
    if not playlist_id:
        playlist_title = input("Enter new YouTube playlist title: ").strip()
        playlist_description = input("Enter playlist description: ").strip()
        playlist_id = youtube_service.create_playlist(playlist_title, playlist_description)
        print(f"Created playlist: https://www.youtube.com/playlist?list={playlist_id}")
    
    # Add videos to playlist in chunks
    print("\nAdding videos to playlist...")
    with tqdm(total=len(video_ids), desc="Adding videos to playlist") as pbar:
        successful_adds, failed_videos = youtube_service.add_videos_to_playlist(
            playlist_id, video_ids, pbar
        )
    
    # Print summary
    print(f"\nConversion completed!")
    print(f"Successfully added {successful_adds} videos to the playlist")
    if failed_videos:
        print(f"Failed to add {len(failed_videos)} videos")
        print("Failed video IDs:", failed_videos)
    
    # Clean up progress file
    if os.path.exists('conversion_progress.pkl'):
        os.remove('conversion_progress.pkl')

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nProcess interrupted by user")
        print("Progress has been saved. You can resume later by running the script again.")
    except Exception as e:
        print(f"\nAn error occurred: {e}")