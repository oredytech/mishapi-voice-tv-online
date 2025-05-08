
import { Facebook, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        description: "Lien copié dans le presse-papier",
        duration: 2000,
      });
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-1">Partager:</span>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        aria-label="Partager sur Facebook"
      >
        <Facebook size={16} className="text-blue-600" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
        aria-label="Partager sur Twitter"
      >
        <Twitter size={16} className="text-sky-500" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => window.open(shareLinks.whatsapp, '_blank')}
        aria-label="Partager sur WhatsApp"
      >
        <MessageCircle size={16} className="text-green-600" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => window.open(shareLinks.telegram, '_blank')}
        aria-label="Partager sur Telegram"
      >
        <MessageCircle size={16} className="text-blue-500" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full ml-auto"
        onClick={copyToClipboard}
      >
        Copier le lien
      </Button>
    </div>
  );
}
