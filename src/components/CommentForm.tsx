
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CommentFormProps {
  postId: number;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This is a placeholder for future WordPress comment API integration
      // For now, just simulate a successful comment submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Commentaire envoyé",
        description: "Merci pour votre commentaire !",
      });
      
      setName("");
      setEmail("");
      setComment("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer votre commentaire.",
      });
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold">Laissez un commentaire</h3>
      
      <div className="space-y-2">
        <Input
          placeholder="Votre nom *"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Votre email (facultatif)"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
          placeholder="Votre commentaire *"
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
          rows={4}
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer le commentaire"}
      </Button>
    </form>
  );
}
