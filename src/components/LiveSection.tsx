
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Définition des liens de streaming pour les radios
const RADIO_STREAMS = {
  mishapiVoice: "https://stream.zeno.fm/cgxrxyyhjsrtv",
  mishapi24: "https://stream.zeno.fm/t7anwdwtbluuv"
};

export default function LiveSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container-custom">
        <h2 className="section-title">Nos diffusions en direct</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {/* TV Live */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m6 8 4 4 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">MISHAPI VOICE TV</h3>
              <p className="text-muted-foreground mb-6">
                Regardez notre chaîne de télévision en direct pour suivre l'actualité, 
                les débats et les émissions exclusives sur le développement de la RDC.
              </p>
              <Button className="btn-tv" asChild>
                <Link to="/tv">
                  REGARDER 
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Radio Live */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">RADIO MISHAPI VOICE GOMA</h3>
              <p className="text-muted-foreground mb-6">
                Écoutez Mishapi Voice station de Goma en direct pour rester informé où que vous soyez. 
                Des programmes variés et de la musique africaine pour vous accompagner.
              </p>
              <Button className="btn-radio" asChild>
                <Link to="/radio" state={{ radioStream: RADIO_STREAMS.mishapiVoice, radioTitle: "MISHAPI VOICE Radio" }}>
                  ÉCOUTER
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mishapi 24 Radio Live */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">RADIO MISHAPI 24 KINSHASA</h3>
              <p className="text-muted-foreground mb-6">
                Découvrez notre station radio basée à Kinshasa. Actualités, culture et 
                divertissement au cœur de la capitale congolaise, 24h/24.
              </p>
              <Button className="btn-radio bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/radio" state={{ radioStream: RADIO_STREAMS.mishapi24, radioTitle: "MISHAPI 24" }}>
                  ÉCOUTER 
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
