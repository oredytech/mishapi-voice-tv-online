
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
}

interface RecentCommentsProps {
  postId: number;
}

export function RecentComments({ postId }: RecentCommentsProps) {
  // Simulated comments for now, would be replaced with actual API call in production
  const comments: Comment[] = [
    {
      id: 1,
      name: "Jean Dupont",
      text: "Article très intéressant, merci pour ces informations !",
      date: "Il y a 2 heures"
    },
    {
      id: 2,
      name: "Marie Lambert",
      text: "Je suis d'accord avec l'analyse présentée. Ça reflète bien la situation actuelle.",
      date: "Il y a 5 heures"
    },
    {
      id: 3,
      name: "Pierre Martin",
      text: "Pourriez-vous développer davantage le dernier point ? Merci d'avance.",
      date: "Il y a 1 jour"
    },
    {
      id: 4,
      name: "Sophie Dubois",
      text: "J'apprécie beaucoup la qualité des informations sur ce site.",
      date: "Il y a 2 jours"
    },
    {
      id: 5,
      name: "Thomas Leclerc",
      text: "Je vais partager cet article avec mes amis, c'est vraiment pertinent !",
      date: "Il y a 3 jours"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Commentaires récents</h3>
      
      {comments.length === 0 ? (
        <p className="text-muted-foreground text-sm">Aucun commentaire pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {comment.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.name}</span>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
