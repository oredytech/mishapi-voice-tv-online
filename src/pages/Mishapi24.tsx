
import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { RadioSchedule } from "@/components/RadioSchedule";
import { Button } from "@/components/ui/button";

const Mishapi24 = () => {
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">MISHAPI 24</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <VideoPlayer
                videoUrl="https://example.com/mishapi24-stream"
                title="MISHAPI 24 - Direct"
                poster="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              />
              
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">En direct maintenant</h2>
                  <h3 className="text-lg font-medium mt-1">Journal International</h3>
                  <p className="text-muted-foreground text-sm">Avec Jean Kabongo</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  Partager
                </Button>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">À propos de MISHAPI 24</h2>
                <p className="text-muted-foreground">
                  MISHAPI 24 est notre chaîne d'information internationale qui couvre l'actualité 24h/24 et 7j/7. 
                  Retrouvez les dernières informations, analyses et reportages du continent africain et du monde entier.
                </p>
              </div>
              
              {/* Ajout de la grille des programmes */}
              <RadioSchedule />
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Comment nous regarder</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>En direct sur ce site web</li>
                  <li>Sur CANAL+ (canal 366)</li>
                  <li>Sur notre application mobile (Android & iOS)</li>
                  <li>Sur nos plateformes de médias sociaux</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-card p-4 rounded-lg mb-6 border">
              <h3 className="font-bold mb-4">Dernières actualités</h3>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-medium">RDC: Nouvelle initiative pour l'éducation</h4>
                  <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-medium">Économie: Hausse des investissements dans le secteur minier</h4>
                  <p className="text-sm text-muted-foreground">Il y a 5 heures</p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-medium">Santé: Campagne de vaccination contre le paludisme</h4>
                  <p className="text-sm text-muted-foreground">Il y a 8 heures</p>
                </div>
                <div>
                  <Button variant="outline" className="w-full">Voir plus d'actualités</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mishapi24;
