import { API_BASE_URL } from "@/config";

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
    about: {
      href: string;
    }[];
    author: {
      embeddable: boolean;
      href: string;
    }[];
    replies: {
      embeddable: boolean;
      href: string;
    }[];
    "version-history": {
      count: number;
      href: string;
    }[];
    "predecessor-version": {
      id: number;
      href: string;
    }[];
    "wp:featuredmedia": {
      embeddable: boolean;
      href: string;
    }[];
    "wp:attachment": {
      href: string;
    }[];
    "wp:term": {
      taxonomy: string;
      embeddable: boolean;
      href: string;
    }[];
    curies: {
      name: string;
      href: string;
      templated: boolean;
    }[];
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
    author?: {
      id: number;
      name: string;
      url: string;
      description: string;
      link: string;
      slug: string;
      avatar_urls: {
        "24": string;
        "48": string;
        "96": string;
      };
      _links: {
        self: {
          href: string;
        }[];
        collection: {
          href: string;
        }[];
      };
    }[];
    'wp:term'?: [{
      id: number;
      link: string;
      name: string;
      slug: string;
      taxonomy: string;
      _links: {
        self: {
          href: string;
        }[];
        collection: {
          href: string;
        }[];
        about: {
          href: string;
        }[];
        'wp:post_type': {
          href: string;
        }[];
        curies: {
          name: string;
          href: string;
          templated: boolean;
        }[];
      };
    }[]];
  };
}

export const fetchWordPressPosts = async (page: number = 1, perPage: number = 10): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_embed&page=${page}&per_page=${perPage}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return await response.json() as WordPressPost[];
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return [];
  }
};

export const fetchWordPressPostBySlug = async (slug: string): Promise<WordPressPost | null> => {
  try {
    console.log(`Fetching post by slug: ${slug}`);
    
    // Try to fetch by slug first
    const slugResponse = await fetch(`${API_BASE_URL}/posts?slug=${slug}&_embed`);
    
    if (slugResponse.ok) {
      const posts = await slugResponse.json();
      if (posts && posts.length > 0) {
        console.log(`Found post by slug: ${posts[0].title.rendered}`);
        return posts[0];
      }
    }
    
    // If slug search fails, try to parse as ID (fallback for old URLs)
    const idMatch = slug.match(/(\d+)$/);
    if (idMatch) {
      const id = idMatch[1];
      console.log(`Trying to fetch by ID: ${id}`);
      
      const idResponse = await fetch(`${API_BASE_URL}/posts/${id}?_embed`);
      if (idResponse.ok) {
        const post = await idResponse.json();
        console.log(`Found post by ID: ${post.title.rendered}`);
        return post;
      }
    }
    
    console.log(`No post found for slug: ${slug}`);
    return null;
    
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};

export const getFeaturedImageUrl = (post: WordPressPost): string => {
  try {
    if (post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"].length > 0) {
      return post._embedded["wp:featuredmedia"][0].source_url;
    }
    return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80'; // Provide a default image URL
  } catch (error) {
    console.error("Error getting featured image URL:", error);
    return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80'; // Ensure a fallback in case of errors
  }
};

export const getCleanTitle = (title: string): string => {
  // Remove HTML tags and clean up whitespace
  return title.replace(/<[^>]*>?/gm, '').replace(/&[^;]+;/g, ' ').trim();
};
