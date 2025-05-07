
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
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
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
