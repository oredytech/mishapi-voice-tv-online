
import { useEffect, useState } from "react";
import { WordPressPost, fetchWordPressPosts } from "@/services/wordpress";
import { WordPressNewsCard } from "@/components/WordPressNewsCard";

interface RelatedArticlesProps {
  currentPostId: number;
}

export function RelatedArticles({ currentPostId }: RelatedArticlesProps) {
  const [relatedPosts, setRelatedPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true);
      try {
        // Fetch latest posts and filter out the current post
        const posts = await fetchWordPressPosts(1, 5);
        const filtered = posts.filter(post => post.id !== currentPostId);
        setRelatedPosts(filtered.slice(0, 4)); // Take up to 4 related posts
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [currentPostId]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Articles similaires</h3>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Articles similaires</h3>
      <div className="space-y-4">
        {relatedPosts.map(post => (
          <WordPressNewsCard key={post.id} post={post} variant="small" />
        ))}
      </div>
    </div>
  );
}
