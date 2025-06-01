
import { useState, useEffect } from 'react';
import { fetchWordPressCategories, WordPressCategory } from '@/services/wordpress';

export const useWordPressCategories = () => {
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedCategories = await fetchWordPressCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
        console.error('Failed to fetch categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, isLoading, error };
};
