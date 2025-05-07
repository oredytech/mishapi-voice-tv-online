
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

const YOUTUBE_API_KEY = 'AIzaSyAm1eWQTfpnRIPKIPw4HTZDOgWuciITktI';
const CHANNEL_ID = 'UCB_8-x5JWCH6V5IhzXFUwWg';

/**
 * Récupère les vidéos YouTube d'une chaîne
 */
export const fetchYouTubeVideos = async (maxResults: number = 3): Promise<YouTubeVideo[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des vidéos');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
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
  } catch (error) {
    console.error('Erreur YouTube API:', error);
    return [];
  }
};
