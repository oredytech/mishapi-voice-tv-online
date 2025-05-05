
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card mt-12 pt-12 border-t">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">MISHAPI VOICE TV</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chaîne de référence dans l'Est de la RDC, diffusant des émissions axées 
              sur le développement de la République Démocratique du Congo et de toute l'Afrique.
            </p>
            <p className="text-sm font-medium">
              Disponible sur CANAL+ (canal 363)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tv" className="text-foreground/80 hover:text-primary">
                  Direct TV
                </Link>
              </li>
              <li>
                <Link to="/radio" className="text-foreground/80 hover:text-primary">
                  Direct Radio
                </Link>
              </li>
              <li>
                <Link to="/replay" className="text-foreground/80 hover:text-primary">
                  Replay
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="text-foreground/80 hover:text-primary">
                  Grille des programmes
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-foreground/80 hover:text-primary">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                title="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                title="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                <span className="sr-only">YouTube</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                title="Twitter/X"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                <span className="sr-only">Twitter/X</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-bold mb-2">Inscrivez-vous à notre newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 text-sm rounded-l-md border border-r-0 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 text-sm rounded-r-md hover:bg-primary/90 transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contactez-nous</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p className="mb-2">Goma, République Démocratique du Congo</p>
              <p className="mb-2">Email: contact@mishapivoice.tv</p>
              <p className="mb-2">Tél: +243 999 999 999</p>
            </address>
          </div>
        </div>

        {/* Partenaires */}
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-center text-lg font-bold mb-4">Nos Partenaires</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <img src="/placeholder.svg" alt="Canal+" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/placeholder.svg" alt="Partenaire 2" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/placeholder.svg" alt="Partenaire 3" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 py-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} MISHAPI VOICE TV. Tous droits réservés.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <Link to="/mentions-legales" className="hover:text-primary">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="hover:text-primary">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
