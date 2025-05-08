
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function NewsPagination({ currentPage, totalPages, onPageChange }: NewsPaginationProps) {
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

  return (
    <div className="mt-8 overflow-x-auto pb-2">
      <Pagination className="max-w-full">
        <PaginationContent className="flex-wrap gap-1">
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                onPageChange(currentPage - 1);
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
                    onPageChange(pageNumber as number);
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
                onPageChange(currentPage + 1);
              }} 
              className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} whitespace-nowrap`} 
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
