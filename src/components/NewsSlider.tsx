
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { WordPressPost } from "@/services/wordpress";

interface NewsSliderProps {
  posts: WordPressPost[];
}

export function NewsSlider({ posts }: NewsSliderProps) {
  if (posts.length === 0) {
    return (
      <div className="aspect-[16/9] w-full bg-muted/20 animate-pulse rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Chargement des actualités...</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <img 
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} 
                alt={post.title.rendered} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <Link to={`/actualites/${post.id}`}>
                  <h3 className="text-white text-xl font-bold line-clamp-2" 
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </Link>
                <div className="flex gap-2 mt-2">
                  {post._embedded?.['wp:term']?.[0].slice(0, 1).map((category, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-primary/80">
                      {category.name}
                    </Badge>
                  ))}
                  <span className="text-xs text-white/70">
                    {new Date(post.date).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-none" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-none" />
    </Carousel>
  );
}
