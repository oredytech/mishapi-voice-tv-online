
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  itemCount: number;
}

const YOUTUBE_API_KEY = 'AIzaSyAm1eWQTfpnRIPKIPw4HTZDOgWuciITktI';
const CHANNEL_ID = 'UCB_8-x5JWCH6V5IhzXFUwWg';

/**
 * Récupère les vidéos YouTube d'une chaîne avec pagination
 */
export const fetchYouTubeVideos = async (maxResults: number = 3, pageToken?: string): Promise<{
  videos: YouTubeVideo[];
  nextPageToken?: string;
  totalResults: number;
}> => {
  try {
    const pageParam = pageToken ? `&pageToken=${pageToken}` : '';
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}${pageParam}`
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des vidéos');
    }

    const data = await response.json();
    
    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: {
        url: item.snippet.thumbnails.high.url,
        width: item.snippet.thumbnails.high.width,
        height: item.snippet.thumbnails.high.height
      },
      publishedAt: item.snippet.publishedAt
    }));

    return {
      videos,
      nextPageToken: data.nextPageToken,
      totalResults: data.pageInfo.totalResults
    };
  } catch (error) {
    console.error('Erreur YouTube API:', error);
    return {
      videos: [],
      totalResults: 0
    };
  }
};

/**
 * Récupère les playlists de la chaîne
 */
export const fetchYouTubePlaylists = async (): Promise<YouTubePlaylist[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des playlists');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: {
        url: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        width: item.snippet.thumbnails.high?.width || item.snippet.thumbnails.default.width,
        height: item.snippet.thumbnails.high?.height || item.snippet.thumbnails.default.height
      },
      itemCount: item.contentDetails.itemCount
    }));
  } catch (error) {
    console.error('Erreur YouTube Playlists API:', error);
    return [];
  }
};

/**
 * Récupère les vidéos d'une playlist spécifique
 */
export const fetchPlaylistVideos = async (playlistId: string, maxResults: number = 12, pageToken?: string): Promise<{
  videos: YouTubeVideo[];
  nextPageToken?: string;
  totalResults: number;
}> => {
  try {
    const pageParam = pageToken ? `&pageToken=${pageToken}` : '';
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}${pageParam}`
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des vidéos de la playlist');
    }

    const data = await response.json();
    
    const videos = data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: {
        url: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        width: item.snippet.thumbnails.high?.width || item.snippet.thumbnails.default.width,
        height: item.snippet.thumbnails.high?.height || item.snippet.thumbnails.default.height
      },
      publishedAt: item.snippet.publishedAt
    }));

    return {
      videos,
      nextPageToken: data.nextPageToken,
      totalResults: data.pageInfo.totalResults
    };
  } catch (error) {
    console.error('Erreur YouTube Playlist Videos API:', error);
    return {
      videos: [],
      totalResults: 0
    };
  }
};
