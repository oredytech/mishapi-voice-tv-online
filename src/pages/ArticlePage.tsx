
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentForm } from "@/components/CommentForm";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { RelatedArticles } from "@/components/RelatedArticles";
import { RecentComments } from "@/components/RecentComments";
import { fetchWordPressPostBySlug, WordPressPost, getFeaturedImageUrl } from "@/services/wordpress";
import { Helmet } from 'react-helmet-async';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!slug) {
          throw new Error("Article non trouvé");
        }
        
        console.log("Slug reçu:", slug);
        
        const fetchedPost = await fetchWordPressPostBySlug(slug);
        
        if (!fetchedPost) {
          throw new Error("Article non trouvé");
        }
        
        setPost(fetchedPost);
        
        // Update document title with article title
        const titleText = document.createElement("div");
        titleText.innerHTML = fetchedPost.title.rendered;
        document.title = `${titleText.textContent || "Article"} - MISHAPI VOICE TV`;
        
      } catch (err) {
        console.error("Error loading article:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticle();
  }, [slug, navigate]);

  // Get the current URL for social sharing with main domain - use only slug
  const currentUrl = `https://mishapivoicetv.net/${slug}`;

  return (
    <div className="container-custom py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux actualités
      </Button>

      {isLoading ? (
        <ArticleSkeleton />
      ) : error ? (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate("/actualites")}>
            Voir toutes les actualités
          </Button>
        </div>
      ) : post ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - takes 2/3 of the width on desktop */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              {/* Article Title */}
              <h1 
                className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight" 
                dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
              />
              
              {/* Article Meta (date, category) */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6">
                <span>{new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}</span>
                
                {post._embedded?.['wp:term']?.[0]?.[0]?.name && (
                  <>
                    <span>•</span>
                    <span>{post._embedded['wp:term'][0][0].name}</span>
                  </>
                )}
                
                {post._embedded?.author?.[0]?.name && (
                  <>
                    <span>•</span>
                    <span>Par {post._embedded.author[0].name}</span>
                  </>
                )}
              </div>

              {/* Featured Image */}
              <div className="mb-8 rounded-lg overflow-hidden border">
                <img 
                  src={getFeaturedImageUrl(post)} 
                  alt="" 
                  className="w-full h-auto object-cover max-h-[500px]" 
                />
              </div>

              {/* Article Content */}
              <div 
                className="article-content text-justify"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
              />
            </article>

            {/* Social Share */}
            <div className="my-8">
              <SocialShareButtons 
                url={currentUrl} 
                title={post.title.rendered.replace(/<[^>]*>?/gm, '')} 
              />
            </div>

            <Separator className="my-8" />

            {/* Comment Form */}
            <div className="mt-8">
              <CommentForm postId={post.id} />
            </div>
          </div>

          {/* Sidebar - takes 1/3 of the width on desktop */}
          <aside className="lg:border-l lg:pl-6 space-y-8">
            {/* Related Articles */}
            <RelatedArticles currentPostId={post.id} />
            
            <Separator />
            
            {/* Recent Comments */}
            <RecentComments postId={post.id} />
          </aside>
        </div>
      ) : null}
    </div>
  );
}

// Skeleton loader for article page
function ArticleSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="w-full h-[300px] rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="hidden lg:block space-y-6">
        <Skeleton className="h-8 w-40" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
