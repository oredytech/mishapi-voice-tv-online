
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewsSlider } from '@/components/NewsSlider';
import { WordPressNewsCard } from '@/components/WordPressNewsCard';
import { fetchWordPressPostsWithPagination, fetchWordPressPosts, WordPressPost } from '@/services/wordpress';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';
import { CategoriesScrollMenu } from '@/components/CategoriesScrollMenu';
import { NewsPagination } from '@/components/NewsPagination';

export function NewsSection() {
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
  const isMobile = useIsMobile();

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
  }, [toast]);

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
  }, [toast]);

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
  }, [currentPage, toast]);

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: document.getElementById('news-grid')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  return (
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
          
          {/* Mobile Categories Scrollable Menu */}
          {isMobile && <CategoriesScrollMenu />}
          
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
          <NewsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          
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
  );
}
