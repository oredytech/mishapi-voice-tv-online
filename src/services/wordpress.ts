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

// Fonction pour récupérer l'URL de l'image en avant d'un article
export const getFeaturedImageUrl = (post: WordPressPost): string => {
  // Vérifier si le post a une image mise en avant
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    // Essayer d'obtenir la version large de l'image
    const mediaDetails = post._embedded['wp:featuredmedia'][0].media_details;
    if (mediaDetails && mediaDetails.sizes) {
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
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  
  // Image par défaut si aucune image n'est trouvée
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
