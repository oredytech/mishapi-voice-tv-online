
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Filter, Search, Grid2x2, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WordPressNewsCard } from '@/components/WordPressNewsCard';
import { fetchWordPressCategoryPostsBySlug, WordPressPost } from '@/services/wordpress';
import { NewsPagination } from '@/components/NewsPagination';
import { useToast } from '@/hooks/use-toast';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const postsPerPage = 12;

  useEffect(() => {
    const loadCategoryPosts = async () => {
      if (!categorySlug) return;
      
      setIsLoading(true);
      try {
        const response = await fetchWordPressCategoryPostsBySlug(categorySlug, currentPage, postsPerPage);
        setPosts(response.posts);
        setTotalPages(response.totalPages);
        setCategoryName(response.categoryName);
        
        if (response.posts.length === 0 && response.categoryName === '') {
          toast({
            variant: "destructive",
            title: "Catégorie non trouvée",
            description: "Cette catégorie n'existe pas ou ne contient aucun article."
          });
        }
      } catch (error) {
        console.error('Failed to fetch category posts:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les articles de cette catégorie."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryPosts();
  }, [categorySlug, currentPage, toast]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!categorySlug) {
    return <div>Catégorie non spécifiée</div>;
  }

  return (
    <>
      <Helmet>
        <title>{categoryName ? `${categoryName} | MISHAPI VOICE TV` : 'Catégorie | MISHAPI VOICE TV'}</title>
      </Helmet>

      <div className="container-custom py-8 min-h-screen">
        {/* Header with back button and title */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/actualites">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">
              {categoryName || 'Catégorie'}
            </h1>
            <p className="text-muted-foreground">
              Découvrez les dernières actualités de cette catégorie
            </p>
          </div>
        </div>

        {/* Search and view controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-grow md:w-64">
              <Input
                placeholder="Rechercher..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="hidden md:flex border rounded-md overflow-hidden">
              <Button 
                variant={viewMode === 'grid' ? "default" : "ghost"} 
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? "default" : "ghost"} 
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Articles grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(postsPerPage)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted animate-pulse rounded-t-lg" />
                <div className="p-4 space-y-2 border border-t-0 rounded-b-lg">
                  <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-full" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Aucun article trouvé dans cette catégorie</p>
            <Button asChild className="mt-4">
              <Link to="/actualites">Retour aux actualités</Link>
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {posts.map((post) => (
              <WordPressNewsCard 
                key={post.id} 
                post={post} 
                variant={viewMode === 'list' ? 'small' : 'default'} 
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <NewsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className="text-center text-muted-foreground text-sm mt-8">
          Affichage de la page {currentPage} sur {totalPages}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
