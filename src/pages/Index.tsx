import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoPlayer } from '@/components/VideoPlayer';
import { AudioPlayer } from '@/components/AudioPlayer';
import { ProgramCard } from '@/components/ProgramCard';
import { NewsCard } from '@/components/NewsCard';
import LiveSection from '@/components/LiveSection';
import FloatingPlayer from '@/components/FloatingPlayer';

const todaysPrograms = [{
  title: "Journal Matinal",
  time: "06:00 - 07:00",
  description: "Le point sur l'actualité nationale et internationale avec notre équipe de journalistes.",
  host: "Jean Kabongo",
  category: "Actualités",
  isLive: false
}, {
  title: "Débat Éco",
  time: "12:30 - 13:30",
  description: "Analyse des enjeux économiques actuels en RDC et en Afrique.",
  host: "Marie Lusamba",
  category: "Économie",
  isLive: true
}, {
  title: "Culture Express",
  time: "15:00 - 16:00",
  description: "Toute l'actualité culturelle et artistique de la région.",
  host: "Patrick Muyaya",
  category: "Culture",
  isLive: false
}];
const latestNews = [{
  id: "1",
  title: "La RDC lance un nouveau programme d'électrification rurale",
  excerpt: "Le gouvernement vient d'annoncer un ambitieux plan d'électrification qui touchera plus de 200 villages dans l'est du pays.",
  image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  category: "Développement",
  date: "Aujourd'hui à 10:45",
  author: "Jean Kabongo"
}, {
  id: "2",
  title: "Festival de musique à Goma : les artistes locaux à l'honneur",
  excerpt: "La 5ème édition du festival Amani a réuni plus de 30 artistes congolais et internationaux pour célébrer la paix et la culture.",
  image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  category: "Culture",
  date: "Hier à 18:20",
  author: "Marie Lusamba"
}, {
  id: "3",
  title: "Nouveau partenariat pour l'exploitation minière responsable",
  excerpt: "Un accord majeur a été signé entre la RDC et plusieurs entreprises internationales pour garantir des pratiques minières plus éthiques.",
  image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  category: "Économie",
  date: "02 Mai 2025",
  author: "Patrick Muyaya"
}];

const Index = () => {
  const [isRadioPlayerVisible, setIsRadioPlayerVisible] = useState(false);
  const [isMishapi24PlayerVisible, setIsMishapi24PlayerVisible] = useState(false);

  return <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="pt-12 pb-16 bg-cover bg-center relative"
        style={{ backgroundImage: 'url("/lovable-uploads/0ee99787-f0d1-4243-ae03-35c677a85f06.png")' }}
      >
        {/* Dark overlay to ensure text readability over the background image */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="font-bold leading-tight mb-4 text-4xl md:text-5xl text-white">
              MISHAPI VOICE TV
              <span className="text-primary block mt-2 text-base md:text-lg">La vision Africaine dans le Monde</span>
            </h1>
            <p className="text-white/85 mb-8 text-lg max-w-2xl mx-auto">
              Chaîne de référence dans l'Est de la RDC, diffusant des émissions axées sur le développement 
              de la République Démocratique du Congo et de toute l'Afrique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="btn-tv" asChild>
                <Link to="/tv">
                  Regarder la TV en direct
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button className="btn-radio" onClick={() => setIsRadioPlayerVisible(true)}>
                Écouter la radio en direct
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="secondary" onClick={() => setIsMishapi24PlayerVisible(true)}>
                Écouter Mishapi 24
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2 text-white/90">Également disponible sur:</p>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center px-3 py-1 border border-white/20 bg-black/50 backdrop-blur-sm rounded-md">
                  <img alt="Canal+" className="h-5 mr-2" src="/lovable-uploads/4cb2b446-5308-4cf3-a5d6-71657789fd7d.jpg" />
                  <span className="text-sm text-white">Canal 363</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Section */}
      <LiveSection />

      {/* Programs du jour */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Programmes du jour</h2>
            <Link to="/programmes" className="text-primary hover:underline flex items-center">
              Voir la grille complète
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="program-grid">
            {todaysPrograms.map((program, index) => <ProgramCard key={index} {...program} />)}
          </div>
        </div>
      </section>

      {/* News & Replay Section */}
      <section className="py-12 bg-muted/50">
        <div className="container-custom">
          <Tabs defaultValue="actualites" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="actualites">Actualités</TabsTrigger>
                <TabsTrigger value="replay">Replay</TabsTrigger>
              </TabsList>
              <div className="hidden sm:block">
                <Link to="/actualites" className="text-primary hover:underline flex items-center mr-4 inline-block">
                  Toutes les actualités
                  <ArrowRight size={16} className="ml-1" />
                </Link>
                <Link to="/replay" className="text-primary hover:underline flex items-center inline-block">
                  Tous les replays
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <TabsContent value="actualites">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.map(news => <NewsCard key={news.id} {...news} />)}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Button variant="outline" asChild>
                  <Link to="/actualites">
                    Toutes les actualités
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="replay">
              <div className="space-y-4">
                {[1, 2, 3].map(id => <div key={id} className="replay-item">
                    <div className="w-full sm:w-1/3 aspect-video bg-muted rounded-md overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-148705${id}459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80`} alt={`Replay ${id}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 mt-2 sm:mt-0">
                      <span className="text-xs text-muted-foreground">03 Mai 2025</span>
                      <h3 className="text-lg font-semibold mt-1">
                        <Link to={`/replay/${id}`} className="hover:text-primary">
                          Débat: L'avenir de l'éducation en RDC {id}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        Nos experts analysent les défis et opportunités du système éducatif congolais et proposent des solutions innovantes.
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm">Animé par Jean Kabongo</span>
                        <Link to={`/replay/${id}`} className="text-primary text-sm hover:underline flex items-center">
                          Regarder
                          <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Button variant="outline" asChild>
                  <Link to="/replay">
                    Tous les replays
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Floating Radio Players */}
      <FloatingPlayer 
        isVisible={isRadioPlayerVisible} 
        onClose={() => setIsRadioPlayerVisible(false)} 
        audioUrl="https://example.com/radio-stream" 
        title="MISHAPI VOICE Radio" 
      />
      
      <FloatingPlayer 
        isVisible={isMishapi24PlayerVisible} 
        onClose={() => setIsMishapi24PlayerVisible(false)} 
        audioUrl="https://example.com/mishapi24-stream" 
        title="MISHAPI 24" 
      />
    </div>;
};

export default Index;
