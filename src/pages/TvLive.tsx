import { useState, useEffect } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ProgramCard } from "@/components/ProgramCard";
import { RadioSchedule } from "@/components/RadioSchedule";
import { WordPressNewsCard } from "@/components/WordPressNewsCard";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchWordPressPosts, WordPressPost } from "@/services/wordpress";

const TvLive = () => {
  const [activeDay, setActiveDay] = useState("aujourd'hui");
  const [recentArticles, setRecentArticles] = useState<WordPressPost[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  // Load recent articles
  useEffect(() => {
    const loadRecentArticles = async () => {
      setIsLoadingArticles(true);
      try {
        const articles = await fetchWordPressPosts(1, 6);
        setRecentArticles(articles);
      } catch (error) {
        console.error('Error loading recent articles:', error);
      } finally {
        setIsLoadingArticles(false);
      }
    };

    loadRecentArticles();
  }, []);

  const tvPrograms = {
    "aujourd'hui": [
      {
        title: "Journal Matinal",
        time: "06:00 - 07:00",
        description: "Le point sur l'actualité nationale et internationale avec notre équipe de journalistes.",
        host: "Jean Kabongo",
        category: "Actualités",
        isLive: false,
      },
      {
        title: "Débat Éco",
        time: "12:30 - 13:30",
        description: "Analyse des enjeux économiques actuels en RDC et en Afrique.",
        host: "Marie Lusamba",
        category: "Économie",
        isLive: true,
      },
      {
        title: "Culture Express",
        time: "15:00 - 16:00",
        description: "Toute l'actualité culturelle et artistique de la région.",
        host: "Patrick Muyaya",
        category: "Culture",
        isLive: false,
      },
      {
        title: "Journal du Soir",
        time: "19:00 - 19:30",
        description: "Résumé complet de l'actualité de la journée.",
        host: "Jean Kabongo",
        category: "Actualités",
        isLive: false,
      },
      {
        title: "Parlement Hebdo",
        time: "20:00 - 21:00",
        description: "Retour sur les travaux parlementaires de la semaine.",
        host: "André Kimbuta",
        category: "Politique",
        isLive: false,
      },
      {
        title: "Musique Africaine",
        time: "21:30 - 23:00",
        description: "Les meilleurs hits du continent africain.",
        host: "Céline Banza",
        category: "Musique",
        isLive: false,
      }
    ],
    "demain": [
      {
        title: "Matinale Info",
        time: "06:00 - 08:00",
        description: "Démarrez la journée avec les dernières informations et l'analyse de notre équipe éditoriale.",
        host: "Marie Lusamba",
        category: "Actualités",
        isLive: false,
      },
      {
        title: "Entreprendre en RDC",
        time: "10:00 - 11:00",
        description: "Focus sur l'entrepreneuriat congolais avec des témoignages inspirants.",
        host: "Patrick Muyaya",
        category: "Économie",
        isLive: false,
      },
      {
        title: "Sciences & Santé",
        time: "14:00 - 15:00",
        description: "Magazine santé avec les dernières avancées médicales et conseils de prévention.",
        host: "Dr. Muyembe",
        category: "Santé",
        isLive: false,
      }
    ]
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">TV en direct</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 min-w-0">
            <div className="sticky top-24">
              <div className="w-full max-w-full overflow-hidden">
                <VideoPlayer
                  videoUrl="https://example.com/tv-stream"
                  title="MISHAPI VOICE TV - Direct"
                  poster="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                />
              </div>
              
              <div className="mt-4 flex items-start justify-between flex-wrap gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-medium mt-1 truncate">Débat Éco</h3>
                  <p className="text-muted-foreground text-sm">Avec Marie Lusamba</p>
                </div>
                <div className="shrink-0">
                  <SocialShareButtons 
                    url="https://mishapivoicetv.net/tv" 
                    title="MISHAPI VOICE TV - Direct" 
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">À propos de MISHAPI VOICE TV</h2>
                <p className="text-muted-foreground text-sm lg:text-base">
                  MISHAPI VOICE TV est une chaîne de référence dans l'Est de la RDC, diffusant des 
                  émissions axées sur le développement de la République Démocratique du Congo et de 
                  toute l'Afrique. Disponible sur le bouquet CANAL+ (canal 363).
                </p>
              </div>
              
              {/* Ajout de la grille des programmes */}
              <div className="mt-6 overflow-hidden">
                <RadioSchedule />
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Comment nous regarder</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>En direct sur ce site web</li>
                  <li>Sur CANAL+ (canal 363)</li>
                  <li>Sur notre application mobile (Android & iOS)</li>
                  <li>Sur notre chaîne YouTube</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="min-w-0">
            <div className="bg-card p-4 rounded-lg mb-6 border overflow-hidden">
              <h3 className="font-bold mb-4">Articles Récents</h3>
              {isLoadingArticles ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-16 h-16 bg-muted animate-pulse rounded-md shrink-0"></div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                        <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentArticles.map(article => (
                    <div key={article.id} className="overflow-hidden">
                      <WordPressNewsCard post={article} variant="small" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvLive;
