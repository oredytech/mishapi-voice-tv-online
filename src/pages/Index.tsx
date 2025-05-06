
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LiveSection from '@/components/LiveSection';
import { NewsSlider } from '@/components/NewsSlider';
import { WordPressNewsCard } from '@/components/WordPressNewsCard';
import { YouTubeSection } from '@/components/YouTubeSection';
import { ContactSection } from '@/components/ContactSection';
import { fetchWordPressPosts, WordPressPost } from '@/services/wordpress';
import FloatingPlayer from '@/components/FloatingPlayer';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Index = () => {
  const [isRadioPlayerVisible, setIsRadioPlayerVisible] = useState(false);
  const [isMishapi24PlayerVisible, setIsMishapi24PlayerVisible] = useState(false);
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await fetchWordPressPosts(1, 15);
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Erreur lors du chargement des actualités');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Split posts for different sections
  const sliderPosts = posts.slice(0, 5);
  const topPosts = posts.slice(5, 9);
  const morePosts = posts.slice(9, 15);

  return <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="pt-12 pb-16 bg-cover bg-center relative"
        style={{ backgroundImage: 'url("/lovable-uploads/0ee99787-f0d1-4243-ae03-35c677a85f06.png")' }}
      >
        {/* Dark overlay to ensure text readability over the background image */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="font-bold leading-tight mb-4 text-4xl md:text-5xl text-white">
              MISHAPI VOICE TV
              <span className="text-primary block mt-2 text-base md:text-lg">La vision Africaine dans le Monde</span>
            </h1>
            <p className="text-white/85 mb-8 text-lg max-w-2xl mx-auto">
              Chaîne de référence dans l'Est de la RDC, diffusant des émissions axées sur le développement 
              de la République Démocratique du Congo et de toute l'Afrique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="btn-tv" asChild>
                <Link to="/tv">
                  Regarder la TV en direct
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button className="btn-radio" onClick={() => setIsRadioPlayerVisible(true)}>
                Écouter la radio en direct
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="secondary" onClick={() => setIsMishapi24PlayerVisible(true)}>
                Écouter Mishapi 24
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2 text-white/90">Également disponible sur:</p>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center px-3 py-1 border border-white/20 bg-black/50 backdrop-blur-sm rounded-md">
                  <img alt="Canal+" className="h-5 mr-2" src="/lovable-uploads/4cb2b446-5308-4cf3-a5d6-71657789fd7d.jpg" />
                  <span className="text-sm text-white">Canal 363</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Section */}
      <LiveSection />

      {/* News Section */}
      <section className="py-12 bg-muted/50">
        <div className="container-custom">
          <Tabs defaultValue="actualites" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title">Actualités</h2>
              <div className="hidden sm:block">
                <Link to="/actualites" className="text-primary hover:underline flex items-center mr-4 inline-block">
                  Toutes les actualités
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="aspect-video bg-muted animate-pulse rounded-lg" />
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
              <>
                {/* First section: Slider + Top 4 posts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                  <div className="lg:col-span-2">
                    <NewsSlider posts={sliderPosts} />
                  </div>
                  <div className="space-y-4">
                    {topPosts.map(post => (
                      <WordPressNewsCard key={post.id} post={post} variant="small" />
                    ))}
                  </div>
                </div>
                
                {/* Second section: 6 more posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {morePosts.map(post => (
                    <WordPressNewsCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
            
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
            
            <div className="text-center mt-6 sm:hidden">
              <Button variant="outline" asChild>
                <Link to="/actualites">
                  Toutes les actualités
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* YouTube Videos Section */}
      <YouTubeSection />
      
      {/* Contact Section */}
      <ContactSection />

      {/* Floating Radio Players */}
      <FloatingPlayer 
        isVisible={isRadioPlayerVisible} 
        onClose={() => setIsRadioPlayerVisible(false)} 
        audioUrl="https://example.com/radio-stream" 
        title="MISHAPI VOICE Radio" 
      />
      
      <FloatingPlayer 
        isVisible={isMishapi24PlayerVisible} 
        onClose={() => setIsMishapi24PlayerVisible(false)} 
        audioUrl="https://example.com/mishapi24-stream" 
        title="MISHAPI 24" 
      />
    </div>;
};

export default Index;
