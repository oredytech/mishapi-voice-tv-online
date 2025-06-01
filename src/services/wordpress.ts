export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  slug?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium?: {
            source_url: string;
          };
          large?: {
            source_url: string;
          };
          full?: {
            source_url: string;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      name: string;
      id: number;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
    }>;
  };
}

export interface WordPressApiResponse {
  posts: WordPressPost[];
  totalPages: number;
  totalPosts: number;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export const fetchWordPressPosts = async (page = 1, perPage = 15): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(
      `https://mishapivoicetv.net/wp-json/wp/v2/posts?_embed=true&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data: WordPressPost[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
};

export const fetchWordPressPostsWithPagination = async (page = 1, perPage = 15): Promise<WordPressApiResponse> => {
  try {
    const response = await fetch(
      `https://mishapivoicetv.net/wp-json/wp/v2/posts?_embed=true&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data: WordPressPost[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    
    return {
      posts: data,
      totalPages,
      totalPosts
    };
  } catch (error) {
    console.error('Error fetching WordPress posts with pagination:', error);
    return {
      posts: [],
      totalPages: 0,
      totalPosts: 0
    };
  }
};

// Fonction pour récupérer les posts d'une catégorie spécifique
export const fetchWordPressCategoryPosts = async (categoryId: number, page = 1, perPage = 5): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(
      `https://mishapivoicetv.net/wp-json/wp/v2/posts?_embed=true&categories=${categoryId}&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data: WordPressPost[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching WordPress posts for category ${categoryId}:`, error);
    return [];
  }
};

// Nouvelle fonction pour récupérer les catégories WordPress
export const fetchWordPressCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const response = await fetch(
      `https://mishapivoicetv.net/wp-json/wp/v2/categories?per_page=100&hide_empty=true`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const categories: WordPressCategory[] = await response.json();
    return categories.filter(cat => cat.count > 0); // Ne retourner que les catégories avec des articles
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
};

// Nouvelle fonction pour récupérer les posts d'une catégorie par slug
export const fetchWordPressCategoryPostsBySlug = async (categorySlug: string, page = 1, perPage = 12): Promise<{ posts: WordPressPost[]; totalPages: number; totalPosts: number; categoryName: string }> => {
  try {
    // D'abord récupérer les catégories pour trouver l'ID
    const categories = await fetchWordPressCategories();
    const category = categories.find(cat => cat.slug === categorySlug);
    
    if (!category) {
      return {
        posts: [],
        totalPages: 0,
        totalPosts: 0,
        categoryName: ''
      };
    }

    const response = await fetch(
      `https://mishapivoicetv.net/wp-json/wp/v2/posts?_embed=true&categories=${category.id}&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const posts: WordPressPost[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    
    return {
      posts,
      totalPages,
      totalPosts,
      categoryName: category.name
    };
  } catch (error) {
    console.error(`Error fetching WordPress posts for category ${categorySlug}:`, error);
    return {
      posts: [],
      totalPages: 0,
      totalPosts: 0,
      categoryName: ''
    };
  }
};

// Fonction pour récupérer l'URL de l'image en avant d'un article
export const getFeaturedImageUrl = (post: WordPressPost): string => {
  // Vérifier si le post a une image mise en avant
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    const featuredMedia = post._embedded['wp:featuredmedia'][0];
    
    // Essayer d'obtenir la version optimale de l'image
    const mediaDetails = featuredMedia.media_details;
    if (mediaDetails && mediaDetails.sizes) {
      // Priorité: large -> medium -> full
      if (mediaDetails.sizes.large) {
        return mediaDetails.sizes.large.source_url;
      }
      if (mediaDetails.sizes.medium) {
        return mediaDetails.sizes.medium.source_url;
      }
      if (mediaDetails.sizes.full) {
        return mediaDetails.sizes.full.source_url;
      }
    }
    
    // Revenir à l'URL source si les tailles ne sont pas disponibles
    if (featuredMedia.source_url) {
      return featuredMedia.source_url;
    }
  }
  
  // Essayer d'extraire une image du contenu de l'article si aucune image mise en avant
  if (post.content && post.content.rendered) {
    const imgMatch = post.content.rendered.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }
  
  // Images par défaut basées sur la catégorie si disponible
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name?.toLowerCase();
  
  const categoryImages = {
    'politique': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80',
    'économie': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'culture': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'société': 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80',
    'sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'santé': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
    'éducation': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80'
  };
  
  if (category && categoryImages[category]) {
    return categoryImages[category];
  }
  
  // Image par défaut générale
  return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80';
};

// New function to fetch a single WordPress post by ID
export const fetchWordPressPostById = async (id: number): Promise<WordPressPost | null> => {
  try {
    const response = await fetch(
      `https://mishapivoicetv.net/wp-json/wp/v2/posts/${id}?_embed=true`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const post: WordPressPost = await response.json();
    return post;
  } catch (error) {
    console.error(`Error fetching WordPress post with ID ${id}:`, error);
    return null;
  }
};

// New function to create a slug from post title
export const createSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .trim();
};

// New function to decode HTML entities in titles
export const decodeHtmlEntities = (html: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
};

// New function to get a clean title from WordPress post
export const getCleanTitle = (post: WordPressPost): string => {
  return decodeHtmlEntities(post.title.rendered);
};
