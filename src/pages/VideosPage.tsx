
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { NewsPagination } from "@/components/NewsPagination";
import { 
  fetchYouTubeVideos, 
  fetchYouTubePlaylists, 
  fetchPlaylistVideos,
  YouTubeVideo, 
  YouTubePlaylist 
} from "@/services/youtube";

export default function VideosPage() {
  const [allVideos, setAllVideos] = useState<YouTubeVideo[]>([]);
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([]);
  const [playlistVideos, setPlaylistVideos] = useState<Record<string, YouTubeVideo[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageTokens, setNextPageTokens] = useState<Record<string, string>>({});
  const [totalResults, setTotalResults] = useState(0);
  const { toast } = useToast();

  const videosPerPage = 12;
  const totalPages = Math.ceil(totalResults / videosPerPage);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Charger toutes les vidéos et les playlists en parallèle
      const [videosData, playlistsData] = await Promise.all([
        fetchYouTubeVideos(videosPerPage),
        fetchYouTubePlaylists()
      ]);

      setAllVideos(videosData.videos);
      setTotalResults(videosData.totalResults);
      if (videosData.nextPageToken) {
        setNextPageTokens(prev => ({ ...prev, all: videosData.nextPageToken! }));
      }

      setPlaylists(playlistsData);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des vidéos");
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les vidéos YouTube"
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlaylistVideos = async (playlistId: string) => {
    if (playlistVideos[playlistId]) return; // Déjà chargée

    try {
      const data = await fetchPlaylistVideos(playlistId, videosPerPage);
      setPlaylistVideos(prev => ({
        ...prev,
        [playlistId]: data.videos
      }));
      if (data.nextPageToken) {
        setNextPageTokens(prev => ({ ...prev, [playlistId]: data.nextPageToken! }));
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les vidéos de la playlist"
      });
      console.error(err);
    }
  };

  const loadMoreVideos = async (page: number) => {
    if (activeTab === "all") {
      setIsLoadingMore(true);
      try {
        const pageToken = page > 1 ? nextPageTokens.all : undefined;
        const data = await fetchYouTubeVideos(videosPerPage, pageToken);
        
        if (page === 1) {
          setAllVideos(data.videos);
        } else {
          setAllVideos(data.videos);
        }
        
        if (data.nextPageToken) {
          setNextPageTokens(prev => ({ ...prev, all: data.nextPageToken! }));
        }
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger plus de vidéos"
        });
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const handleTabChange = async (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    
    if (value !== "all" && !playlistVideos[value]) {
      await loadPlaylistVideos(value);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadMoreVideos(page);
  };

  const openVideo = (videoId: string, title: string) => {
    setSelectedVideo(videoId);
    setSelectedVideoTitle(title);
  };

  const getCurrentVideos = () => {
    if (activeTab === "all") {
      return allVideos;
    }
    return playlistVideos[activeTab] || [];
  };

  const VideoCard = ({ video }: { video: YouTubeVideo }) => (
    <Card 
      className="overflow-hidden group hover:shadow-md border-none bg-background cursor-pointer"
      onClick={() => openVideo(video.id, video.title)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={video.thumbnail.url} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-8 h-8" 
              style={{ marginLeft: "3px" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium line-clamp-2 group-hover:text-primary text-sm">{video.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(video.publishedAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Toutes nos vidéos - MISHAPI VOICE TV</title>
        <meta name="description" content="Découvrez toutes les vidéos de MISHAPI VOICE TV organisées par playlists" />
      </Helmet>

      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Toutes nos vidéos</h1>
          <p className="text-muted-foreground">
            Découvrez toutes nos vidéos organisées par thématiques et playlists
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <Card key={index} className="overflow-hidden border-none bg-muted/20 animate-pulse">
                <div className="aspect-video"></div>
                <CardContent className="p-3">
                  <div className="h-4 bg-muted/40 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted/40 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">{error}</p>
            <Button 
              variant="outline" 
              onClick={loadInitialData} 
              className="mt-4"
            >
              Réessayer
            </Button>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-auto mb-6 overflow-x-auto">
              <TabsTrigger value="all" className="flex items-center gap-2">
                Toutes les vidéos
                <Badge variant="secondary" className="text-xs">
                  {totalResults}
                </Badge>
              </TabsTrigger>
              {playlists.map((playlist) => (
                <TabsTrigger key={playlist.id} value={playlist.id} className="flex items-center gap-2">
                  {playlist.title}
                  <Badge variant="secondary" className="text-xs">
                    {playlist.itemCount}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getCurrentVideos().map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <NewsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </TabsContent>

            {playlists.map((playlist) => (
              <TabsContent key={playlist.id} value={playlist.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getCurrentVideos().map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {isLoadingMore && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Chargement...</p>
          </div>
        )}
      </div>

      {/* Lecteur YouTube en modal */}
      {selectedVideo && (
        <YouTubePlayer 
          videoId={selectedVideo} 
          title={selectedVideoTitle}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
