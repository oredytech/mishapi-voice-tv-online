
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

// This is mock data since we don't have direct API access
const mockYouTubeVideos: YouTubeVideo[] = [
  {
    id: "video1",
    title: "Mishapi Voice TV - Journal du 5 Mai 2025",
    thumbnail: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2025-05-05"
  },
  {
    id: "video2",
    title: "Débat: L'avenir de l'éducation en RDC",
    thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2025-05-03"
  },
  {
    id: "video3",
    title: "Festival de musique à Goma: Interview exclusive",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2025-05-01"
  }
];

export function YouTubeSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  
  useEffect(() => {
    // In a real implementation, you would fetch from YouTube API
    // For this example, we'll use mock data
    setVideos(mockYouTubeVideos);
  }, []);

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden group hover:shadow-md border-none bg-background">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
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
        
        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link to="/videos">
              Toutes nos vidéos
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
