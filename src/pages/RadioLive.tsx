
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AudioPlayer } from "@/components/AudioPlayer";
import { RadioSchedule } from "@/components/RadioSchedule"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloatingPlayer from "@/components/FloatingPlayer";

interface RadioLocationState {
  radioStream: string;
  radioTitle: string;
}

const DEFAULT_RADIO = {
  stream: "https://stream.zeno.fm/cgxrxyyhjsrtv",
  title: "MISHAPI VOICE Radio"
};

const RadioLive = () => {
  const location = useLocation();
  const state = location.state as RadioLocationState | null;
  
  const radioStream = state?.radioStream || DEFAULT_RADIO.stream;
  const radioTitle = state?.radioTitle || DEFAULT_RADIO.title;
  
  const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);

  const handleListen = () => {
    setShowFloatingPlayer(true);
  };

  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">Radio en direct</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{radioTitle}</h2>
                <p className="text-muted-foreground mb-6">
                  Écoutez notre radio en direct pour rester informé où que vous soyez.
                  Des programmes variés et de la musique africaine pour vous accompagner.
                </p>
                
                <div className="w-full max-w-md mb-6">
                  <AudioPlayer audioUrl={radioStream} title={radioTitle} />
                </div>
                
                <button 
                  className="btn-live btn-radio"
                  onClick={handleListen}
                >
                  Écouter en arrière-plan
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">En direct maintenant</h2>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                    ML
                  </div>
                  <div>
                    <h3 className="text-lg font-medium"></h3>
                    <p className="text-muted-foreground text-sm mb-2"></p>
                    <p className="text-sm">
                      
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className="text-sm text-primary flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse-live"></span>
                        En direct jusqu'à 10:30
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Intégration du composant RadioSchedule */}
            <RadioSchedule />
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Comment nous écouter</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>En direct sur ce site web</li>
                <li>Sur les fréquences FM: 95.5 MHz (Goma), 94.3 MHz (Bukavu)</li>
                <li>Sur notre application mobile (Android & iOS)</li>
                <li>Sur certains agrégateurs de radios en ligne</li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Participez à nos émissions</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Vous souhaitez participer à nos émissions interactives? 
                Contactez-nous par ces moyens:
              </p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+243 999 999 999</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8 5 8-5"/><path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  <span>radio@mishapivoice.tv</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                  <span>@MishapiVoice</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span>@mishapivoicetv</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating player */}
      <FloatingPlayer 
        isVisible={showFloatingPlayer} 
        onClose={() => setShowFloatingPlayer(false)}
        audioUrl={radioStream}
        title={radioTitle} 
      />
    </div>
  );
};

export default RadioLive;
