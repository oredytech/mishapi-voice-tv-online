import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LiveSection from '@/components/LiveSection';
import { NewsSlider } from '@/components/NewsSlider';
import { WordPressNewsCard } from '@/components/WordPressNewsCard';
import { YouTubeSection } from '@/components/YouTubeSection';
import { ContactSection } from '@/components/ContactSection';
import { fetchWordPressPostsWithPagination, fetchWordPressPosts, WordPressPost } from '@/services/wordpress';
import FloatingPlayer from '@/components/FloatingPlayer';
import { categories } from '@/components/Navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isRadioPlayerVisible, setIsRadioPlayerVisible] = useState(false);
  const [isMishapi24PlayerVisible, setIsMishapi24PlayerVisible] = useState(false);
  const [sliderPosts, setSliderPosts] = useState<WordPressPost[]>([]);
  const [topPosts, setTopPosts] = useState<WordPressPost[]>([]);
  const [morePosts, setMorePosts] = useState<WordPressPost[]>([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll function for category menu
  const scroll = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      if (direction === 'left') {
        categoryScrollRef.current.scrollLeft -= scrollAmount;
      } else {
        categoryScrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  // Chargement des articles du slider (5 plus récents)
  useEffect(() => {
    const loadSliderPosts = async () => {
      setIsLoadingSlider(true);
      try {
        const fetchedPosts = await fetchWordPressPosts(1, 5);
        setSliderPosts(fetchedPosts);
      } catch (err) {
        setError('Erreur lors du chargement des actualités principales');
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les actualités principales"
        });
        console.error(err);
      } finally {
        setIsLoadingSlider(false);
      }
    };

    loadSliderPosts();
  }, []);

  // Chargement des articles de droite (4 articles)
  useEffect(() => {
    const loadTopPosts = async () => {
      setIsLoadingTop(true);
      try {
        const fetchedPosts = await fetchWordPressPosts(1, 4);
        setTopPosts(fetchedPosts);
      } catch (err) {
        setError('Erreur lors du chargement des actualités secondaires');
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les actualités secondaires"
        });
        console.error(err);
      } finally {
        setIsLoadingTop(false);
      }
    };

    loadTopPosts();
  }, []);

  // Chargement des articles de la grille avec pagination
  useEffect(() => {
    const loadMorePosts = async () => {
      setIsLoadingMore(true);
      try {
        const response = await fetchWordPressPostsWithPagination(currentPage, 6);
        setMorePosts(response.posts);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Erreur lors du chargement des actualités');
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les actualités"
        });
        console.error(err);
      } finally {
        setIsLoadingMore(false);
      }
    };

    loadMorePosts();
  }, [currentPage]);

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: document.getElementById('news-grid')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  // Génération des numéros de page pour la pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Si le nombre total de pages est inférieur ou égal au nombre maximum de pages à afficher
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Si le nombre total de pages est supérieur au nombre maximum de pages à afficher
      if (currentPage <= 3) {
        // Si la page actuelle est proche du début
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Si la page actuelle est proche de la fin
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Si la page actuelle est au milieu
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return <div className="min-h-screen">
      {/* Hero Section - Removed description */}
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

      {/* News Section - Fix for mobile pagination */}
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
            
            {/* Mobile Categories Scrollable Menu - Now moved to the news section */}
            {isMobile && (
              <div className="mb-6 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm" onClick={() => scroll('left')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div ref={categoryScrollRef} className="flex overflow-x-auto scrollbar-none py-2 space-x-2 px-8">
                  {categories.map(category => (
                    <Link key={category.name} to={category.path} className="whitespace-nowrap px-3 py-1.5 text-sm bg-muted rounded-full hover:bg-primary/10">
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm" onClick={() => scroll('right')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Première section: Slider + Top 4 posts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              {/* Slider */}
              <div className="lg:col-span-2">
                {isLoadingSlider ? (
                  <div className="aspect-[16/9] w-full bg-muted/20 animate-pulse rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chargement des actualités...</p>
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
                  <NewsSlider posts={sliderPosts} />
                )}
              </div>
              
              {/* Top 4 posts */}
              <div className="space-y-4">
                {isLoadingTop ? (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-24 h-24 bg-muted animate-pulse rounded-md"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                          <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : error ? (
                  <div className="text-center py-4">
                    <p className="text-destructive text-sm">{error}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.reload()} 
                      className="mt-2"
                    >
                      Réessayer
                    </Button>
                  </div>
                ) : (
                  topPosts.map(post => (
                    <WordPressNewsCard key={post.id} post={post} variant="small" />
                  ))
                )}
              </div>
            </div>
            
            {/* Deuxième section: 6 more posts with pagination */}
            <div id="news-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingMore ? (
                <>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-video bg-muted animate-pulse rounded-lg" />
                  ))}
                </>
              ) : error ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-destructive">{error}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()} 
                    className="mt-4"
                  >
                    Réessayer
                  </Button>
                </div>
              ) : morePosts.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">Aucun article disponible pour le moment.</p>
                </div>
              ) : (
                morePosts.map(post => (
                  <WordPressNewsCard key={post.id} post={post} />
                ))
              )}
            </div>
            
            {/* Pagination with mobile fixes */}
            <div className="mt-8 overflow-x-auto pb-2">
              <Pagination className="max-w-full">
                <PaginationContent className="flex-wrap gap-1">
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handlePageChange(currentPage - 1);
                      }} 
                      className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} whitespace-nowrap`} 
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map((pageNumber, index) => (
                    pageNumber === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            handlePageChange(pageNumber as number);
                          }}
                          isActive={pageNumber === currentPage}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handlePageChange(currentPage + 1);
                      }} 
                      className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} whitespace-nowrap`} 
                    />
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
        audioUrl="https://stream.zeno.fm/cgxrxyyhjsrtv" 
        title="MISHAPI VOICE Radio" 
      />
      
      <FloatingPlayer 
        isVisible={isMishapi24PlayerVisible} 
        onClose={() => setIsMishapi24PlayerVisible(false)} 
        audioUrl="https://stream.zeno.fm/t7anwdwtbluuv" 
        title="MISHAPI 24" 
      />
    </div>;
};

export default Index;
