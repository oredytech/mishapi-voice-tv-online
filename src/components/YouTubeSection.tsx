
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { YouTubePlayer } from "./YouTubePlayer";
import { fetchYouTubeVideos, YouTubeVideo } from "@/services/youtube";

export function YouTubeSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>("");
  const { toast } = useToast();
  
  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      try {
        const fetchedVideos = await fetchYouTubeVideos(3);
        setVideos(fetchedVideos);
        
        if (fetchedVideos.length === 0) {
          setError("Aucune vidéo disponible");
        } else {
          setError(null);
        }
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

    loadVideos();
  }, [toast]);

  const openVideo = (videoId: string, title: string) => {
    setSelectedVideo(videoId);
    setSelectedVideoTitle(title);
  };

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Nos dernières vidéos</h2>
          <Link to="/videos" className="text-primary hover:underline flex items-center">
            Toutes nos vidéos
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
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
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Réessayer
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card 
                key={video.id} 
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
                  <h3 className="font-medium line-clamp-2 group-hover:text-primary">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(video.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link to="/videos">
              Toutes nos vidéos
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
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
    </section>
  );
}
