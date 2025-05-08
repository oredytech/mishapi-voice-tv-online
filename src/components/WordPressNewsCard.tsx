
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WordPressPost, getFeaturedImageUrl, getCleanTitle, createSlugFromTitle } from "@/services/wordpress";

interface WordPressNewsCardProps {
  post: WordPressPost;
  variant?: 'default' | 'small';
}

export function WordPressNewsCard({ post, variant = 'default' }: WordPressNewsCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Actualité';
  const author = post._embedded?.author?.[0]?.name;
  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const cleanTitle = getCleanTitle(post);
  const slug = post.slug || createSlugFromTitle(cleanTitle);
  const articleUrl = `/actualites/${slug}-${post.id}`;

  if (variant === 'small') {
    return (
      <Link to={articleUrl} className="group flex gap-3 items-start">
        <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium group-hover:text-primary line-clamp-2 text-sm" 
              dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px] px-1 py-0">
              {category}
            </Badge>
            <span className="text-[10px] text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={articleUrl} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md border-none bg-background">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-primary/80 hover:bg-primary text-white">
              {category}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-3 pb-1">
          <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <CardDescription className="text-xs">{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <div 
            className="text-sm text-muted-foreground line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
          />
        </CardContent>
        {author && (
          <CardFooter className="p-3 pt-0 text-xs">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                {author.charAt(0)}
              </div>
              <span className="ml-2">{author}</span>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
