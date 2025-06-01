
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWordPressCategories } from '@/hooks/useWordPressCategories';

export function CategoriesScrollMenu() {
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const { categories, isLoading } = useWordPressCategories();

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

  if (isLoading) {
    return (
      <div className="mb-6 flex justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement des catégories...</div>
      </div>
    );
  }

  return (
    <div className="mb-6 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm" onClick={() => scroll('left')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div ref={categoryScrollRef} className="flex overflow-x-auto scrollbar-none py-2 space-x-2 px-8">
        <Link to="/actualites" className="whitespace-nowrap px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20">
          Toutes
        </Link>
        {categories.map(category => (
          <Link 
            key={category.id} 
            to={`/actualites/categorie/${category.slug}`} 
            className="whitespace-nowrap px-3 py-1.5 text-sm bg-muted rounded-full hover:bg-primary/10"
          >
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
  );
}
