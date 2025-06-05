
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author?: string;
  slug?: string;
}

export function NewsCard({
  id,
  title,
  excerpt,
  image,
  category,
  date,
  author,
  slug,
}: NewsCardProps) {
  // Force display of an image - use provided image or fallback
  const displayImage = image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80';
  
  // Create link using slug if available, otherwise fallback to id
  const articleLink = slug ? `/${slug}` : `/actualites/${id}`;

  return (
    <Link to={articleLink} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute top-2 left-2">
            <Badge variant={category === "Politique" ? "destructive" : "default"}>
              {category}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-xs">{date}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        {author && (
          <CardFooter className="p-4 pt-0 text-xs">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
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
